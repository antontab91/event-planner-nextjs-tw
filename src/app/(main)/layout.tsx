import { currentUser } from '@clerk/nextjs/server';
import React from 'react';

import { PrivateNavBar, PublicNavBar } from '@/components';
interface Props {
    children: React.ReactNode;
}

const MainLayout: React.FC<Props> = async ({ children }) => {
    const user = await currentUser();
    console.log(111);
    return (
        <main className="relative">
            {user ? <PrivateNavBar /> : <PublicNavBar />}

            <section className="pt-36">{children}</section>
        </main>
    );
};

export default MainLayout;
