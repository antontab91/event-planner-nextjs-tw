'use server';

import { db } from '@drizzle/db';
import { Event } from '@drizzle/schema';

interface input {
    clerkUserId: string;
}

export async function getEvents({ clerkUserId }: input): Promise<Event[]> {
    const events = await db.query.EventTable.findMany({
        where: ({ clerkUserId: userIdCol }, { eq }) =>
            eq(userIdCol, clerkUserId),

        orderBy: ({ name }, { asc, sql }) => asc(sql`lower(${name})`),
    });

    return events;
}
