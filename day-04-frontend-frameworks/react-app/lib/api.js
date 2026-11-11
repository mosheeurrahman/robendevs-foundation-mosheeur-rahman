const BASE_URL = 'https://dummyjson.com';

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`, { cache: 'no-store' });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

export const getProducts = () => request('/products');
export const getProductById = (id) => request(`/products/${id}`);