'use client';

import { useForm } from 'react-hook-form';
import React, { useTransition } from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventFormSchema } from './schema';
import { Form } from '@/components/shared/form';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogHeader,
    AlertDialogCancel,
    AlertDialogFooter,
    AlertDialogAction,
} from '@/components/shared/alert-dialog';
import { Textarea } from '@/components/shared/textarea';
import { Input } from '@/components/shared/input';
import { Switch } from '@/components/shared/switch';
import { Button } from '@/components/shared/button';
import type { Event } from '../../../drizzle/schema';
import { FieldItem } from '@/components';

// z.infer - Zodутилита берёт схему (z.object, z.string и т. д.) и автоматически выводит из неё TypeScript-тип.
type FormValues = z.infer<typeof eventFormSchema>;

const DEFAULT_VALUES: FormValues = {
    isActive: true,
    durationsInMinutes: 30,
    description: '',
    name: '',
};

interface Props {
    event?: Event;
}

const EventForm: React.FC<Props> = ({ event }) => {
    const [isDeletePending, startDeleteTransition] = useTransition();
    const form = useForm<FormValues>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: event ? mapEventToFormValues(event) : DEFAULT_VALUES,
    });

    const onSubmit = () => {};

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex gap-6 flex-col"
            >
                {/* Show root error if any */}
                {form.formState.errors.root && (
                    <div className="text-destructive text-sm">
                        {form.formState.errors.root.message}
                    </div>
                )}
                <FieldItem
                    control={form.control}
                    name="name"
                    label="Event Name"
                    description="The name users will see when booking"
                    renderAction={(field) => <Input {...field} />}
                />
                <FieldItem
                    control={form.control}
                    name="durationsInMinutes"
                    label="Duration"
                    description="In minutes"
                    renderAction={(field) => <Input type="number" {...field} />}
                />
                <FieldItem
                    control={form.control}
                    name="description"
                    label="Description"
                    description="Optional description of the event"
                    renderAction={(field) => (
                        <Textarea className="resize-none h-32" {...field} />
                    )}
                />
                <FieldItem
                    control={form.control}
                    name="isActive"
                    label="Active"
                    description="Inactive events will not be visible for users to
                                book"
                    renderAction={(field) => (
                        <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    )}
                />
                11
                {/* Buttons section: Delete, Cancel, Save */}
                <div className="flex gap-2 justify-end">
                    {/* Delete Button (only shows if editing existing event) */}
                    {event && (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    className="cursor-pointer hover:scale-105 hover:bg-red-700"
                                    variant="destructive"
                                    disabled={
                                        isDeletePending ||
                                        form.formState.isSubmitting
                                    }
                                >
                                    Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete this event.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>

                                    <AlertDialogAction
                                        className="bg-red-500 hover:bg-red-700 cursor-pointer"
                                        disabled={
                                            isDeletePending ||
                                            form.formState.isSubmitting
                                        }
                                        onClick={() => {}}
                                    >
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}

                    {/* Cancel Button - redirects to events list */}
                    <Button
                        disabled={
                            isDeletePending || form.formState.isSubmitting
                        }
                        type="button"
                        asChild
                        variant="outline"
                    >
                        <Link href="/events">Cancel</Link>
                    </Button>

                    {/* Save Button - submits the form */}
                    <Button
                        className="cursor-pointer hover:scale-105 bg-blue-400 hover:bg-blue-600"
                        disabled={
                            isDeletePending || form.formState.isSubmitting
                        }
                        type="submit"
                    >
                        Save
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default EventForm;

const mapEventToFormValues = (event: Event): FormValues => ({
    name: event.name,
    isActive: event.isActive,
    durationsInMinutes: event.durationsInMinutes,
    description: event.description ?? '',
});
