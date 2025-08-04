import { currentUser } from '@clerk/nextjs/server';
import React from 'react';

import { PrivateNavBar, PubicNavBar } from '@/components';
interface Props {
    children: React.ReactNode;
}

const MainLayout: React.FC<Props> = async ({ children }) => {
    const user = await currentUser();

    return (
        <main className="relative">
            {user ? <PrivateNavBar /> : <PubicNavBar />}

            <section className="pt-36">{children}</section>
        </main>
    );
};

export default MainLayout;
