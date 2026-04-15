import { Semester } from './gpa';

export interface UserOptions {
  theme?: string;
  layout?: string;
  language?: string;
  gpaSemesters?: Semester[];
  cgpaSemesters?: Semester[];
  version?: string;
}

/**
 * Sets a cookie with a specific name, value, and expiration in days.
 */
export function setCookie(name: string, value: string, days: number): void {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

/**
 * Retrieves the value of a cookie by name.
 */
export function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return decodeURIComponent(match[2]);
  return null;
}

/**
 * Safely stringifies and saves the UserOptions object to a cookie.
 */
export function saveUserOptions(options: UserOptions): void {
  try {
    const jsonStr = JSON.stringify(options);
    setCookie('userOptions', jsonStr, 30);
  } catch (error) {
    console.error('Failed to save user options to cookies', error);
  }
}

/**
 * Safely parses and loads the UserOptions object from a cookie.
 */
export function loadUserOptions(): UserOptions | null {
  const cookieVal = getCookie('userOptions');
  if (!cookieVal) return null;
  try {
    const options = JSON.parse(cookieVal) as UserOptions;
    return options;
  } catch (error) {
    console.error('Failed to parse user options from cookies', error);
    return null;
  }
}

/**
 * Applies options visually if needed (e.g., Theme/Language).
 * Note: Data specific state like 'gpaSemesters' is handled directly via React state initialization.
 */
export function applyOptions(options: UserOptions): void {
  if (options.theme) {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(options.theme);
  }
  // Future implementation for layout and language
}

/**
 * Clears user options cookies.
 */
export function clearCookies(): void {
  setCookie('userOptions', '', -1);
  setCookie('useLastOptions', '', -1);
}
