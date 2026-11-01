/** NFKC + lowercase for case-insensitive substring matching. */
export function nfkcLower(s: string): string {
  return s.normalize("NFKC").toLowerCase();
}

export function includesPhrase(haystack: string, needle: string): boolean {
  if (!needle) return false;
  return nfkcLower(haystack).includes(nfkcLower(needle));
}
