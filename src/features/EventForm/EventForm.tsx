'use client';
import { useForm } from 'react-hook-form';
import React, { useTransition } from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventFormSchema } from './schema';
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormMessage,
    FormDescription,
} from '@/components/shared/form';
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

// z.infer - Zodутилита берёт схему (z.object, z.string и т. д.) и автоматически выводит из неё TypeScript-тип.
type FormValues = z.infer<typeof eventFormSchema>;

const DEFAULT_VALUES: FormValues = {
    isActive: true,
    durationInMinutes: 30,
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

                {/* Event Name Field */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Event Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                The name users will see when booking
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Duration Field */}
                <FormField
                    control={form.control}
                    name="durationInMinutes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Duration</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>In minutes</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Optional Description Field */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="resize-none h-32"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Optional description of the event
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Toggle for Active Status */}
                <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center gap-2">
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel>Active</FormLabel>
                            </div>
                            <FormDescription>
                                Inactive events will not be visible for users to
                                book
                            </FormDescription>
                        </FormItem>
                    )}
                />

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
    durationInMinutes: event.durationsInMinutes,
    description: event.description ?? '',
});
