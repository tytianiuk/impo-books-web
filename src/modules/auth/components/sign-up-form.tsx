import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import AuthAPI from '@/api/auth-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Routes from '@/constants/routes';
import useUserStore from '@/hooks/store/use-user-store';
import { useToast } from '@/hooks/use-toast';
import {
  signUpDefaultValues,
  RegisterFormValues,
  registerSchema,
} from '@/modules/auth/constants';

const SignUpForm = () => {
  const { replace } = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: signUpDefaultValues,
  });
  const { setUser } = useUserStore((state) => state);
  const { toast } = useToast();

  const allFields = watch();

  const allFieldsFilled = Object.values(allFields).every((value) => value);

  const handleRegister = async (data: RegisterFormValues) => {
    const { fullName, password, email } = data;

    try {
      const res = await AuthAPI.register(email, fullName, password);
      if (res.status === 201) {
        await AuthAPI.login(email, password);
        const user = await AuthAPI.getMe();
        setUser(user.data);
        replace(Routes.CATALOG);
      }
    } catch {
      toast({
        title: 'Помилка при створенні аккаунту',
        description: 'Перевірте правильність введених даних',
        variant: 'destructive',
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="space-y-4"
      role="form"
    >
      <Input
        label="Ім'я"
        id="fullName"
        placeholder="Іван Петренко"
        error={errors.fullName?.message}
        required
        {...register('fullName')}
      />
      <Input
        label="Email"
        id="email"
        type="email"
        placeholder="your@email.com"
        error={errors.email?.message}
        required
        {...register('email')}
      />
      <Input
        label="Пароль"
        id="password"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        required
        {...register('password')}
      />
      <Input
        label="Підтвердження паролю"
        id="confirm-password"
        type="password"
        placeholder="••••••••"
        error={errors.confirmPassword?.message}
        required
        {...register('confirmPassword')}
      />
      <Button
        disabled={!allFieldsFilled}
        isLoading={isSubmitting}
        type="submit"
        className="w-full"
        data-testid="register-submit"
      >
        Зареєструватися
      </Button>
    </form>
  );
};

export default SignUpForm;
