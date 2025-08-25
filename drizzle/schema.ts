import { relations } from 'drizzle-orm';
import {
    boolean,
    index,
    integer,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uuid,
} from 'drizzle-orm/pg-core';

import { DAYS_OF_WEEK_IN_ORDER } from '@/app-constants';

const CREATED_AT = timestamp('createdAt').notNull().defaultNow();
const UPDATED_AT = timestamp('updatedAt')
    .notNull()
    .$onUpdate(() => new Date());

export const scheduleDayOfWeekEnum = pgEnum('day', DAYS_OF_WEEK_IN_ORDER);

// EventTable - таблица событий которые может создать пользователь
export const EventTable = pgTable(
    'events', // имя таблицы в бд
    {
        // уникальный идентификатор с типом UUID по умолчанию
        // uuid("id"): задаёт колонку с именем "id" и типом UUID
        // .primaryKey(): делает это поле основным ключом таблицы
        // .defaultRandom(): автоматически заполняет это поле случайно сгенерированным если значение не указано
        id: uuid('id').primaryKey().defaultRandom(),
        // notNull - обязательное поле
        clerkUserId: text('clerkUserId').notNull(),
        name: text('name').notNull(),
        durationInMinutes: integer('durationInMinutes').notNull(),
        isActive: boolean('isActive').notNull().default(true),
        description: text('description'),
        createdAt: CREATED_AT,
        updatedAt: UPDATED_AT,
    },
    // Индекс по полю clerkUserId для более быстрого поиска в базе данных , создаётся, чтобы ускорить запросы по этому полю (например, быстро находить записи по clerkUserId
    (table) => [index('clerkUserIdIndex').on(table.clerkUserId)]
);

// ScheduleTable - таблица расписания пользователя — когда он доступен, в каком часовом поясе, тд

export const ScheduleTable = pgTable('schedules', {
    id: uuid('id').primaryKey().defaultRandom(),
    timeZone: text('timezone').notNull(),
    clerkUserId: text('clerkUserId').notNull().unique(),
    createdAt: CREATED_AT,
    updatedAt: UPDATED_AT,
});

// ScheduleAvailabilities —  доступные интервалы (тайм-слоты) юзера по дням недели
export const ScheduleAvailabilityTable = pgTable(
    'scheduleAvailabilities',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        scheduleId: uuid('scheduleId')
            .notNull()
            .references(() => ScheduleTable.id, { onDelete: 'cascade' }), // при удалении расписания автоматически удаляются все связанные интервалы
        startTime: text('startTime').notNull(),
        endTime: text('endTime').notNull(),
        dayOfWeek: scheduleDayOfWeekEnum('dayOfWeek').notNull(),
    },
    (table) => [index('scheduleIdIndex').on(table.scheduleId)]
);

// У одного расписания (ScheduleTable) — несколько слотов доступности (ScheduleAvailabilityTable)
export const scheduleRelations = relations(ScheduleTable, ({ many }) => ({
    availabilities: many(ScheduleAvailabilityTable),
}));

// Для каждой записи в ScheduleAvailabilityTable определяет связь один-к-одному с ScheduleTable по полю scheduleId,нужно, чтобы из интервала можно было получить его расписаниеы
export const ScheduleAvailabilityRelations = relations(
    ScheduleAvailabilityTable,
    ({ one }) => ({
        schedule: one(ScheduleTable, {
            fields: [ScheduleAvailabilityTable.scheduleId], // локальный ключ (указывает на расписание)
            references: [ScheduleTable.id], // внешний ключ (id расписания)
        }),
    })
);

// Тип строки из таблицы (то, что возвращает SELECT)
export type Event = typeof EventTable.$inferSelect;
// export type Schedule = typeof ScheduleTable.$inferSelect;
// export type ScheduleAvailability =
//     typeof ScheduleAvailabilityTable.$inferSelect;

// Тип для вставки (то, что передаёте в INSERT)
export type NewEvent = typeof EventTable.$inferInsert;
// export type NewSchedule = typeof ScheduleTable.$inferInsert;
// export type NewScheduleAvailability =
//     typeof ScheduleAvailabilityTable.$inferInsert;
