import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { id, title, thumbnail, price, rating, category } = product;

  return (
    <Link to={`/products/${id}`} className="card">
      <img src={thumbnail} alt={title} loading="lazy" />
      <div className="card-body">
        <span className="badge">{category}</span>
        <h3>{title}</h3>
        <div className="card-footer">
          <strong>${price.toFixed(2)}</strong>
          <span>⭐ {rating}</span>
        </div>
      </div>
    </Link>
  );
}
