'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';

interface IFilterResponse {
  main_category?: string[];
  category?: string[];
  [key: string]: any;
}

export default function ProductBreadcrumb({
  filterResponse,
}: {
  filterResponse: IFilterResponse;
}) {
  const mainCategories = filterResponse?.main_category || [];
  const categories = filterResponse?.category || [];

  const mainCatText = mainCategories.length
    ? mainCategories.map((c) => c.replace(/-/g, ' ')).join(', ')
    : null;

  const categoryText = categories.length
    ? categories.map((c) => c.replace(/-/g, ' ')).join(', ')
    : null;

  return (
    <Breadcrumb className='mb-6'>
      <BreadcrumbList>
        {/* Home */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href='/'>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        {/* Products */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href='/products'>Products</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Main Category */}
        {mainCatText && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className='capitalize'>
                {mainCatText}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}

        {/* Category */}
        {categoryText && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className='capitalize'>
                {categoryText}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
