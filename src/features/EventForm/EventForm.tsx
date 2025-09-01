'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import React, { useTransition, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventFormSchema } from './schema';
import { Form } from '@/shared/ui/form';
import { Textarea } from '@/shared/ui/textarea';
import { Input } from '@/shared/ui/input';
import { Switch } from '@/shared/ui/switch';
import { FormValues } from './types';
import { Event } from '../../../drizzle/schema';
import { FormFieldItem, PopupConfirm, FormActions } from '@/components';
import { createEvent, deleteEvent, updateEvent } from './actions';

// z.infer - Zodутилита берёт схему (z.object, z.string и т. д.) и автоматически выводит из неё TypeScript-тип.

const DEFAULT_VALUES: FormValues = {
    isActive: true,
    durationInMinutes: 0,
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

    const isDisabled = isDeletePending || form.formState.isSubmitting;
    const router = useRouter();

    const onSubmit = useCallback(
        async (formValues: FormValues) => {
            try {
                if (event) {
                    await updateEvent({ id: event.id, formValues });
                } else {
                    await createEvent({ formValues });
                }
                router.push('/events');
            } catch (error) {
                form.setError('root', {
                    message: `There was an error saving your event ${
                        error instanceof Error ? error.message : String(error)
                    }`,
                });
            }
        },
        [event?.id, router, form]
    );

    const onDelete = useCallback(() => {
        startDeleteTransition(async () => {
            if (!event?.id) {
                throw console.error();
            }

            try {
                await deleteEvent({ id: event.id });
                router.push('/events');
            } catch (error) {
                form.setError('root', {
                    message: `There was an error deleting your event: ${
                        error instanceof Error ? error.message : String(error)
                    }`,
                });
            }
        });
    }, [event?.id, router, form]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex gap-6 flex-col"
            >
                {form.formState.errors.root && (
                    <div className="text-destructive text-sm">
                        {form.formState.errors.root.message}
                    </div>
                )}
                <FormFieldItem
                    control={form.control}
                    name="name"
                    label="Event Name"
                    description="The name users will see when booking"
                    renderChild={(field) => <Input {...field} />}
                />
                <FormFieldItem
                    control={form.control}
                    name="durationInMinutes"
                    label="Duration"
                    description="In minutes"
                    renderChild={(field) => (
                        <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                                field.onChange(e.target.valueAsNumber || 0)
                            }
                        />
                    )}
                />
                <FormFieldItem
                    control={form.control}
                    name="description"
                    label="Description"
                    description="Optional description of the event"
                    renderChild={(field) => (
                        <Textarea className="resize-none h-32" {...field} />
                    )}
                />
                <FormFieldItem
                    control={form.control}
                    name="isActive"
                    label="Active"
                    description="Inactive events will not be visible for users to
                                book"
                    renderChild={(field) => (
                        <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    )}
                />

                <FormActions
                    isDisabled={isDisabled}
                    renderChild={
                        event && (
                            <PopupConfirm
                                variant="destructive"
                                title="Are you sure?"
                                description="This action cannot be undone. This will permanently delete this event."
                                cancelBtnDescription="Cancel"
                                btnDescription="Delete"
                                isDisabled={isDisabled}
                                onClick={onDelete}
                                classes={{
                                    trigger: 'cursor-pointer hover:bg-red-700',
                                    action: 'bg-red-500 hover:bg-red-700 cursor-pointer',
                                    cancel: 'cursor-pointer',
                                }}
                            />
                        )
                    }
                />
            </form>
        </Form>
    );
};

export default React.memo(EventForm);

const mapEventToFormValues = (event: Event): FormValues => ({
    name: event.name,
    isActive: event.isActive,
    durationInMinutes: event.durationInMinutes,
    description: event.description ?? '',
});
