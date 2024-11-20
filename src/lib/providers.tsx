'use client';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { FC, PropsWithChildren, useEffect } from 'react';

import AuthAPI from '@/api/auth-api';
import { Toaster } from '@/components/ui/toaster';
import useUserStore from '@/hooks/store/use-user-store';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  const { user, setUser, setLoading } = useUserStore((state) => state);

  useEffect(() => {
    if (user === null) {
      setLoading(true);
      AuthAPI.getMe()
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <NuqsAdapter>
      {children}
      <Toaster />
    </NuqsAdapter>
  );
};

export default Providers;
