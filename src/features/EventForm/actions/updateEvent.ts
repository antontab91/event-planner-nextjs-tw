'use server';

import { db } from '@drizzle/db';
import { EventTable } from '@drizzle/schema';
import { eventFormSchema } from '../schema';
import { auth } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { FormValues } from '../types';
// import { redirect } from 'next/navigation';

interface input {
    id: string;
    formValues: FormValues;
}

export async function updateEvent({ id, formValues }: input): Promise<void> {
    const { userId } = await auth();
    if (!userId) throw new Error('AUTH_ERROR');

    const parsed = eventFormSchema.safeParse(formValues);
    if (!parsed.success) {
        throw new Error('VALIDATION_ERROR', { cause: parsed.error.flatten() });
    }

    try {
        const rows = await db
            .update(EventTable)
            .set({ ...parsed.data })
            .where(
                and(eq(EventTable.id, id), eq(EventTable.clerkUserId, userId))
            )
            .returning({ id: EventTable.id });

        if (rows.length === 0) {
            throw new Error('NOT_FOUND_OR_FORBIDDEN', {
                cause: { id, userId },
            });
        }
    } catch (cause) {
        throw new Error('DB_ERROR', { cause });
    } finally {
        // сброс кэша на сервере по этопу пути + редирект
        revalidatePath('/events');
        // redirect('/events');  // TODO: Исследовать бажину с редиректом . что то не дочитал наверное
    }
}
