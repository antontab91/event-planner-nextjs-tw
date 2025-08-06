import { SignInButton, SignUpButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// interface Props {}

const PublicNavBar: React.FC = () => {
    return (
        <nav className="flex justify-between items-center fixed z-50 w-full h-28 bg-gray-300 px-10 gap-4 shadow-2xl">
            <Link
                className="flex items-center gap-1 hover:scale-120 duration-500"
                href="/login"
            >
                <Image
                    src="/assets/logo.svg"
                    alt="Logo"
                    width={60}
                    height={60}
                />
            </Link>
            <section className="sticky top-0 flex justify-between">
                <div className="flex flex-1 max-sm:gap-0 sm:gap-6">
                    <SignInButton />
                    <SignUpButton />
                </div>
            </section>
        </nav>
    );
};

export default PublicNavBar;
