'use client';

import React from 'react';
import {
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormMessage,
    FormDescription,
} from '@/components/shared/form';
import type {
    Control,
    FieldValues,
    Path,
    ControllerRenderProps,
} from 'react-hook-form';

type Props<T extends FieldValues, K extends Path<T>> = {
    control: Control<T>;
    name: K;
    label?: string;
    description?: string;
    className?: string;
    renderAction: (field: ControllerRenderProps<T, K>) => React.ReactNode;
};

const FieldItem = <T extends FieldValues, K extends Path<T>>({
    control,
    name,
    label,
    description,
    className,
    renderAction,
}: Props<T, K>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>{renderAction(field)}</FormControl>
                    {description && (
                        <FormDescription>{description}</FormDescription>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FieldItem;
