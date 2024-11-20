import { z } from 'zod';

export const signUpDefaultValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const signInDefaultValues = {
  email: '',
  password: '',
};

export const registerSchema = z
  .object({
    fullName: z.string().nonempty({ message: 'Поле не може бути пустим' }),
    email: z.string().email({ message: 'Невірний формат email' }),
    password: z.string().min(8, { message: 'Мінімум 8 символів' }),
    confirmPassword: z.string().min(8, { message: 'Мінімум 8 символів' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Паролі не співпадають',
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export type LoginFormValues = typeof signInDefaultValues;
