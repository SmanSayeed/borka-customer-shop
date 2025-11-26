'use client';

import { getAllHomeSections } from '@/actions/home';
import Loader from '@/components/shared/Loader';
import { IHomeProduct } from '@/types/home';
import { useQuery } from '@tanstack/react-query';
import Advertisement from './Advertisement';
import HomeBanner from './HomeBanner';
import HomeProducts from './HomeProducts';

export default function HomeSection() {
  const { data: sectionsData, isLoading } = useQuery({
    queryKey: ['homeSections'],
    queryFn: getAllHomeSections,
    staleTime: 60 * 60 * 1000,
  });

  if (isLoading) return <Loader />;

  const sections: IHomeProduct[] = sectionsData?.data || [];

  const bannerSlides = sections.filter((section) => section.type === 1);

  return (
    <div>
      {bannerSlides.length > 0 && <HomeBanner slides={bannerSlides} />}

      <div className='md:container mx-auto'>
        {sections.map((section) => {
          switch (section.type) {
            case 2:
              return <Advertisement key={section.id} section={section} />;

            case 3:
              return <HomeProducts key={section.id} section={section} />;

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
