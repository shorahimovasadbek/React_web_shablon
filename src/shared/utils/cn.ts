/** Shartli klasslarni birlashtiradi: cn('btn', active && 'is-active') */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
