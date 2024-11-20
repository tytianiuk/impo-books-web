'use client';
import { useQueryState } from 'nuqs';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SignInForm from '@/modules/auth/components/sign-in-form';
import SignUpForm from '@/modules/auth/components/sign-up-form';

const AuthTabs = () => {
  const [tab, setTab] = useQueryState('tab');

  const handleTabChange = (value: string) => {
    setTab(value, { shallow: false });
  };

  return (
    <Tabs
      defaultValue={tab || 'login'}
      onValueChange={handleTabChange}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login" data-testid="login">
          Вхід
        </TabsTrigger>
        <TabsTrigger value="register" data-testid="register">
          Реєстрація
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <SignInForm />
      </TabsContent>
      <TabsContent value="register">
        <SignUpForm />
      </TabsContent>
    </Tabs>
  );
};

export default AuthTabs;
