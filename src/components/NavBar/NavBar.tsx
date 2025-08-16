'use client';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { SignedIn } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';
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
        <nav className="flex justify-between items-center fixed z-50 w-full h-28 bg-gray-300 px-5 gap-4 shadow-2xl">
            <IconLink
                src="/assets/logo.svg"
                alt="Logo"
                width={80}
                height={80}
                href={isPrivate ? '/events' : '/login'}
                className={
                    'flex items-center gap-1 hover:scale-110 duration-500'
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
                    <>
                        {PRIVATE_NAV_LINKS.map((item) => {
                            const isActive =
                                pathName === item.route ||
                                pathName.startsWith(`${item.route}/`);
                            return (
                                <IconLink
                                    key={item.label}
                                    href={item.route}
                                    iconName={item.iconName}
                                    alt={item.label}
                                    width={28}
                                    height={28}
                                    className={cn(
                                        'flex items-center gap-4 px-4 py-4 rounded-4xl bg-white/60 shadow-lg  hover:bg-blue-200 hover:shadow-md transition-all duration-200',

                                        isActive && 'bg-blue-100  shadow-md'
                                    )}
                                >
                                    <p className="text-md font-semibold max-lg:hidden">
                                        {item.label}
                                    </p>
                                </IconLink>
                            );
                        })}
                        <SignedIn>
                            <UserButton
                                appearance={{
                                    elements: {
                                        userButtonAvatarBox:
                                            'min-w-[44px] min-h-[44px]',

                                        userButtonBox:
                                            'relative flex items-center px-2 py-2 rounded-4xl bg-white/60 shadow-lg hover:bg-blue-200 hover:shadow-md transition-all duration-200 before:!hidden after:!hidden',
                                    },
                                }}
                            />
                        </SignedIn>
                    </>
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
