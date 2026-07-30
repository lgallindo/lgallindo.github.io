export type LocaleCode = "en_US" | "pt_BR" | "tok";
export type PublicLocaleCode = "en_US" | "pt_BR";

export const publicLocales: PublicLocaleCode[] = ["en_US", "pt_BR"];
export const defaultLocale: PublicLocaleCode = "en_US";
export const secretLocale: LocaleCode = "tok";

export const localeLabels: Record<LocaleCode, string> = {
  en_US: "en",
  pt_BR: "pt",
  tok: "tok",
};

export function isPublicLocale(locale: string): locale is PublicLocaleCode {
  return publicLocales.includes(locale as PublicLocaleCode);
}

export function localizedPath(locale: PublicLocaleCode, path = "/"): string {
  const cleanPath = path === "/" ? "" : path.replace(/\/$/, "");
  return `/${locale}${cleanPath}/`;
}
