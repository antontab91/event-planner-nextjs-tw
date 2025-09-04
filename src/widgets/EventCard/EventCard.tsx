import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Button,
} from '@/shared';
import React from 'react';
import Link from 'next/link';
import CopyEventButton from '@/features/CopyEventButton';
import { formatEventDescription, cn } from '@/shared/utils';

type Props = {
    id: string;
    isActive: boolean;
    name: string;
    description: string | null;
    durationInMinutes: number;
    clerkUserId: string;
};

const EventCard: React.FC<Props> = ({
    id,
    isActive,
    name,
    description,
    durationInMinutes,
    clerkUserId,
}) => {
    return (
        <Card
            className={cn(
                'flex flex-col border-4 border-blue-500/10 shadow-2xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110',
                !isActive && ' bg-accent border-accent'
            )}
        >
            <CardHeader className={cn(!isActive && 'opacity-50')}>
                <CardTitle>{name}</CardTitle>
                <CardDescription>
                    {formatEventDescription(durationInMinutes)}
                </CardDescription>
            </CardHeader>

            {description && (
                <CardContent className={cn(!isActive && 'opacity-50')}>
                    {description}
                </CardContent>
            )}

            <CardFooter className="flex justify-end gap-2 mt-auto">
                {isActive && (
                    <CopyEventButton
                        variant="outline"
                        eventId={id}
                        clerkUserId={clerkUserId}
                    />
                )}

                {/* TODO: заменить на свою кнопку  */}

                <Button
                    className="cursor-pointer hover:scale-105 bg-blue-400 hover:bg-blue-600"
                    asChild
                >
                    <Link href={`/events/${id}/edit`}>Edit</Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default React.memo(EventCard);
