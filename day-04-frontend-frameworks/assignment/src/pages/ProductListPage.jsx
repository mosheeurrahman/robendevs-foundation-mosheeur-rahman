import { useEffect, useState } from 'react';
import { getProducts } from '../api';
import ProductCard from '../components/ProductCard';

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    getProducts(controller.signal)
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return; // cancelled on purpose, ignore
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []); // [] = run once when the page opens

  if (loading) return <p className="status">Loading...</p>;
  if (error) return <p className="status status-error">{error}</p>;

  return (
    <section>
      <h1 className="page-title">All Products ({products.length})</h1>
      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}