'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { IProductDetails, IStockDetail } from '@/types/product';

interface Props {
  product: IProductDetails;
}

export default function ProductAdditionalInfo({ product }: Props) {
  return (
    <Accordion type='single' collapsible className='w-full space-y-2'>
      {/* Description */}
      <AccordionItem value='short_description'>
        <AccordionTrigger>
          <h4 className='text-base sm:text-lg'>Description</h4>
        </AccordionTrigger>
        <AccordionContent className=''>
          <div
            className='text-gray-700 whitespace-pre-wrap text-sm sm:text-base'
            dangerouslySetInnerHTML={{
              __html: product.short_description || 'N/A',
            }}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value='specification'>
        <AccordionTrigger>
          <h4 className='text-base sm:text-lg'>Specification</h4>
        </AccordionTrigger>
        <AccordionContent className=''>
          <div
            className='text-gray-700 whitespace-pre-wrap text-sm sm:text-base'
            dangerouslySetInnerHTML={{
              __html: product.specification || 'N/A',
            }}
          />
        </AccordionContent>
      </AccordionItem>

      {/* Stock Details */}
      <AccordionItem value='stock_details'>
        <AccordionTrigger>
          <h4 className='text-base sm:text-lg'>Stock Details</h4>
        </AccordionTrigger>

        <AccordionContent className=''>
          <div className='overflow-x-auto mt-2 border rounded-md'>
            <table className='min-w-[500px] w-full text-xs sm:text-sm border-collapse'>
              <thead className='bg-gray-100'>
                <tr>
                  <th className='border px-2 py-2 text-left'>Size</th>
                  <th className='border px-2 py-2 text-left'>Width</th>
                  <th className='border px-2 py-2 text-left'>Length</th>
                  <th className='border px-2 py-2 text-left'>Sleeve</th>
                  <th className='border px-2 py-2 text-left'>Stock</th>
                </tr>
              </thead>

              <tbody>
                {product.stock_details?.map((item: IStockDetail) => (
                  <tr key={item.id} className='odd:bg-white even:bg-gray-50'>
                    <td className='border px-2 py-2'>{item.size.name}</td>
                    <td className='border px-2 py-2'>{item.size.width} in</td>
                    <td className='border px-2 py-2'>{item.size.length} in</td>
                    <td className='border px-2 py-2'>{item.size.sleeve} in</td>
                    <td className='border px-2 py-2 font-semibold'>
                      {item.stock}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
