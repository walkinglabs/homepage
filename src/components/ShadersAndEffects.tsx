import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { WalkingLabsIcon, WalkingLabsMark } from './Primitives'

/* ============================================================================
   1. COMBED FLOWING SILK-FIBER WEBGL SHADER (Matches busybox step_4.png!)
   - Renders thousands of ultra-fine combed flowing vertical-to-sweeping silk
     fiber strands with sculpted 3D light ridges & deep obsidian valleys
   - Re-imagined in WalkingLabs' Deep Midnight Cobalt + Glacier Cyan + Emerald
   - Ultra-fast analytic GPU math, capped ~880px width for razor-sharp strands
     at 30fps background cadence (zero lag, pauses offscreen & when tab hidden)
   ============================================================================ */
const VERT_SRC = `
  attribute vec2 a_pos;
  void main() {
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`

const FRAG_SILK = `
  precision highp float;
  uniform vec2 u_res;
  uniform float u_time;
  uniform vec2 u_mouse;

  float hash(float n) {
    return fract(sin(n) * 43758.5453123);
  }

  float noise1(float x) {
    float i = floor(x);
    float f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(hash(i), hash(i + 1.0), f);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_res.xy;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= u_res.x / max(u_res.y, 1.0);

    float t = u_time * 0.24;
    vec2 m = (u_mouse - 0.5) * 0.28;

    float fold1 = sin(p.x * 1.45 - p.y * 0.95 + t * 0.7 + m.x) * 0.55;
    float fold2 = cos(p.x * 0.9 + p.y * 1.65 - t * 0.55 + m.y) * 0.45;
    float fold3 = sin((p.x + fold1) * 2.3 + (p.y + fold2) * 1.8 - t * 0.45) * 0.35;

    float streamCoord = p.x * 1.35 + fold1 * 0.85 + fold3 * 0.42 + p.y * 0.38;
    float alongCoord  = p.y * 1.25 - fold2 * 0.65;

    float strandA = sin(streamCoord * 92.0 + sin(alongCoord * 3.2 - t) * 4.5);
    float strandB = sin(streamCoord * 168.0 - cos(alongCoord * 4.1 + t * 0.8) * 3.8);
    float strandJitter = noise1(streamCoord * 52.0 + floor(alongCoord * 0.5) * 0.01);
    float fibers = clamp(0.52 + 0.28 * strandA + 0.14 * strandB + 0.12 * (strandJitter - 0.5), 0.0, 1.0);
    fibers = smoothstep(0.14, 0.94, fibers);

    float waveHeight = 0.5 + 0.5 * sin(p.y * 2.2 - p.x * 1.5 + fold1 * 2.2 + fold2 * 1.5 - t * 0.75);
    float crest = pow(waveHeight, 1.85);
    float secondaryWave = pow(0.5 + 0.5 * cos(p.x * 1.8 + p.y * 1.35 + fold3 * 2.4 + t * 0.55), 2.2);

    float curtainTL = smoothstep(1.35, -0.15, length(p - vec2(-0.95, 0.55)));
    float curtainBR = smoothstep(1.45, -0.05, length(p - vec2(0.82, -0.58)));
    float lum = clamp(crest * 0.78 + secondaryWave * 0.38, 0.0, 1.0);
    lum *= (0.28 + 0.72 * clamp(curtainTL * 0.85 + curtainBR * 1.05, 0.0, 1.15));

    vec3 cDark    = vec3(0.012, 0.024, 0.048);
    vec3 cCobalt  = vec3(0.042, 0.185, 0.395);
    vec3 cCyan    = vec3(0.110, 0.565, 0.780);
    vec3 cEmerald = vec3(0.030, 0.865, 0.700);
    vec3 cSilver  = vec3(0.760, 0.945, 0.985);

    vec3 baseCol = mix(cDark, cCobalt, smoothstep(0.08, 0.55, lum));
    baseCol = mix(baseCol, cCyan, smoothstep(0.38, 0.82, lum));
    baseCol = mix(baseCol, cEmerald, smoothstep(0.64, 0.98, lum) * 0.55);

    vec3 col = baseCol * (0.28 + 0.98 * fibers);
    col += cSilver * pow(fibers, 3.0) * pow(lum, 2.2) * 0.38;
    col = mix(col, cDark, smoothstep(0.14, 0.0, uv.y) * 0.65);

    gl_FragColor = vec4(col, 1.0);
  }
`

/* MODE 2: CALM LIGHT-REACTIVE SILK CURTAINS (Zero dizzy warping — reacts smoothly via light column & hue glow only) */
const FRAG_CAUSTICS = `
  precision highp float;
  uniform vec2 u_res;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_step;
  uniform float u_pulse;

  void main() {
    vec2 uv = gl_FragCoord.xy / u_res.xy;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= u_res.x / max(u_res.y, 1.0);

    float t = u_time * 0.16;
    vec2 m = (u_mouse - 0.5) * 0.12;
    float stepNorm = clamp(u_step * 0.25, 0.0, 1.0);

    // Steady, calm drapery geometry — NEVER shears, stretches, or twists on click (zero motion dizziness!)
    float sway1 = sin(p.y * 0.95 - t * 0.45 + m.y) * 0.26;
    float sway2 = cos(p.y * 0.85 + t * 0.35 - m.x) * 0.22;

    float strandCoord = (p.x + sway1 * 0.52) * 58.0 + sin(p.y * 1.6 - t * 0.4) * 1.1;
    float strands = smoothstep(0.14, 0.96, 0.52 + 0.48 * sin(strandCoord));

    // Interactive light ONLY: a silky vertical spotlight column glides smoothly to follow the active button
    float focusX = mix(-0.78, 0.78, stepNorm);
    float veilLeft  = exp(-pow((p.x + 0.96 + sway1 * 0.3) * 1.35, 2.0)) * 0.65;
    float veilRight = exp(-pow((p.x - 0.98 + sway2 * 0.3) * 1.35, 2.0)) * 0.65;
    float activeBeam = exp(-pow((p.x - focusX) * 1.45, 2.0)) * (0.48 + u_pulse * 0.46);
    float centerCalm = smoothstep(0.16, 0.88, length(p * vec2(0.88, 1.08)));

    float verticalLift = smoothstep(1.15, -0.85, p.y) * 0.58 + 0.42;
    float lum = clamp((veilLeft + veilRight + activeBeam) * verticalLift, 0.0, 1.1);
    lum *= (0.28 + 0.72 * centerCalm);

    // Gentle, refined color temperature shift across 01 -> 05 (cobalt -> sky -> emerald-cyan)
    vec3 cDark    = vec3(0.012, 0.024, 0.047);
    vec3 cCobalt  = mix(vec3(0.032, 0.140, 0.360), vec3(0.018, 0.205, 0.320), stepNorm);
    vec3 cSky     = mix(vec3(0.095, 0.425, 0.710), vec3(0.040, 0.545, 0.680), stepNorm);
    vec3 cEmerald = mix(vec3(0.025, 0.660, 0.620), vec3(0.000, 0.900, 0.710), stepNorm);
    vec3 cIce     = vec3(0.760, 0.950, 0.995);

    vec3 baseCol = mix(cDark, cCobalt, smoothstep(0.06, 0.52, lum));
    baseCol = mix(baseCol, cSky, smoothstep(0.36, 0.86, lum) * 0.72);
    baseCol = mix(baseCol, cEmerald, smoothstep(0.56, 1.02, lum) * (0.38 + u_pulse * 0.28));

    vec3 col = baseCol * (0.40 + 0.72 * strands);
    // Soft luminous breath along the active button column on switch (pure illumination, zero warp)
    col += cIce * pow(strands, 2.8) * activeBeam * (0.14 + u_pulse * 0.24) * verticalLift;

    float vFade = smoothstep(0.0, 0.14, uv.y) * smoothstep(1.0, 0.82, uv.y);
    col = mix(cDark, col, vFade);

    gl_FragColor = vec4(col, 1.0);
  }
`

/* MODE 3: FAST KINETIC ELECTRIC WAVE SURGE (Original glowing wave rendering + aerodynamic trailing wake & spring momentum) */
const FRAG_HORIZON = `
  precision highp float;
  uniform vec2 u_res;
  uniform float u_time;
  uniform float u_flowTime;
  uniform vec2 u_mouse;
  uniform float u_mouseActive;
  uniform vec4 u_trail[6];

  void main() {
    vec2 uv = gl_FragCoord.xy / u_res.xy;
    float aspect = u_res.x / max(u_res.y, 1.0);
    vec2 p = (uv * 2.0 - 1.0) * vec2(aspect, 1.0);

    // Monotonically integrated kinetic flow speed: base 1.15x pulse + smooth momentum boost when sweeping with the wave
    float t = u_flowTime * 1.15;
    vec2 m = (u_mouse - 0.5) * 0.25 * u_mouseActive;

    // Continuous 5-segment aerodynamic silk wake trailing behind pointer motion & surfing downstream with the wave
    float wakeLift = 0.0;
    float wakePhase = 0.0;
    float wakeSheen = 0.0;

    vec4 prev = u_trail[0];
    for (int i = 1; i < 6; i++) {
      vec4 curr = u_trail[i];
      vec2 a = (prev.xy * 2.0 - 1.0) * vec2(aspect, 1.0);
      vec2 b = (curr.xy * 2.0 - 1.0) * vec2(aspect, 1.0);
      vec2 ab = b - a;
      float h = clamp(dot(p - a, ab) / (dot(ab, ab) + 0.0001), 0.0, 1.0);
      vec2 delta = p - (a + ab * h);

      // Elongated horizontally along the wave stream so disturbance merges naturally into the ribbons
      vec2 aniso = delta * vec2(0.68, 1.15);
      float d2 = dot(aniso, aniso);
      float segEnergy = mix(prev.z, curr.z, h);
      float segVy = mix(prev.w, curr.w, h);
      float w = exp(-d2 * 3.4) * segEnergy;

      wakeLift += w * (delta.y * 0.22 + segVy * 0.18);
      wakePhase += w * 1.15;
      wakeSheen += exp(-d2 * 5.4) * segEnergy;
      prev = curr;
    }
    wakeLift = clamp(wakeLift, -0.24, 0.24);
    wakePhase = clamp(wakePhase, 0.0, 1.85);
    wakeSheen = clamp(wakeSheen, 0.0, 1.15);

    // Multi-harmonic rapid kinetic wave crest racing horizontally across the lower horizon
    float y0 = p.y + 0.36 - wakeLift;
    float waveMain =
      sin(p.x * 2.35 - t * 1.35 + m.x * 2.0) * 0.22 +
      sin(p.x * 4.90 - t * 2.25) * 0.085 +
      cos(p.x * 8.40 - t * 3.10) * 0.032;

    float waveSecond =
      cos(p.x * 1.95 - t * 1.05 - m.y) * 0.24 +
      sin(p.x * 5.60 - t * 2.65 + 1.4) * 0.075;

    // Sharp glowing energy ribbon cores + fine shimmering kinetic filaments riding along the wave
    float dist1 = abs(y0 - waveMain);
    float dist2 = abs(y0 + 0.16 - waveSecond);

    float core1 = exp(-dist1 * 9.5);
    float halo1 = exp(-dist1 * 2.8);
    float core2 = exp(-dist2 * 8.0);
    float halo2 = exp(-dist2 * 2.6);

    // Rapid pulsing high-frequency silk harmonics traveling strictly along the wave curve (zero grid moire)
    float along1 = sin((y0 - waveMain) * 44.0 - t * 2.8 - wakePhase * 1.25) * 0.5 + 0.5;
    float along2 = sin((y0 + 0.16 - waveSecond) * 38.0 + t * 2.4 - wakePhase * 0.9) * 0.5 + 0.5;
    float surge = 0.72 + 0.28 * sin(p.x * 3.2 - t * 2.6);

    vec3 cDark    = vec3(0.012, 0.024, 0.047);
    vec3 cCobalt  = vec3(0.045, 0.215, 0.520);
    vec3 cSky     = vec3(0.090, 0.580, 0.890);
    vec3 cEmerald = vec3(0.000, 0.920, 0.720);
    vec3 cWhite   = vec3(0.860, 0.985, 1.000);

    vec3 col = cDark;
    col += cCobalt * (halo1 * 0.78 + halo2 * 0.65);
    col += cSky * (halo1 * along1 * 0.62 + halo2 * along2 * 0.52) * surge;
    col += cEmerald * (core1 * 0.78 + core2 * 0.58) * (0.55 + 0.45 * along1) * surge;
    col += cWhite * pow(max(0.0001, core1), 2.2) * 0.48 * surge;

    // Subtle specular sheen catching ONLY the glowing wave ribbons along the drifting wake
    col += mix(cSky, cWhite, 0.55) * wakeSheen * (core1 * 0.36 + core2 * 0.22 + halo1 * 0.14);

    // Clean top fade from info links strip; keep luminous deep-cobalt ambient extension all the way to bottom edge
    float topFade = smoothstep(1.0, 0.72, uv.y);
    vec3 cFloor = vec3(0.020, 0.080, 0.135);
    col = mix(cDark, col, topFade);
    col = mix(col, max(col, cFloor), smoothstep(0.32, 0.0, uv.y) * 0.65);

    gl_FragColor = vec4(col, 1.0);
  }
`

export type ShaderMode = 'silk' | 'caustics' | 'horizon'

const SHADER_SOURCES: Record<ShaderMode, string> = {
  silk: FRAG_SILK,
  caustics: FRAG_CAUSTICS,
  horizon: FRAG_HORIZON,
}

export function FlowingSilkShader({
  mode = 'silk',
  step = 0,
  className = '',
}: {
  mode?: ShaderMode
  step?: number
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stepTargetRef = useRef(step)
  const pulseImpulseRef = useRef(0)

  // Inject kinetic wave pluck impulse whenever step changes (0ms recompile-free GPU reaction!)
  useEffect(() => {
    if (stepTargetRef.current !== step) {
      stepTargetRef.current = step
      pulseImpulseRef.current = 1.0
    }
  }, [step])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
    })
    if (!gl) return

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)
      if (!sh) return null
      gl.shaderSource(sh, src)
      gl.compileShader(sh)
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        gl.deleteShader(sh)
        return null
      }
      return sh
    }

    const vs = compile(gl.VERTEX_SHADER, VERT_SRC)
    const fs = compile(gl.FRAGMENT_SHADER, SHADER_SOURCES[mode])
    if (!vs || !fs) return

    const prog = gl.createProgram()
    if (!prog) return
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return

    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    )

    const aPos = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uFlowTime = gl.getUniformLocation(prog, 'u_flowTime')
    const uMouse = gl.getUniformLocation(prog, 'u_mouse')
    const uMouseActive = gl.getUniformLocation(prog, 'u_mouseActive')
    const uTrail = gl.getUniformLocation(prog, 'u_trail') || gl.getUniformLocation(prog, 'u_trail[0]')
    const uStep = gl.getUniformLocation(prog, 'u_step')
    const uPulse = gl.getUniformLocation(prog, 'u_pulse')

    const mouse = {
      x: 0.5,
      y: 0.5,
      tx: 0.5,
      ty: 0.5,
      vx: 0,
      vy: 0,
      active: 0,
      activeTarget: 0,
      hasPointer: false,
    }
    const TRAIL_LEN = 6
    const trail = Array.from({ length: TRAIL_LEN }, () => ({
      x: 0.5,
      y: 0.5,
      energy: 0,
      vy: 0,
    }))
    const trailBuf = new Float32Array(TRAIL_LEN * 4)

    let curStep = stepTargetRef.current
    let raf = 0
    let visible = false
    let lastDraw = 0
    let prevNow = performance.now()
    let flowTime = 3.0
    let flowRate = 1.0
    const start = performance.now()

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const maxW = mode === 'horizon' ? 960 : mode === 'silk' ? 920 : 800
      const maxScale = mode === 'horizon' ? 0.9 : 0.82
      const scale = Math.min(maxScale, maxW / Math.max(1, rect.width))
      canvas.width = Math.max(300, Math.round(rect.width * scale))
      canvas.height = Math.max(180, Math.round(rect.height * scale))
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const drawFrame = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - prevNow) * 0.001))
      prevNow = now

      if (mode === 'horizon') {
        // Critically-damped 2nd-order spring for velvety, weighty cursor motion (zero snappy jitter)
        const k = 38.0
        const damp = 12.2
        const ax = (mouse.tx - mouse.x) * k - mouse.vx * damp
        const ay = (mouse.ty - mouse.y) * k - mouse.vy * damp
        mouse.vx += ax * dt
        mouse.vy += ay * dt
        mouse.x += mouse.vx * dt
        mouse.y += mouse.vy * dt
        mouse.active += (mouse.activeTarget - mouse.active) * Math.min(1, dt * 5.2)

        // Monotonically integrated rotational momentum: sweeping with the stream accelerates it smoothly
        const targetRate = 1.0 + Math.max(-0.42, Math.min(1.55, mouse.vx * 0.78 * mouse.active))
        flowRate += (targetRate - flowRate) * Math.min(1, dt * 4.2)
        if (!reduced) flowTime += dt * flowRate

        // 6-node trailing silk wake: follows smoothly AND drifts downstream along the orbital arc, melting away when idle
        const speed = Math.hypot(mouse.vx, mouse.vy)
        const headTargetEnergy = Math.min(1.0, speed * 0.48) * mouse.active
        trail[0].x = mouse.x
        trail[0].y = mouse.y
        trail[0].energy += (headTargetEnergy - trail[0].energy) * Math.min(1, dt * (headTargetEnergy > trail[0].energy ? 10.0 : 2.8))
        trail[0].vy += (Math.max(-1.2, Math.min(1.2, mouse.vy * 0.45)) - trail[0].vy) * Math.min(1, dt * 8.0)

        for (let i = 1; i < TRAIL_LEN; i++) {
          const prevNode = trail[i - 1]
          const node = trail[i]
          const follow = 1 - Math.exp(-dt * (10.5 - i * 1.15))
          // Smooth horizontal downstream drift matching the racing kinetic wave direction
          const driftX = 0.22 * dt * flowRate
          node.x += (prevNode.x - node.x) * follow + driftX * node.energy
          node.y += (prevNode.y - node.y) * follow
          node.energy += (prevNode.energy * 0.86 - node.energy) * Math.min(1, dt * 7.5)
          node.energy *= Math.exp(-dt * 1.15)
          node.vy += (prevNode.vy * 0.9 - node.vy) * follow
        }

        for (let i = 0; i < TRAIL_LEN; i++) {
          const base = i * 4
          trailBuf[base] = trail[i].x
          trailBuf[base + 1] = trail[i].y
          trailBuf[base + 2] = reduced ? 0 : trail[i].energy
          trailBuf[base + 3] = reduced ? 0 : trail[i].vy
        }
      } else {
        mouse.x += (mouse.tx - mouse.x) * 0.06
        mouse.y += (mouse.ty - mouse.y) * 0.06
      }

      curStep += (stepTargetRef.current - curStep) * 0.1
      pulseImpulseRef.current *= 0.9

      const elapsed = reduced ? 3.5 : (now - start) * 0.001 + 3.0
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, elapsed)
      if (uFlowTime) gl.uniform1f(uFlowTime, reduced ? 3.5 : flowTime)
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      if (uMouseActive) gl.uniform1f(uMouseActive, reduced ? 0 : mouse.active)
      if (uTrail) gl.uniform4fv(uTrail, trailBuf)
      if (uStep) gl.uniform1f(uStep, curStep)
      if (uPulse) gl.uniform1f(uPulse, reduced ? 0 : pulseImpulseRef.current)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    const render = (now: number) => {
      if (!visible || document.hidden) {
        raf = 0
        return
      }
      const frameBudget = mode === 'horizon' ? 14 : 32
      if (!reduced && now - lastDraw < frameBudget) {
        raf = requestAnimationFrame(render)
        return
      }
      lastDraw = now
      drawFrame(now)
      if (!reduced) raf = requestAnimationFrame(render)
    }

    const onMove = (e: PointerEvent) => {
      if (!visible) return
      if (mode === 'horizon') {
        const rect = canvas.getBoundingClientRect()
        if (rect.width <= 0 || rect.height <= 0) return
        const nx = (e.clientX - rect.left) / rect.width
        const ny = 1.0 - (e.clientY - rect.top) / rect.height
        const inside = nx >= -0.06 && nx <= 1.06 && ny >= -0.06 && ny <= 1.06
        if (inside) {
          const cx = Math.max(0, Math.min(1, nx))
          const cy = Math.max(0, Math.min(1, ny))
          if (!mouse.hasPointer) {
            mouse.hasPointer = true
            mouse.x = cx
            mouse.y = cy
            mouse.tx = cx
            mouse.ty = cy
            mouse.vx = 0
            mouse.vy = 0
            for (let i = 0; i < TRAIL_LEN; i++) {
              trail[i].x = cx
              trail[i].y = cy
              trail[i].energy = 0
              trail[i].vy = 0
            }
          } else {
            mouse.tx = cx
            mouse.ty = cy
          }
          mouse.activeTarget = 1
        } else {
          mouse.activeTarget = 0
          mouse.hasPointer = false
        }
      } else {
        mouse.tx = e.clientX / window.innerWidth
        mouse.ty = 1.0 - e.clientY / window.innerHeight
      }
    }

    const onDown = (e: PointerEvent) => {
      if (!visible || mode !== 'horizon') return
      const rect = canvas.getBoundingClientRect()
      if (rect.width <= 0 || rect.height <= 0) return
      const nx = (e.clientX - rect.left) / rect.width
      const ny = 1.0 - (e.clientY - rect.top) / rect.height
      if (nx >= 0 && nx <= 1 && ny >= 0 && ny <= 1) {
        mouse.tx = nx
        mouse.ty = ny
        mouse.hasPointer = true
        mouse.activeTarget = 1
        // Gentle forward flow breeze on click (smooth surge, no harsh bullseye shockwave)
        flowRate = Math.min(2.4, flowRate + 0.72)
        trail[0].energy = Math.min(1.0, trail[0].energy + 0.55)
      }
    }

    const onLeave = () => {
      mouse.activeTarget = 0
      mouse.hasPointer = false
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) {
          prevNow = performance.now()
          drawFrame(prevNow)
          if (!reduced && !raf) raf = requestAnimationFrame(render)
        }
      },
      { rootMargin: '60px' },
    )

    const ro = new ResizeObserver(() => {
      resize()
      drawFrame(performance.now())
    })

    const onVis = () => {
      if (!document.hidden && visible && !reduced && !raf) {
        raf = requestAnimationFrame(render)
      }
    }

    resize()
    drawFrame(performance.now())
    io.observe(canvas)
    ro.observe(canvas)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('visibilitychange', onVis)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVis)
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buf)
    }
  }, [mode])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  )
}

/* ============================================================================
   2. ARCHITECTURAL PRELOADER (000% -> 100% + 3D cube on crosshairs)
   ============================================================================ */
export function ArchitecturalPreloader() {
  const [pct, setPct] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDone(true)
      return
    }
    let frame = 0
    const start = performance.now()
    const duration = 560

    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setPct(Math.round(eased * 100))
      if (p < 1) {
        frame = requestAnimationFrame(step)
      } else {
        setTimeout(() => setDone(true), 120)
      }
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          role="status"
          aria-label="Loading WalkingLab"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => setDone(true)}
          className="fixed inset-0 z-[180] flex cursor-pointer flex-col justify-between overflow-hidden p-6"
          style={{
            background:
              'linear-gradient(180deg, #03060c 20%, #072b48 78%, #00b894 148%)',
          }}
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-[#edf5fa]/20" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-[#edf5fa]/20" />

          <div className="relative z-10 flex items-center justify-between">
            <WalkingLabsMark />
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#a9dbe8]/75">
              INIT // LAB.SYS
            </span>
          </div>

          <div className="relative z-10 flex items-center justify-center">
            <Cube3D size={92} interactive={false} />
          </div>

          <div className="relative z-10 flex items-end justify-between">
            <div
              className="text-[48px] leading-none font-medium tracking-[-0.055em] text-[#edf5fa] tabular-nums sm:text-[58px]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {String(pct).padStart(3, '0')}%
            </div>
            <span className="font-mono text-[11px] text-[#edf5fa]/55">CLICK TO SKIP</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ============================================================================
   3. UNDERSTATED INTERACTIVE ARCHITECTURAL 3D CUBE
      - Pure crystal-white glass (no neon green tint, no labels, no clutter)
      - Hover: subtle magnetic tilt + crisp white specular edge highlight
      - Click: smooth precision 90° mechanical turn + whisper-thin white ring
      - Drag: gentle 360° free rotation with smooth physical inertia
   ============================================================================ */
export function Cube3D({
  size = 114,
  interactive = true,
  onEnergyChange,
}: {
  size?: number
  interactive?: boolean
  onEnergyChange?: (active: boolean) => void
}) {
  const hitRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const cubeRef = useRef<HTMLDivElement>(null)

  const [hovered, setHovered] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [burst, setBurst] = useState(false)
  const [pulseId, setPulseId] = useState(0)

  const phys = useRef({
    rx: -26,
    ry: 42,
    targetDeltaY: 0,
    vx: 0,
    vy: 0,
    tiltX: 0,
    tiltY: 0,
    dragging: false,
    moved: false,
    lastX: 0,
    lastY: 0,
    hovered: false,
  })

  useEffect(() => {
    if (!interactive) return
    const cubeEl = cubeRef.current
    const hitEl = hitRef.current
    if (!cubeEl || !hitEl) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = 0
    let visible = true

    const onWindowMove = (e: PointerEvent) => {
      if (reduced || phys.current.dragging) return
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      phys.current.tiltX = -ny * 10
      phys.current.tiltY = nx * 14
    }

    const tick = () => {
      if (!visible) {
        raf = 0
        return
      }
      const p = phys.current
      if (!p.dragging) {
        // Smooth precision quarter-turn easing on click
        if (Math.abs(p.targetDeltaY) > 0.05) {
          const step = p.targetDeltaY * 0.11
          p.ry += step
          p.targetDeltaY -= step
        }
        p.rx += p.vx
        p.ry += p.vy + (reduced ? 0 : p.hovered ? 0.08 : 0.22)
        p.vx *= 0.92
        p.vy *= 0.92
        if (Math.abs(p.vx) < 0.01) p.vx = 0
        if (Math.abs(p.vy) < 0.01) p.vy = 0
        p.rx += (-24 - p.rx) * 0.012
      }

      const finalX = p.rx + (p.dragging ? 0 : p.tiltX)
      const finalY = p.ry + (p.dragging ? 0 : p.tiltY)
      cubeEl.style.transform = `rotateX(${finalX.toFixed(2)}deg) rotateY(${finalY.toFixed(2)}deg)`
      raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && !raf) raf = requestAnimationFrame(tick)
      },
      { rootMargin: '80px' },
    )
    io.observe(hitEl)
    window.addEventListener('pointermove', onWindowMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('pointermove', onWindowMove)
    }
  }, [interactive])

  const triggerQuarterTurn = () => {
    phys.current.targetDeltaY += 90
    setPulseId((n) => n + 1)
    setBurst(true)
    window.setTimeout(() => setBurst(false), 260)
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) return
    e.currentTarget.setPointerCapture(e.pointerId)
    phys.current.dragging = true
    phys.current.moved = false
    phys.current.lastX = e.clientX
    phys.current.lastY = e.clientY
    phys.current.vx = 0
    phys.current.vy = 0
    phys.current.targetDeltaY = 0
    setDragging(true)
    onEnergyChange?.(true)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || !phys.current.dragging) return
    const dx = e.clientX - phys.current.lastX
    const dy = e.clientY - phys.current.lastY
    if (Math.abs(dx) + Math.abs(dy) > 3) phys.current.moved = true
    phys.current.lastX = e.clientX
    phys.current.lastY = e.clientY
    phys.current.ry += dx * 0.6
    phys.current.rx -= dy * 0.6
    phys.current.vy = dx * 0.3
    phys.current.vx = -dy * 0.3
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || !phys.current.dragging) return
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
    const wasTap = !phys.current.moved
    phys.current.dragging = false
    setDragging(false)
    if (wasTap) triggerQuarterTurn()
    if (!phys.current.hovered) onEnergyChange?.(false)
  }

  const half = size / 2

  const faces = [
    `translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateY(90deg) translateZ(${half}px)`,
    `rotateY(-90deg) translateZ(${half}px)`,
    `rotateX(90deg) translateZ(${half}px)`,
    `rotateX(-90deg) translateZ(${half}px)`,
  ]

  return (
    <div
      ref={hitRef}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? 'Interactive 3D cube — click to turn or drag to rotate' : undefined}
      onMouseEnter={() => {
        if (!interactive) return
        phys.current.hovered = true
        setHovered(true)
        onEnergyChange?.(true)
      }}
      onMouseLeave={() => {
        if (!interactive) return
        phys.current.hovered = false
        setHovered(false)
        if (!phys.current.dragging) onEnergyChange?.(false)
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={(e) => {
        if (!interactive) return
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          triggerQuarterTurn()
        }
      }}
      className={`relative flex items-center justify-center rounded-full select-none focus:outline-none ${
        interactive ? (dragging ? 'cursor-grabbing' : 'cursor-grab') : ''
      }`}
      style={{ width: size + 72, height: size + 72 }}
    >
      {/* Whisper-thin pure silver-white ripple on click */}
      {pulseId > 0 && (
        <span
          key={pulseId}
          aria-hidden="true"
          className="cube-pulse-ring pointer-events-none absolute size-24 rounded-full border border-[#edf5fa]/45"
        />
      )}

      <div
        ref={sceneRef}
        data-hovered={hovered || dragging || undefined}
        data-burst={burst || undefined}
        className={`cube-scene relative flex items-center justify-center transition-transform duration-300 ease-out ${
          burst ? 'scale-[1.07]' : hovered || dragging ? 'scale-[1.045]' : 'scale-100'
        }`}
        style={{ width: size, height: size }}
      >
        <div
          ref={cubeRef}
          className={`cube-3d ${interactive ? '' : 'cube-3d-spin'}`}
          style={{ '--cube-size': `${size}px` } as React.CSSProperties}
        >
          {faces.map((transform, i) => (
            <div key={i} className="cube-face" style={{ transform }}>
              {i === 0 && <WalkingLabsIcon className="h-[22px] w-auto" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ============================================================================
   4. PURE-CSS GPU BORDER BEAM
   ============================================================================ */
export function BorderBeam({
  size = 110,
  duration = 7.5,
}: {
  size?: number
  duration?: number
}) {
  return (
    <div
      aria-hidden="true"
      className="css-border-beam"
      style={
        {
          '--beam-size': `${size}px`,
          '--beam-dur': `${duration}s`,
        } as React.CSSProperties
      }
    />
  )
}

/* ============================================================================
   5. FROSTED GLASS SPOTLIGHT CARD (Zero-rerender cursor sheen + backdrop blur)
   ============================================================================ */
export function FrostedBenefitCard({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const cx = e.clientX
    const cy = e.clientY
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${cx - rect.left}px`)
      el.style.setProperty('--my', `${cy - rect.top}px`)
    })
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className={`frosted-bcard frosted-grain ${className}`}
    >
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}

/* ============================================================================
   6. ANIMATED NUMBER TICKER (0 -> target easeOutExpo growth surge on scroll-in)
      - Starts at 0 and visibly accelerates then decelerates smoothly into the
        final figure every time the strip enters the viewport.
      - Direct DOM textContent update via rAF (zero React re-renders per frame).
   ============================================================================ */
export function NumberTicker({
  value,
  decimals = 0,
  suffix = '',
  delay = 0,
  className = '',
}: {
  value: number
  decimals?: number
  suffix?: string
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const fmt = (n: number) =>
      Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(Number(n.toFixed(decimals))) + suffix

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = fmt(value)
      return
    }

    let raf = 0
    let timer = 0
    let active = false
    const duration = 1650

    const resetZero = () => {
      if (raf) cancelAnimationFrame(raf)
      if (timer) window.clearTimeout(timer)
      raf = 0
      timer = 0
      el.textContent = fmt(0)
    }

    const startCount = () => {
      resetZero()
      timer = window.setTimeout(() => {
        const start = performance.now()
        const step = (now: number) => {
          const p = Math.min(1, (now - start) / duration)
          // Crisp easeOutExpo: rapid launch from 0, satisfying digit-by-digit settle
          const eased = p >= 1 ? 1 : 1 - Math.pow(2, -10 * p)
          el.textContent = fmt(value * eased)
          if (p < 1) {
            raf = requestAnimationFrame(step)
          } else {
            raf = 0
            el.textContent = fmt(value)
          }
        }
        raf = requestAnimationFrame(step)
      }, delay)
    }

    resetZero()

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !active) {
          active = true
          startCount()
        } else if (!entry.isIntersecting && active) {
          active = false
          resetZero()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)

    return () => {
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
      if (timer) window.clearTimeout(timer)
    }
  }, [value, decimals, suffix, delay])

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  )
}

/* ============================================================================
   7. ROCK-SOLID HORIZONTAL MASK-WIPE LINE REVEAL
   Uses an UNCLIPPED outer observer wrapper + mount check so IntersectionObserver
   ALWAYS fires reliably and NO heading can ever get stuck invisible!
   ============================================================================ */
export function LineReveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const outerRef = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = outerRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight + 120) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: '120px 0px 120px 0px', threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={outerRef} className={className}>
      <motion.div
        initial={false}
        animate={
          shown
            ? { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)' }
            : { opacity: 0.12, x: -12, clipPath: 'inset(0 65% 0 0)' }
        }
        transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}
