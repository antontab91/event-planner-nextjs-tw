'use server';

import { db } from '@drizzle/db';
import { EventTable } from '@drizzle/schema';
import { eventFormSchema } from '../schema';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { FormValues } from '../types';

export async function createEvent(unsafeData: FormValues): Promise<void> {
    const { userId } = await auth();
    if (!userId) throw new Error('AUTH_ERROR');

    const { success, data, error } = eventFormSchema.safeParse(unsafeData);

    if (!success) {
        const issues = error.flatten();
        const err = new Error('VALIDATION_ERROR');

        err.cause = issues;
        throw err;
    }

    try {
        await db.insert(EventTable).values({ ...data, clerkUserId: userId });
    } catch (e) {
        const err = new Error('DB_ERROR');
        err.cause = e;
        throw err;
    }

    revalidatePath('/events');
}
