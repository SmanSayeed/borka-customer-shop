'use client';

import { GlobalContextProvider } from '@/context/GlobalContext';
import QueryProvider from './QueryProviders';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <GlobalContextProvider>{children}</GlobalContextProvider>
    </QueryProvider>
  );
};

export default Providers;
