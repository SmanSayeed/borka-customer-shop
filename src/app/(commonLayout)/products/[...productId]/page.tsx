import ProductDetails from '@/components/modules/products/ProductDetails';

const product = {
  id: 1,
  name: 'Elegant Black Abaya',
  price: 3500,
  discount: 10,
  status: 'trending',
  color: ['Black', 'Green', 'Blue', 'Purple'],
  size: ['S', 'M', 'L', 'XL'],
  quantity: 25,
  description:
    'A beautifully designed black abaya crafted with lightweight premium fabric, perfect for both casual and special occasions.',
  specification: [
    'Material: Premium Nida Fabric',
    'Neck Style: Round',
    'Sleeve Type: Full Sleeve',
    'Care Instructions: Machine Wash Cold',
    'Occasion: Daily Wear, Party Wear',
  ],
  review:
    'Absolutely stunning abaya! The fabric is soft, elegant, and comfortable to wear.',
  image: [
    'https://res.cloudinary.com/do6tvtff8/image/upload/v1761205488/1756636393926759_tugedf.jpg',
    'https://res.cloudinary.com/do6tvtff8/image/upload/v1761205484/171524926895183_kyxvfe.jpg',
    'https://res.cloudinary.com/do6tvtff8/image/upload/v1761205484/171480007779230_c9ygw5.jpg',
    'https://res.cloudinary.com/do6tvtff8/image/upload/v1761205484/1730173954017210_lkkzx0.jpg',
  ],
  category: 'Abaya',
};

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductDetailsPage;
