'use server';

import { db } from '@drizzle/db';
import { EventTable } from '@drizzle/schema';
import { eventFormSchema } from '../schema';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function createEvent(
    unsafeData: z.infer<typeof eventFormSchema>
): Promise<void> {
    try {
        const { userId } = await auth();

        const { success, data } = eventFormSchema.safeParse(unsafeData);

        if (!success || !userId) {
            throw new Error('Invalid event data or user not authenticated.');
        }

        await db.insert(EventTable).values({ ...data, clerkUserId: userId });
    } catch (error: any) {
        throw new Error(`Failed to create event: ${error.message || error}`);
    } finally {
        revalidatePath('/events');
    }
}
