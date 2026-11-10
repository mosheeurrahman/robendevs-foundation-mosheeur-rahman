import { useEffect, useState } from 'react';
import { getProducts, searchProducts } from '../../common/apis/productApi';
import { DEBOUNCE_DELAY } from '../../common/constants/api';
import useDebounce from '../../common/hooks/useDebounce';
import ProductCard from '../../components/partials/ProductCard';
import StatusMessage from '../../components/partials/StatusMessage';

export default function ProductList() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const debouncedQuery = useDebounce(query.trim(), DEBOUNCE_DELAY);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError('');
      try {
        const data = debouncedQuery
          ? await searchProducts(debouncedQuery, controller.signal)
          : await getProducts(controller.signal);
        setProducts(data.products);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort(); // cancel the old request if a new one starts
  }, [debouncedQuery]);

  return (
    <section>
      <input
        className="search"
        type="search"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <StatusMessage>Loading...</StatusMessage>}
      {error && <StatusMessage type="error">{error}</StatusMessage>}
      {!loading && !error && products.length === 0 && (
        <StatusMessage>No products found.</StatusMessage>
      )}

      <div className="grid">
        {!loading && products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}