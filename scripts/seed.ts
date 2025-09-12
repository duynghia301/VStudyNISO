import { PrismaClient } from '@prisma/client';
const database = new PrismaClient();

async function main() {
    try {
        const categories = [
            { name: 'Computer Science' },
            { name: 'Music' },
            { name: 'Fitness' },
            { name: 'Photography' },
            { name: 'Accounting' },
            { name: 'Engineering' },
            { name: 'Filming' },
        ];

        for (const category of categories) {
            await database.category.upsert({
                where: { name: category.name },
                update: {},
                create: category,
            });
        }
    } catch (error) {
        console.log('ERROR seeding the database categories', error);
    } finally {
        await database.$disconnect();
    }
}

main();