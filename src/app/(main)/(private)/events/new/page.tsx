import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from '@/components/shared/card';
import { EventForm } from '@/features';

const NewEventPage: React.FC = () => {
    return (
        <Card className="max-w-md mx-auto border-8 border-blue-200 shadow-2xl shadow-accent-foreground">
            <CardHeader>
                <CardTitle>New Event</CardTitle>
            </CardHeader>

            <CardContent>
                <EventForm />
            </CardContent>
        </Card>
    );
};

export default NewEventPage;
