'use client';

import Image from 'next/image';
import React from 'react';

import { ICONS_MAP } from '@/shared/constants';
import { Button } from '../../shared/ui/button';

interface Props extends React.ComponentProps<typeof Button> {
    src?: string;
    iconName?: keyof typeof ICONS_MAP;
    alt?: string;
    width?: number;
    height?: number;
}

const IconButton: React.FC<Props> = ({
    src,
    iconName,
    alt = '',
    width = 20,
    height = 20,
    className,
    children,
    ...rest
}) => {
    const Icon = iconName ? ICONS_MAP[iconName] : null;

    return (
        <Button className={className} {...rest}>
            {Icon && (
                <Icon
                    style={{ width: width, height: height }}
                    aria-label={alt}
                />
            )}
            {src && <Image src={src} alt={alt} width={width} height={height} />}
            {children}
        </Button>
    );
};

export default IconButton;
