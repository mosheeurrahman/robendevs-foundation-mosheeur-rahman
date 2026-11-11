import { getProducts } from '@/lib/api';
import ProductCard from '@/components/ProductCard';

export const dynamic = 'force-dynamic'; // render on the server for every request (SSR)

export const metadata = { title: 'All Products | MiniShop' };

export default async function ProductListPage() {
  const data = await getProducts();
  const products = data.products;

  return (
    <section>
      <h1 className="page-title">All Products ({products.length})</h1>
      <div className="grid">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} priority={i < 4} />
        ))}
      </div>
    </section>
  );
}