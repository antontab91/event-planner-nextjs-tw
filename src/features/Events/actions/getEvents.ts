'use server';

import { db } from '@drizzle/db';
import { Event } from '@drizzle/schema';

interface input {
    userId: string;
}

export async function getEvents({ userId }: input): Promise<Event[]> {
    const events = await db.query.EventTable.findMany({
        where: ({ clerkUserId: userIdCol }, { eq }) => eq(userIdCol, userId),

        orderBy: ({ name }, { asc, sql }) => asc(sql`lower(${name})`),
    });

    return events;
}
