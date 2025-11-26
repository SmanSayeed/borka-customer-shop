// src/hooks/useDeliveryZones.ts
import { getDeliveryZones } from '@/actions/order';
import { useQuery } from '@tanstack/react-query';

export const useDeliveryZones = () => {
  return useQuery({
    queryKey: ['deliveryZones'],
    queryFn: getDeliveryZones,
    staleTime: 10 * 60 * 1000, 
  });
};
