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
