import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

import { LandingPage } from '@/components';
interface Props {
    children: React.ReactNode;
}

const MainLayout: React.FC<Props> = async ({ children }) => {
    return (
        <main className="relative">
            <section className="pt-36">{children}</section>
        </main>
    );
};

export default MainLayout;
