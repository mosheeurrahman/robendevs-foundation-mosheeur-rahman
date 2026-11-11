import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../api';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');

    getProductById(id, controller.signal)
      .then((data) => {
        setProduct(data);
        setActiveImage(data.images?.[0] || data.thumbnail);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [id]);

  if (loading) return <p className="status">Loading...</p>;
  if (error) return <p className="status status-error">{error}</p>;

  const {
    title, description, category, brand, price, discountPercentage, rating,
    stock, availabilityStatus, tags, sku, weight, dimensions,
    warrantyInformation, shippingInformation, returnPolicy,
    minimumOrderQuantity, reviews, images,
  } = product;

  return (
    <section>
      <Link to="/" className="back">← Back to products</Link>

      <div className="details">
        <div className="gallery">
          <img className="main-image" src={activeImage} alt={title} />
          <div className="thumbs">
            {images.map((img) => (
              <img
                key={img}
                src={img}
                alt=""
                className={img === activeImage ? 'active' : ''}
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>
        </div>

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
          <small className="muted">{new Date(r.date).toLocaleDateString()}</small>
        </div>
      ))}
    </section>
  );
}