'use server';

import { db } from '@drizzle/db';
import { EventTable } from '@drizzle/schema';
import { eventFormSchema } from '../schema';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';
import { FormValues } from '../types';

interface input {
    formValues: FormValues;
}

export const createEvent = async ({ formValues }: input): Promise<void> => {
    const { userId } = await auth();
    if (!userId) throw new Error('AUTH_ERROR');

    const parsed = eventFormSchema.safeParse(formValues);
    if (!parsed.success) {
        throw new Error('VALIDATION_ERROR', { cause: parsed.error.flatten() });
    }

    try {
        await db
            .insert(EventTable)
            .values({ ...parsed.data, clerkUserId: userId });
    } catch (cause) {
        throw new Error('DB_ERROR', { cause });
    } finally {
        // сброс кэша на сервере по этопу пути + редирект
        revalidatePath('/events');
        // redirect('/events');  // TODO: Исследовать бажину с редиректом . что то не дочитал наверное
    }
};
