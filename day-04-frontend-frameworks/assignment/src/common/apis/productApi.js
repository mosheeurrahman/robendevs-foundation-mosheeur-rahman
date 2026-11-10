import { BASE_URL } from '../constants/api';

async function request(url, signal) {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

export const getProducts = (signal) =>
  request(`${BASE_URL}/products`, signal);

export const getProductById = (id, signal) =>
  request(`${BASE_URL}/products/${id}`, signal);

export const searchProducts = (query, signal) =>
  request(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}`, signal);