import { z } from 'zod';
import { eventFormSchema } from './schema';

export type FormValues = z.infer<typeof eventFormSchema>;
