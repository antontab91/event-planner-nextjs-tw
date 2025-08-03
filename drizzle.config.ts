import { defineConfig } from 'drizzle-kit';

// адрес базы данных из переменных окружения
const databaseUrl = process.env.DATABASE_URL;

// если databaseUrl не определена - выбросить ошибку для предотвращения неправильной настройки
if (!databaseUrl) {
    throw new Error('DATABASE_URL не определена в переменных окружения.');
}

// конфиг Drizzle через хелпер defineConfig
export default defineConfig({
    // путь к файлу схемы для Drizzle
    schema: './drizzle/schema.ts',

    // куда Drizzle будет сохранять файлы миграций
    out: './drizzle/migrations',

    // какой SQL диалект используется (PostgreSQL, MySQL)
    dialect: 'postgresql',

    // строгий режим для более строгой проверки и типобезопасности
    strict: true,

    // логирование при работе с CLI
    verbose: true,

    // передать данные для подключения к базе данных по урле databaseUrl
    dbCredentials: {
        url: databaseUrl, //  безопасно, так как проверка выше уже была
    },
});
