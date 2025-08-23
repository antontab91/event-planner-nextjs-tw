'use client';

import React from 'react';
import Link from 'next/link';

import { Button } from '../../vendor/button';

interface Props {
    renderChild?: React.ReactNode;
    isDisabled?: boolean;
}

const FormActions: React.FC<Props> = ({ renderChild, isDisabled }) => {
    return (
        <div className="flex gap-2 justify-end">
            {renderChild}

            <Button
                disabled={isDisabled}
                type="button"
                asChild
                variant="outline"
            >
                {/* тут полтом может отличаться  */}
                <Link href="/events">Cancel</Link>
            </Button>

            <Button
                type="submit"
                className="cursor-pointer hover:scale-105 bg-blue-400 hover:bg-blue-600"
                disabled={isDisabled}
            >
                {/* тут полтом может отличаться  */}
                Save
            </Button>
        </div>
    );
};

export default FormActions;
