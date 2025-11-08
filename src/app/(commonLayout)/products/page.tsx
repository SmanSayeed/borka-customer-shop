import { getAllProducts } from '@/actions/product';
import ProductCatalog from '@/components/modules/products/ProductCatalog';
import ProductList from '@/components/modules/products/ProductList';
import PageBanner from '@/components/shared/PageBanner';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const ProductsPage = async () => {
  // const query = await searchParams;
  // const { search } = query;
  // console.log(search, 'from product page');

  // const { data: products } = await getAllProducts(undefined, undefined, query);

  return (
    <div>
      <PageBanner />
      <div className='max-w-7xl my-10 mx-auto'>
        {/* <ProductCatalog products={products} /> */}
        <ProductList />
      </div>

    </div>
  );
};

export default ProductsPage;
