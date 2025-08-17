import { SignInButton, SignUpButton } from '@clerk/nextjs';
import * as Icons from 'lucide-react';

export const DAYS_OF_WEEK_IN_ORDER = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
] as const;

export const PRIVATE_NAV_LINKS = [
    {
        iconName: 'calendar-days',
        route: '/events',
        label: 'My Events',
    },
    {
        iconName: 'calendar-clock',
        route: '/schedule',
        label: 'My Schedule',
    },
    {
        iconName: 'user-star',
        route: '/book',
        label: 'Public Profile',
    },
] as const;

export const AUTH_BUTTONS = [
    {
        label: 'Login',
        icon: 'log-in',
        Wrap: SignInButton,
        alt: 'login',
    },
    {
        label: 'Register',
        icon: 'user-plus',
        Wrap: SignUpButton,
        alt: 'register',
    },
] as const;

export const ICONS_MAP: Record<
    string,
    React.FC<React.SVGProps<SVGSVGElement>>
> = {
    'calendar-days': Icons.CalendarDays,
    'calendar-clock': Icons.CalendarClock,
    'calendar-plus': Icons.CalendarPlus,
    'user-star': Icons.UserStar,
    'log-in': Icons.LogIn,
    'user-plus': Icons.UserPlus,
} as const;
