import { prisma } from '@/lib/prisma';
import 'dotenv/config';
import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { Environment } from 'vitest/environments';

function generateDatabaseUrl(schema: string){
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL is not defined in the environment variables');
    }

    const url = new URL(process.env.DATABASE_URL);

    url.searchParams.set('schema', schema);

    return url.toString();
}

export default <Environment>{
    name: 'prisma',
    transformMode: 'ssr',
    async setup() {

        // Aqui você pode configurar o ambiente de teste, como conectar ao banco de dados Prisma
        const schema = randomUUID()
        const databaseUrl = generateDatabaseUrl(schema);

        console.log(databaseUrl)

        process.env.DATABASE_URL = databaseUrl;

        execSync('npx prisma migrate deploy')

        return {
            async teardown() {
                // Aqui você pode adicionar a lógica de limpeza ou desconexão do banco de dados, se necessário
                await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
                await prisma.$disconnect();
            },
        }
    },
}