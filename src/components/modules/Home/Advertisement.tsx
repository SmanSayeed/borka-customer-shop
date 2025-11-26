'use client'

import Container from '@/components/shared/Container';
import { IHomeProduct } from '@/types/home';
import Image from 'next/image';
import Link from 'next/link';

export default function Advertisement({ section }: { section: IHomeProduct }) {
  return (
    <section className='px-0 mt-12 md:mt-24 md:container mx-auto'>
      <div className="grid grid-cols-12 md:gap-6">
        {section.content.map((ad, index) => {
          let colClass = '';

          // Desktop & Laptop
          if (index === 0) colClass = 'col-span-6';
          else colClass = 'col-span-3';

          // Mobile
          const mobileCol = index === 0 ? 'col-span-12' : 'col-span-6';

          return (
            <Link
              key={ad.id}
              href={ad.action_url || '#'}
              className={`${mobileCol} md:${colClass} relative group overflow-hidden`}
            >
              <Image
                src={ad.url || ad.thumbnail_url || ''}
                alt={`Advertisement ${ad.id}`}
                width={600}
                height={400}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
