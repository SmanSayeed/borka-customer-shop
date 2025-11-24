'use client'

import { getProductsBySection } from '@/actions/home';
import { IProduct } from '@/types';
import { IAdContent } from '@/types/home';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../products/ProductCard';

const SectionProducts = ({ section }: { section: IAdContent }) => {
  const { data: productsData, isLoading } = useQuery({
    queryKey: ['sectionProducts', section.id],
    queryFn: () => getProductsBySection(section.id)
  });

  if (isLoading) return <p>Loading products...</p>;

  const products: IProduct[] = productsData?.data || [];

  return (
    <section>
      <h2>{section.title}</h2>
      <p>{section.subtitle}</p>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default SectionProducts;