'use client'

import Container from '@/components/shared/Container';
import { IAdContent } from '@/types/home';
import Image from 'next/image';
import Link from 'next/link';

export default function Advertisement({ ads }: { ads: IAdContent[] }) {
  return (
    <Container>
      {ads.map((section: IAdContent) => (
        <div key={section.id} className="grid grid-cols-12 gap-4 md:gap-6">
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
                href={ad.action_url}
                className={`${mobileCol} md:${colClass} relative group overflow-hidden`}
              >
                <Image
                  src={ad.url}
                  alt={`Advertisement ${ad.id}`}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            );
          })}
        </div>
      ))}
    </Container>
  );
}
