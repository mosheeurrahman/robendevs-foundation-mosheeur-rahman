import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../components/layouts/DefaultLayout';
import ProductListPage from '../pages/ProductListPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import { PATHS } from './paths';

export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      { path: PATHS.PRODUCTS, element: <ProductListPage /> },
      { path: PATHS.PRODUCT_DETAILS, element: <ProductDetailsPage /> },
    ],
  },
]);