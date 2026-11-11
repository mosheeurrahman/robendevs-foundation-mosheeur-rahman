'use client';

export default function Error({ reset }) {
  return (
    <div className="status status-error">
      <p>Something went wrong.</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}