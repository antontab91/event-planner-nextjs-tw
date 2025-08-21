import { z } from 'zod';

// валидациия формы события с помощью Zod
export const eventFormSchema = z.object({
    // name должен быть строкой и обязателен (минимум 1 символ)
    name: z.string().min(1, 'Required'),

    description: z.string().optional(),

    isActive: z.boolean(),

    // durationsInMinutes преобразуется в число
    // Должен быть целым, больше 0 и ≤ 720 (12 часов)
    durationsInMinutes: z
        .number()
        .int()
        .positive('Duration must be greater than 0')
        .max(
            60 * 12,
            `Duration must be less than 12 hours (${60 * 12} minutes)`
        ),
});
