import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function publicAsset(path: string) {
  return `${import.meta.env.BASE_URL}${path}`
}
