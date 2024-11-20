import { Metadata } from 'next';
import { FC, Suspense } from 'react';

import AuthPage from '@/modules/auth/auth-page';

interface AuthProps {
  searchParams: {
    tab: string;
  };
}

export const generateMetadata = async ({
  searchParams,
}: AuthProps): Promise<Metadata> => {
  const title = searchParams.tab === 'register' ? 'Реєстрація' : 'Вхід';
  return {
    title: `ImpoBooks | ${title}`,
  };
};

const Auth: FC<AuthProps> = () => {
  return (
    <div className="h-[80%] grid place-items-center">
      <Suspense fallback={<div>Loading...</div>}>
        <AuthPage />
      </Suspense>
    </div>
  );
};

export default Auth;
