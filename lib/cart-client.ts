'use client';

const KEY = 'fp_cart_v2';

export type ClientCartItem = { productId: string; quantity: number };

export function getCart(): ClientCartItem[] {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(KEY) || '[]');
}

export function setCart(items: ClientCartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function addToCart(productId: string, quantity: number) {
  const cart = getCart();
  const hit = cart.find((x) => x.productId === productId);
  if (hit) hit.quantity += quantity;
  else cart.push({ productId, quantity });
  setCart(cart);
}
