import ProductList from '@/components/modules/products/ProductList';
import PageBanner from '@/components/shared/PageBanner';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const ProductsPage = async () => {

  return (
    <div>
      <PageBanner text='Product List'/>
      <div className='container my-10 mx-auto'>
        <ProductList />
      </div>

    </div>
  );
};

export default ProductsPage;
