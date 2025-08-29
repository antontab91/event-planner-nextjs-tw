'use server';

import { db } from '@drizzle/db';

import { Event } from '@drizzle/schema';

interface input {
    userId: string;
    eventId: string;
}

export async function getEvent({
    userId,
    eventId,
}: input): Promise<Event | undefined> {
    const event = await db.query.EventTable.findFirst({
        where: ({ id, clerkUserId }, { and, eq }) =>
            and(eq(clerkUserId, userId), eq(id, eventId)),
    });

    return event ?? undefined;
}
