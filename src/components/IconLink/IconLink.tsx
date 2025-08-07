import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
    href: string;
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    children?: React.ReactNode;
};

const IconLink: React.FC<Props> = ({
    href,
    src,
    alt,
    width = 30,
    height = 30,
    className,
    children,
}) => (
    <Link href={href} className={className}>
        <Image src={src} alt={alt} width={width} height={height} />
        {children}
    </Link>
);

export default IconLink;
