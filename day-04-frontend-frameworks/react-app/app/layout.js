import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'MiniShop',
  description: 'Browse our products',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <Link href="/" className="logo">MiniShop</Link>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}