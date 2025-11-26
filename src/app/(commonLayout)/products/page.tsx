import ProductList from '@/components/modules/products/ProductList';
import Loader from '@/components/shared/Loader';
import PageBanner from '@/components/shared/PageBanner';
import { Suspense } from 'react';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const ProductsPage = async () => {

  return (
    <div>
      <PageBanner 
        heading='Product List' 
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products' }
        ]} 
      />
      <div className='container my-10 mx-auto'>
        <Suspense fallback={<Loader />}>
          <ProductList />
        </Suspense>
      </div>

    </div>
  );
};

export default ProductsPage;
