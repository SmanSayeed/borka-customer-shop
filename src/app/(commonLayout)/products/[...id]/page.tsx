import { getProductById } from '@/actions/product';
import ProductDetails from '@/components/modules/products/productDetails/ProductDetails';
import BreadcrumbBanner from '@/components/shared/Breadcrumb';
import { IProduct } from '@/types';

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data: product } = await getProductById(id);
  return (
    <div>
      {/* <BreadcrumbBanner
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Product Details' },
        ]}
      /> */}
      {/* <ProductDetails product={product} /> */}
      hello
      
    </div>
  );
};

export default ProductDetailsPage;
