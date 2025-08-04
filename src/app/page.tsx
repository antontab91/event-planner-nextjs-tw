import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

import { LandingPage } from '@/components';

const App: React.FC = async () => {
    const user = await currentUser();

    if (!user) return <LandingPage />;

    return redirect('/events');
};

export default App;
