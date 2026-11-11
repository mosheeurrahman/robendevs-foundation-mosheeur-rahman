import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/api';
import Gallery from './Gallery';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  return { title: product ? `${product.title} | MiniShop` : 'Not found' };
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const {
    title, description, category, brand, price, discountPercentage, rating,
    stock, availabilityStatus, tags, sku, weight, dimensions,
    warrantyInformation, shippingInformation, returnPolicy,
    minimumOrderQuantity, reviews, images,
  } = product;

  return (
    <section>
      <Link href="/" className="back">← Back to products</Link>

      <div className="details">
        <Gallery images={images} title={title} />

        <div className="info">
          <span className="badge">{category}</span>
          <h1>{title}</h1>
          {brand && <p className="muted">by {brand}</p>}
          <p>{description}</p>

          <p className="price">
            ${price.toFixed(2)} <small>({discountPercentage}% off)</small>
          </p>
          <p>⭐ {rating} · {availabilityStatus} ({stock} in stock)</p>

          <ul className="specs">
            <li><b>SKU:</b> {sku}</li>
            <li><b>Weight:</b> {weight}</li>
            <li><b>Dimensions:</b> {dimensions.width} × {dimensions.height} × {dimensions.depth}</li>
            <li><b>Min. order:</b> {minimumOrderQuantity}</li>
            <li><b>Warranty:</b> {warrantyInformation}</li>
            <li><b>Shipping:</b> {shippingInformation}</li>
            <li><b>Returns:</b> {returnPolicy}</li>
          </ul>

          <div className="tags">
            {tags.map((tag) => <span key={tag} className="badge">#{tag}</span>)}
          </div>
        </div>
      </div>

      <h2 className="reviews-title">Reviews</h2>
      {reviews.map((r, i) => (
        <div key={i} className="review">
          <strong>{r.reviewerName}</strong> <span>{'⭐'.repeat(r.rating)}</span>
          <p>{r.comment}</p>
          <small className="muted">{new Date(r.date).toLocaleDateString('en-US')}</small>
        </div>
      ))}
    </section>
  );
}