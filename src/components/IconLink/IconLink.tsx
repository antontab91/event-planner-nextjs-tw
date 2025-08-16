import * as Icons from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ICONS_MAP: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
    'calendar-days': Icons.CalendarDays,
    'calendar-clock': Icons.CalendarClock,
    'user-star': Icons.UserStar,
};

type Props = {
    href: string;
    src?: string;
    iconName?: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    children?: React.ReactNode;
};

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
