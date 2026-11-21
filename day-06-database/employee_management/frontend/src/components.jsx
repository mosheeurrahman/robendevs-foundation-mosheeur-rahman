import { useEffect, useState } from 'react';
import { imageUrl } from './api.js';

// Loads data and tracks loading / error state.
export function useFetch(fn, deps) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fn()
      .then((d) => !cancelled && setData(d))
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, error, loading };
}

export function Status({ loading, error, empty, emptyText }) {
  if (loading) return <p className="state">Loading…</p>;
  if (error) return <p className="state error">Couldn’t load data: {error}</p>;
  if (empty) return <p className="state">{emptyText}</p>;
  return null;
}

// Shows the photo, or initials if there is no image / it fails to load.
export function Avatar({ employee, size = 48 }) {
  const [failed, setFailed] = useState(false);
  const src = imageUrl(employee.image_path);
  console.log('image_path:', employee.image_path, '→ src:', src);
  const initials = `${employee.first_name?.[0] || ''}${employee.last_name?.[0] || ''}`;

  return (
    <div className="avatar" style={{ width: size, height: size, fontSize: size * 0.38 }}>
      {src && !failed ? (
        <img src={src} alt="" onError={() => setFailed(true)} />
      ) : (
        initials
      )}
    </div>
  );
}
