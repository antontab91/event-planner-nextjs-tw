import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { getEvents } from '@/features/EventForm/actions';
import { CalendarRange } from 'lucide-react';
import EventCard from '@/widgets/EventCard';

import { IconLink } from '@/components';

const EventPage: React.FC = async () => {
    const { userId, redirectToSignIn } = await auth();

    if (!userId) {
        return redirectToSignIn();
    }

    const events = await getEvents({ userId });

    return (
        <section className="flex flex-col items-center">
            <div className="flex gap-4 align-middle">
                <h1 className="text-4xl xl:text-5xl max-md:text-3xl font-black">
                    Events
                </h1>

                <IconLink
                    iconName="calendar-plus"
                    alt="events"
                    href="/events/new"
                    width={28}
                    height={28}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2  rounded-4xl bg-blue-400  shadow-lg  hover:bg-blue-500 hover:shadow-md transition-all duration-200 text-white"
                >
                    <p className="text-md font-semibold">Create Event</p>
                </IconLink>
            </div>

            {events.length ? (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-10">
                    {events.map((event) => (
                        <EventCard key={event.id} {...event} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center gap-4">
                    <CalendarRange className="size-16 mx-auto text-black" />
                    You do not have any events yet. Create your first event to
                    get started!
                    <IconLink
                        iconName="calendar-plus"
                        alt="events"
                        href="/events/new"
                        width={28}
                        height={28}
                        className="cursor-pointer flex items-center gap-2 px-4 py-2  rounded-4xl bg-blue-400  shadow-lg  hover:bg-blue-500 hover:shadow-md transition-all duration-200 text-white"
                    >
                        <p className="text-md font-semibold">Create Event</p>
                    </IconLink>
                </div>
            )}
        </section>
    );
};

export default EventPage;
