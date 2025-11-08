import ProductCatalog from '@/components/modules/products/ProductCatalog';
import PageBanner from '@/components/shared/PageBanner';
import { getAllProducts } from '@/services/product';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const query = await searchParams;
  const {search} = query;
  console.log(search, 'from product page')

  const { data: products } = await getAllProducts(undefined, undefined, query);

  return (
    <div>
      <PageBanner />
      <div className='max-w-7xl my-10 mx-auto'>
        <ProductCatalog products={products} />
      </div>
    </div>
  );
};

export default ProductsPage;
