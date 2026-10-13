import { z } from 'zod';

/** Xato matnlari — tarjima kalitlari (Input ichida t() orqali chiqadi) */
export const loginSchema = z.object({
  phone: z.string().length(9, 'auth.err.phone'),
  password: z.string().min(6, 'auth.err.pw_short'),
});

export type LoginForm = z.infer<typeof loginSchema>;
