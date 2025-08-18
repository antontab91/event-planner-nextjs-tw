'use client';
import { useForm } from 'react-hook-form';
import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventFormSchema } from './schema';

const DEFAULT_VALUES = {
    isActive: true,
    durationInMinutes: 30,
    description: '',
    name: '',
};

type EventFormInput = {
    id: string;
    name: string;
    description?: string;
    durationInMinutes: number;
    isActive: boolean;
};
interface Props {
    event?: EventFormInput;
}

const EventForm: React.FC<Props> = ({ event }) => {
    const form = useForm({
        resolver: zodResolver(eventFormSchema),
        defaultValues: event
            ? {
                  name: event.name,
                  description: event.description,
                  isActive: event.isActive,
                  durationInMinutes: event.durationInMinutes,
              }
            : DEFAULT_VALUES,
    });

    return <div className="">111</div>;
};

export default EventForm;
