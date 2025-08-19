'use client';

import React, { MouseEventHandler } from 'react';
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
import { Button } from '@/components/shared/button';

type Classes = {
    trigger?: string;
    content?: string;
    header?: string;
    title?: string;
    description?: string;
    footer?: string;
    cancel?: string;
    action?: string;
};

interface Props {
    variant?: React.ComponentProps<typeof Button>['variant'];
    isDisabled?: boolean;
    title?: string;
    description?: string;
    btnDescription?: string;
    cancelBtnDescription?: string;
    classes?: Classes;
    onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

const PopupConfirm: React.FC<Props> = ({
    isDisabled,
    classes,
    title,
    description,
    btnDescription,
    cancelBtnDescription,
    variant,
    onClick,
}) => {
    console.log(classes?.trigger, classes?.action);
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant={variant}
                    className={classes?.trigger}
                    disabled={isDisabled}
                >
                    {btnDescription}
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className={classes?.content}>
                <AlertDialogHeader className={classes?.header}>
                    <AlertDialogTitle className={classes?.title}>
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription className={classes?.description}>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className={classes?.footer}>
                    <AlertDialogCancel className={classes?.cancel}>
                        {cancelBtnDescription}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className={classes?.action}
                        disabled={isDisabled}
                        onClick={onClick}
                    >
                        {btnDescription}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default PopupConfirm;
