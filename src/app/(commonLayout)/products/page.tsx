'use client';

import ProductList from '@/components/modules/products/ProductList';
import { Suspense } from 'react';

const ProductsPage = () => {
  return (
    <div className='container mx-auto px-2 md:px-0 py-8'>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductList />
      </Suspense>
    </div>
  );
};

export default ProductsPage;
