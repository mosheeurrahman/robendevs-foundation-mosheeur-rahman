const BASE_URL = 'https://dummyjson.com';

async function request(path, signal) {
  const res = await fetch(`${BASE_URL}${path}`, { signal });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

export const getProducts = (signal) => request('/products?limit=0', signal);
export const getProductById = (id, signal) => request(`/products/${id}`, signal);