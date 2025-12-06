import { getProductById } from '@/actions/product';
import CustomerReviews from '@/components/modules/products/productDetails/CustomerReviews';
import ProductDetails from '@/components/modules/products/productDetails/ProductDetails';
import RelatedProducts from '@/components/modules/products/productDetails/RelatedProducts';
import PageBanner from '@/components/shared/PageBanner';

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data: product } = await getProductById(id);
  return (
    <div>
      <PageBanner
        heading= {product.product_name}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Product Details' },
        ]}
      />
      <div className='px-2 md:px-0'>
        <ProductDetails product={product} />
      <RelatedProducts categoryId={product.category.id}/>
      <CustomerReviews />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
