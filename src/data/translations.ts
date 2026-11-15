import type { Language } from './languages'

const keys = [
  'About', 'Projects', 'Voices', 'Method', 'Community', 'FAQ',
  'Open menu', 'Site language', 'Browse the repositories', 'Join Discord',
  'Everyone can teach machines how to think.',
  'WalkingLabs turns real-world AI engineering practices from industry into hands-on courses anyone can follow. Our courses and code are open source.',
  'We want more people to push the limits of intelligence and help accelerate progress toward AGI.',
] as const

type TranslationRow = readonly string[] & { length: typeof keys.length }

const translations = {
  es: [
    'Acerca de', 'Proyectos', 'Opiniones', 'Método', 'Comunidad', 'Preguntas frecuentes',
    'Abrir menú', 'Idioma del sitio', 'Explorar repositorios', 'Unirse a Discord',
    'Cualquiera puede enseñar a las máquinas a pensar.',
    'WalkingLabs convierte la experiencia de proyectos reales de ingeniería de IA en cursos prácticos al alcance de todos. Los cursos y el código son abiertos.',
    'Queremos que más personas puedan ampliar los límites de la inteligencia y acelerar el avance hacia la IAG.',
  ],
  pt: [
    'Sobre', 'Projetos', 'Depoimentos', 'Método', 'Comunidade', 'Perguntas frequentes',
    'Abrir menu', 'Idioma do site', 'Explorar repositórios', 'Entrar no Discord',
    'Qualquer pessoa pode ensinar as máquinas a pensar.',
    'A WalkingLabs transforma a experiência de projetos reais de engenharia de IA em cursos práticos que qualquer pessoa pode acompanhar. Os cursos e o código são abertos.',
    'Queremos que mais pessoas possam ampliar os limites da inteligência e acelerar o avanço rumo à IAG.',
  ],
  fr: [
    'À propos', 'Projets', 'Témoignages', 'Méthode', 'Communauté', 'FAQ',
    'Ouvrir le menu', 'Langue du site', 'Parcourir les dépôts', 'Rejoindre Discord',
    'Tout le monde peut apprendre aux machines à penser.',
    'WalkingLabs transforme son expérience de projets concrets en ingénierie de l’IA en cours pratiques accessibles à tous. Les cours et le code sont ouverts.',
    'Nous voulons que davantage de personnes puissent repousser les limites de l’intelligence et accélérer les progrès vers l’IAG.',
  ],
  de: [
    'Über uns', 'Projekte', 'Stimmen', 'Methode', 'Community', 'FAQ',
    'Menü öffnen', 'Sprache der Website', 'Repositorys durchsuchen', 'Discord beitreten',
    'Jeder kann Maschinen das Denken beibringen.',
    'WalkingLabs macht Erfahrungen aus realen KI-Projekten in praxisnahen Kursen für alle zugänglich. Kurse und Code sind quelloffen.',
    'Wir möchten, dass mehr Menschen die Grenzen der Intelligenz erweitern und den Fortschritt hin zu AGI beschleunigen können.',
  ],
  ja: [
    '概要', 'プロジェクト', '読者の声', '学習方法', 'コミュニティ', 'よくある質問',
    'メニューを開く', 'サイトの言語', 'リポジトリを見る', 'Discord に参加',
    '誰でも機械に考え方を教えられる。',
    'WalkingLabs は、実際の AI 開発で得た知見を、誰でも手を動かして学べる講座にまとめています。講座とコードは公開されています。',
    'より多くの人が知能の限界に挑み、AGI への歩みを加速できるようにしたいと考えています。',
  ],
  ko: [
    '소개', '프로젝트', '독자 후기', '학습 방법', '커뮤니티', '자주 묻는 질문',
    '메뉴 열기', '사이트 언어', '저장소 둘러보기', 'Discord 참여',
    '누구나 기계에 생각하는 법을 가르칠 수 있습니다.',
    'WalkingLabs는 실제 AI 개발 프로젝트의 경험을 누구나 따라 할 수 있는 실습 강의로 만듭니다. 강의와 코드는 공개되어 있습니다.',
    '더 많은 사람이 지능의 한계에 도전하고 AGI를 향한 발전을 앞당길 수 있기를 바랍니다.',
  ],
  ru: [
    'О нас', 'Проекты', 'Отзывы', 'Методика', 'Сообщество', 'Вопросы и ответы',
    'Открыть меню', 'Язык сайта', 'Посмотреть репозитории', 'Вступить в Discord',
    'Каждый может научить машины думать.',
    'WalkingLabs превращает опыт реальных проектов в области ИИ в практические курсы, доступные каждому. Курсы и код открыты.',
    'Мы хотим, чтобы больше людей могли расширять границы интеллекта и ускорять движение к AGI.',
  ],
  ar: [
    'نبذة عنا', 'المشاريع', 'آراء القراء', 'طريقة التعلم', 'المجتمع', 'الأسئلة الشائعة',
    'فتح القائمة', 'لغة الموقع', 'تصفح المستودعات', 'انضم إلى Discord',
    'يمكن للجميع تعليم الآلات كيف تفكر.',
    'تحوّل WalkingLabs خبرات هندسة الذكاء الاصطناعي من مشاريع حقيقية إلى دورات عملية يمكن للجميع متابعتها. الدورات والشيفرة مفتوحة المصدر.',
    'نريد أن نتيح لمزيد من الناس فرصة توسيع حدود الذكاء وتسريع التقدم نحو الذكاء الاصطناعي العام.',
  ],
} as const satisfies Record<Exclude<Language, 'en' | 'zh'>, TranslationRow>

export function translate(language: Exclude<Language, 'en' | 'zh'>, english: string) {
  const index = keys.findIndex(key => key === (english === 'Join the Discord' ? 'Join Discord' : english))
  return translations[language][index] ?? english
}
