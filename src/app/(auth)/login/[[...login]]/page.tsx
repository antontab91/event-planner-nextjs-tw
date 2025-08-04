import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react';

const LoginPage: React.FC = () => (
    <main className="flex flex-col items-center p-5 gap-10">
        <Image alt="logo" src="/assets/logo.svg" width={100} height={100} />

        <div className="mt-3">
            <SignIn />
        </div>
    </main>
);

export default LoginPage;
