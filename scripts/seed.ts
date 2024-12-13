const { PrismaClient } = require('@prisma/client');
const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: 'Computer Science' },
                { name: 'Music' },
                { name: 'Fitness' },
                { name: 'Photography' },
                { name: 'Accounting' },
                { name: 'Engineering' },
                { name: 'Filming' },
            ],
        });
    } catch (error) {
        console.log('ERROR seeding the database categories', error);
    } finally {
        await database.$disconnect();
    }
}

main();