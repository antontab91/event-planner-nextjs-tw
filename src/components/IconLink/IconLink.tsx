import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { ICONS_MAP } from '@/app-constants';

interface Props {
    href: string;
    src?: string;
    iconName?: keyof typeof ICONS_MAP;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    children?: React.ReactNode;
}

const IconLink: React.FC<Props> = ({
    href,
    src = null,
    iconName,
    alt,
    width = 28,
    height = 28,
    className,
    children = null,
}) => {
    const LucideIcon = iconName ? ICONS_MAP[iconName] : null;

    return (
        <Link href={href} className={className}>
            {LucideIcon && (
                <LucideIcon style={{ width, height }} aria-label={alt} />
            )}

            {src && <Image src={src} alt={alt} width={width} height={height} />}
            {children}
        </Link>
    );
};

export default IconLink;
