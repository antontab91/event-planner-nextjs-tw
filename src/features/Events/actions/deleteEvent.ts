'use server';

import { db } from '@drizzle/db';
import { EventTable } from '@drizzle/schema';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { and, eq } from 'drizzle-orm';

export const deleteEvent = async (id: string): Promise<void> => {
    const { userId } = await auth();
    if (!userId) throw new Error('AUTH_ERROR');

    try {
        const rows = await db
            .delete(EventTable)
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
        revalidatePath('/events');
    }
};
