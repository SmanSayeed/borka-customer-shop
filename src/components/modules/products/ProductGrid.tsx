import Loader from '@/components/shared/Loader';
import ProductCard from './ProductCard';
import type { Product } from './ProductCatalog';
import ProductPagination from './ProductPagination';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  currentPage?: number;
  totalPages?: number;
  setPage?: (page: number) => void;
  gridCols?: number;
}

const ProductGrid = ({
  products,
  isLoading,
  currentPage,
  totalPages,
  setPage,
  gridCols,
}: ProductGridProps) => {
  const gridClass = {
    2: 'grid-cols-1',
    3: 'grid-cols-1 sm:grid-cols-2',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  }[gridCols];

  return (
    <div>
      <div
        className={`grid ${gridClass} gap-8 mb-8 transition-all duration-500 ease-in-out`}
      >
        {isLoading ? (
          <Loader />
        ) : products?.length === 0 ? (
          <>Products not found</>
        ) : (
          products?.map((product) => (
            <div
              key={product.id}
              className='transform transition-transform duration-500 hover:scale-[1.02]'
            >
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <ProductPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default ProductGrid;
