import { Link, Outlet } from 'react-router-dom';
import { PATHS } from '../../routes/paths';

export default function DefaultLayout() {
  return (
    <>
      <header className="header">
        <Link to={PATHS.PRODUCTS} className="logo">MiniShop</Link>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}