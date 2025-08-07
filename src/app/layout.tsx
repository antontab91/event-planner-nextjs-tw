import './globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Event-pPlanner-NextJS',
    description:
        'A powerful and intuitive calendar app designed to effortlessly organize your events, meetings, and schedules. Boost your productivity, stay in control, and ensure you never miss a meaningful moment.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased animate-fade-in`}
                >
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
