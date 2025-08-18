'use client';
import { SignIn } from '@clerk/nextjs';
import { neobrutalism } from '@clerk/themes';
import Image from 'next/image';
import React from 'react';

const LandingPage: React.FC = () => {
    return (
        <main className="flex items-center justify-center p-10 gap-24 max-md:flex-col min-h-screen max-md:gap-8 max-sm:gap-4">
            <section className="flex flex-col items-center">
                <Image
                    src="/assets/logo.svg"
                    alt="Logo"
                    width={300}
                    height={300}
                />

                <h1 className="text-2xl font-black lg:text-3xl">
                    Your time, perfectly planned
                </h1>
                <p className="font-extralight">
                    Join millions of professionals who easily book meetings with
                    the #1 scheduling tool
                </p>

                <Image
                    src="/assets/planning.svg"
                    alt="Logo"
                    width={500}
                    height={500}
                />
            </section>
            <div className="mt-3">
                <SignIn
                    //  навигация форм Clerk через hash, не через стандартный роутинг next
                    routing="hash"
                    appearance={{ baseTheme: neobrutalism }}
                />
            </div>
        </main>
    );
};

export default LandingPage;
