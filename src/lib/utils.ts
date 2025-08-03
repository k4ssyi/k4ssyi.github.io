import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * shadcn/ui用のクラス名結合ユーティリティ
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs))
}
