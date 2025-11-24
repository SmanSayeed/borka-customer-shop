'use client';

import { getAllHomeSections } from '@/actions/home';
import { useQuery } from '@tanstack/react-query';
import Advertisement from './Advertisement';


export default function HomeSection() {
  const { data: sectionsData, isLoading: isSectionsLoading } = useQuery(
    {queryKey: ['homeSections'],
    queryFn: getAllHomeSections, 
    staleTime: 60 * 60 * 1000, 
    }
  );

  if (isSectionsLoading) return <p>Loading sections...</p>;

  const sections= sectionsData.data || [];

  return (
    <div>
        <Advertisement ads={sections} />;
    </div>
  );
}


