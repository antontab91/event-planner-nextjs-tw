import { neon } from '@neondatabase/serverless';
// Drizzle — это библиотека для работы с базой данных на TypeScript/JavaScript, которая помогает удобно и безопасно создавать, читать, изменять и удалять данные.
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from './schema';

//  тут инициализация урлы базы данных из энв вариэйблов

const sql = neon(process.env.DATABASE_URL!);

// Чтобы удобно и безопасно работать с базой данных в проекте через одну точку доступа db

export const db = drizzle(sql, { schema });
