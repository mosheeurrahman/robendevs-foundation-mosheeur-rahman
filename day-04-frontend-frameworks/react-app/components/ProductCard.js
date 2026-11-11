import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product, priority = false }) {
  const { id, title, thumbnail, price, rating, category } = product;

  return (
    <Link href={`/products/${id}`} className="card">
      <div className="card-image">
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="(max-width: 500px) 100vw, 260px"
          priority={priority}
        />
      </div>
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