export default function StatusMessage({ type = 'info', children }) {
  return <p className={`status status-${type}`}>{children}</p>;
}