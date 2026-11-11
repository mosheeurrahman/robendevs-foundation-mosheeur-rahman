import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';

export default function App() {
  return (
    <BrowserRouter>
      <header className="header">
        <Link to="/" className="logo">MiniShop</Link>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}