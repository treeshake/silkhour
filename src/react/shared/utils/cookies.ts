import { isNil } from 'rambda';

export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

export function setCookie(name: string, value: string, days = 30) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  return value;
}

export function getCartSessionCookie() {
  const cartCookie = getCookie('cart');
  return !isNil(cartCookie) ? decodeURIComponent(cartCookie) : null;
}
