'use client';
import { X } from 'lucide-react';
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
} from '@/shared/ui/alert-dialog';
import { Button } from '@/shared/ui/button';

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
}) => (
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
            <AlertDialogCancel className="absolute right-2 top-2 rounded-sm opacity-70 hover:opacity-100 cursor-pointer p-0 border-0">
                <X className="h-4 w-4" />
            </AlertDialogCancel>

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

export default React.memo(PopupConfirm);
