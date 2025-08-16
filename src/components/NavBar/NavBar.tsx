'use client';

import {
    SignedIn,
    SignInButton,
    SignUpButton,
    UserButton,
} from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import React from 'react';

import { PRIVATE_NAV_LINKS } from '@/app-constants';
import { IconButton, IconLink } from '@/components';
import { cn } from '@/lib/shadcnUtils';

interface Props {
    isPrivate?: boolean;
}

const NavBar: React.FC<Props> = ({ isPrivate }) => {
    const pathName = usePathname();

    return (
        <nav className="flex justify-between items-center fixed z-50 w-full h-28 bg-gray-300 px-4 gap-4 shadow-2xl">
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
                        ? 'max-sm:gap-2 sm:gap-5'
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
                                        'flex items-center gap-2 px-4 py-2 max-md:px-2 rounded-4xl bg-white/60 shadow-lg  hover:bg-blue-200 hover:shadow-md transition-all duration-200',
                                        isActive && 'bg-blue-100  shadow-md'
                                    )}
                                >
                                    <p className="text-md font-semibold max-md:hidden">
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
                                            'min-w-[36px] min-h-[36px]',

                                        userButtonBox:
                                            'relative flex items-center px-1 py-1 rounded-4xl bg-white/60 shadow-lg hover:bg-blue-200 hover:shadow-md transition-all duration-200',
                                    },
                                }}
                            />
                        </SignedIn>
                    </>
                ) : (
                    <>
                        <SignInButton>
                            <IconButton
                                alt="login"
                                iconName="log-in"
                                className="cursor-pointer flex items-center gap-2 px-4 py-2 max-md:px-2 rounded-4xl bg-white/60 shadow-lg  hover:bg-blue-200 hover:shadow-md transition-all duration-200"
                            >
                                Login
                            </IconButton>
                        </SignInButton>
                        <SignUpButton>
                            <IconButton
                                alt="register"
                                iconName="user-plus"
                                className="cursor-pointer flex items-center gap-2 px-4 py-2 max-md:px-2 rounded-4xl bg-white/60 shadow-lg  hover:bg-blue-200 hover:shadow-md transition-all duration-200"
                            >
                                Register
                            </IconButton>
                        </SignUpButton>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
