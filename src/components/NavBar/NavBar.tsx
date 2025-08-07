'use client';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import React from 'react';

import { PRIVATE_NAV_LINKS } from '@/app-constants';
import { Button } from '@/components/shadcnUi/button';
import { cn } from '@/lib/shadcnUtils';

import IconLink from '../IconLink';

type Props = {
    isPrivate?: boolean;
};

const NavBar: React.FC<Props> = ({ isPrivate }) => {
    const pathName = usePathname();

    return (
        <nav className="flex justify-between items-center fixed z-50 w-full h-28 bg-gray-300 px-10 gap-4 shadow-2xl">
            <IconLink
                src="/assets/logo.svg"
                alt="Logo"
                width={60}
                height={60}
                href={isPrivate ? '/events' : '/login'}
                className={
                    'flex items-center gap-1 hover:scale-120 duration-500'
                }
            />

            <div
                className={cn(
                    'flex flex-1 sticky top-0 justify-end max-w-2xl',
                    isPrivate
                        ? 'max-sm:gap-2 sm:gap-6'
                        : 'max-sm:gap-0 sm:gap-2'
                )}
            >
                {isPrivate ? (
                    PRIVATE_NAV_LINKS.map((item) => {
                        const isActive =
                            pathName === item.route ||
                            pathName.startsWith(`${item.route}/`);
                        return (
                            <IconLink
                                key={item.label}
                                href={item.route}
                                src={item.imageURL}
                                alt={item.label}
                                width={28}
                                height={28}
                                className={cn(
                                    'flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/60 shadow-lg border border-blue-100 hover:bg-blue-50 hover:shadow-xl transition-all duration-200',
                                    isActive &&
                                        'bg-blue-100 border-blue-400 shadow-xl'
                                )}
                            >
                                <p className="text-base font-semibold max-lg:hidden">
                                    {item.label}
                                </p>
                            </IconLink>
                        );
                    })
                ) : (
                    <>
                        <SignInButton>
                            <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 cursor-pointer  duration-500 rounded-2xl shadow-2xl">
                                Login
                            </Button>
                        </SignInButton>
                        <SignUpButton>
                            <Button
                                className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 cursor-pointer duration-500 rounded-2xl shadow-2xl"
                                variant="outline"
                            >
                                Register
                            </Button>
                        </SignUpButton>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
