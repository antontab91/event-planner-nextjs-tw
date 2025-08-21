'use server';

import { db } from '@drizzle/db';
import { EventTable } from '@drizzle/schema';
import { eventFormSchema } from '../schema';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { FormValues } from '../types';

export const createEvent = async (unsafeData: FormValues): Promise<void> => {
    const { userId } = await auth();
    if (!userId) throw new Error('AUTH_ERROR');

    const parsed = eventFormSchema.safeParse(unsafeData);
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
        revalidatePath('/events');
    }
};
