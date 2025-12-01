export type Language = 'de' | 'en';

/**
 * Extrahiert die Sprache aus dem aktuellen URL-Pfad
 * Root (/) = Deutsch, /en = Englisch
 */
export function getLanguageFromPath(): Language {
  const path = window.location.pathname;
  if (path.startsWith('/en')) {
    return 'en';
  }
  // Root oder alles andere = Deutsch (Standard)
  return 'de';
}

/**
 * Erstellt einen URL-Pfad für eine bestimmte Sprache und Seite
 * Deutsch: / oder /?p=imprint
 * Englisch: /en oder /en?p=imprint
 */
export function getPathForLanguage(lang: Language, page?: string): string {
  if (lang === 'en') {
    const base = '/en';
    if (page && page !== 'home') {
      return `${base}?p=${page}`;
    }
    return base;
  }
  // Deutsch: Root URL
  if (page && page !== 'home') {
    return `/?p=${page}`;
  }
  return '/';
}

/**
 * Wechselt zur URL einer anderen Sprache
 */
export function switchLanguageUrl(lang: Language, currentPage?: string): string {
  return getPathForLanguage(lang, currentPage);
}

/**
 * Extrahiert die aktuelle Seite aus der URL (z.B. 'imprint', 'privacy' oder 'home')
 */
export function getCurrentPageFromUrl(): string {
  const params = new URLSearchParams(window.location.search);
  const page = params.get('p');
  return page || 'home';
}

