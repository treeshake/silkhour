import { isNil } from 'rambda';

export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

export function getCartSessionCookie() {
  const cartCookie = getCookie('cart');
  return !isNil(cartCookie) ? decodeURIComponent(cartCookie) : null;
}
