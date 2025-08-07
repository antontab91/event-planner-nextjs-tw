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
        imageURL: '/assets/events.svg',
        route: '/events',
        label: 'My Events',
    },
    {
        imageURL: '/assets/schedule.svg',
        route: '/schedule',
        label: 'My Schedule',
    },
    {
        imageURL: '/assets/public.svg',
        route: '/book',
        label: 'Public Profile',
    },
] as const;
