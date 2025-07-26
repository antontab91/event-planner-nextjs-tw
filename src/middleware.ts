import { clerkMiddleware, ClerkMiddlewareAuth,createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

// Разрешить доступ к публичным маршрутам для неавторизованных пользователей.
// Массив публичных роутов (разрешены для неавторизованных пользователей)
// Эти пути будут доступны всем, даже если пользователь не залогинен

const isPublicRoute = createRouteMatcher([
  '/',
  '/login(.*)',
  '/register(.*)',
  '/book(.*)',
]);

// Если пользователь обращается к приватному роуту (не публичному),
// делаем асинхронную проверку авторизации через auth.protect().
// Если не авторизован — будет редирект или отказ в доступе.
// await гарантирует, что запрос не пройдет дальше, пока не завершится проверка.

const handleAuthMiddleware = async (auth: ClerkMiddlewareAuth, req: NextRequest) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
};

export default clerkMiddleware(
   handleAuthMiddleware
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};