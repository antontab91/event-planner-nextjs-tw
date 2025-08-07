import { currentUser } from '@clerk/nextjs/server';
import React from 'react';

import { NavBar } from '@/components';
interface Props {
    children: React.ReactNode;
}

const MainLayout: React.FC<Props> = async ({ children }) => {
    const user = await currentUser();

    return (
        <main className="relative">
            <NavBar isPrivate={!!user} />

            <section className="pt-36">{children}</section>
        </main>
    );
};

export default MainLayout;
