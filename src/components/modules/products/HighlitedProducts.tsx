import ProductCard from './ProductCard';

export default function HighlightedProduct({ product }: any) {
  const spanClass = product.is_highlight
    ? 'col-span-12 md:col-span-4'
    : 'col-span-6 md:col-span-4';

  return (
    <div className={spanClass}>
      <ProductCard product={product} />
    </div>
  );
}
