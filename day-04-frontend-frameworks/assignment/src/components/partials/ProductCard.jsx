import { Link } from 'react-router-dom';
import { formatPrice } from '../../common/utils/formatPrice';
import { getProductPath } from '../../routes/paths';

export default function ProductCard({ product }) {
  const { id, title, thumbnail, price, rating, category } = product;

  return (
    <Link to={getProductPath(id)} className="card">
      <img src={thumbnail} alt={title} loading="lazy" />
      <div className="card-body">
        <span className="badge">{category}</span>
        <h3>{title}</h3>
        <div className="card-footer">
          <strong>{formatPrice(price)}</strong>
          <span>⭐ {rating}</span>
        </div>
      </div>
    </Link>
  );
}