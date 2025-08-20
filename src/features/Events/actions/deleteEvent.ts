'use server';

import { db } from '@drizzle/db';
import { EventTable } from '@drizzle/schema';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { and, eq } from 'drizzle-orm';

export async function deleteEvent(id: string): Promise<void> {
    try {
        const { userId } = await auth();

        if (!userId) {
            throw new Error('User not authenticated.');
        }

        const { rowCount } = await db
            .delete(EventTable)
            .where(
                and(eq(EventTable.id, id), eq(EventTable.clerkUserId, userId))
            );

        if (rowCount === 0) {
            throw new Error(
                'Event not found or user not authorized to delete this event.'
            );
        }
    } catch (error: any) {
        throw new Error(`Failed to delete event: ${error.message || error}`);
    } finally {
        revalidatePath('/events');
    }
}
