import EventForm from '@/features/EventForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/vendor/card';
import { getEvent } from '@/features/EventForm/actions';
import { auth } from '@clerk/nextjs/server';

interface Props {
    params: Promise<{ eventId: string }>;
}

const EditEventPage: React.FC<Props> = async ({ params }) => {
    const { userId, redirectToSignIn } = await auth();
    if (!userId) return redirectToSignIn();

    const { eventId } = await params;

    const event = await getEvent({ userId, eventId });
    if (!event) return <h1>Event not found</h1>;

    return (
        <Card className="max-w-md mx-auto border-4 border-blue-100 shadow-2xl shadow-accent-foreground">
            <CardHeader>
                <CardTitle>Edit Event</CardTitle>
            </CardHeader>
            <CardContent>
                <EventForm
                    event={{
                        ...event,
                        description: event.description || null,
                    }}
                />
            </CardContent>
        </Card>
    );
};

export default EditEventPage;
