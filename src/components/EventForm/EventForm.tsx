'use client';

import React from 'react';
import { z } from 'zod'; // валидатор

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
    return <div className="">111</div>;
};

export default EventForm;
