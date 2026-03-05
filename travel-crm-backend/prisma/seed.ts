import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    // Hash passwords
    const adminPasswordHash = await bcrypt.hash('admin123', 10);
    const agentPasswordHash = await bcrypt.hash('agent123', 10);

    // 1. Create Admin User
    const admin = await prisma.user.upsert({
        where: { email: 'admin@travel.com' },
        update: {},
        create: {
            name: 'Super Admin',
            email: 'admin@travel.com',
            passwordHash: adminPasswordHash,
            role: 'ADMIN',
        },
    });
    console.log(`Created admin user with id: ${admin.id}`);

    // 2. Create Agent User
    const agent = await prisma.user.upsert({
        where: { email: 'agent@travel.com' },
        update: {},
        create: {
            name: 'Travel Agent',
            email: 'agent@travel.com',
            passwordHash: agentPasswordHash,
            role: 'AGENT',
        },
    });
    console.log(`Created agent user with id: ${agent.id}`);

    // 3. Create 15 sample bookings
    const statuses = ['Pending', 'Working', 'Sent', 'Booked'];

    // Clear existing bookings for clean seed
    await prisma.comment.deleteMany();
    await prisma.traveler.deleteMany();
    await prisma.booking.deleteMany();

    for (let i = 1; i <= 15; i++) {
        const status = statuses[i % 4];
        const isConvertedToEDT = status === 'Booked';

        const booking = await prisma.booking.create({
            data: {
                contactPerson: `Client ${i}`,
                contactNumber: `+1555000${i.toString().padStart(4, '0')}`,
                requirements: `Looking for a 7-day trip to ${['Paris', 'Bali', 'Tokyo', 'Cancun', 'Rome'][i % 5]} for ${i % 4 + 1} people.`,
                status: status,
                isConvertedToEDT: isConvertedToEDT,
                assignedToUserId: i % 2 === 0 ? agent.id : null, // Assign half the bookings to the agent
                createdByUserId: admin.id,
            },
        });

        console.log(`Created booking with id: ${booking.id} (${status})`);

        // Add a comment
        await prisma.comment.create({
            data: {
                bookingId: booking.id,
                createdById: admin.id,
                text: `Initial consultation completed. Client prefers 4-star hotels.`,
            }
        });

        // If booked, add a traveler
        if (status === 'Booked') {
            await prisma.traveler.create({
                data: {
                    bookingId: booking.id,
                    name: `Client ${i} (Primary)`,
                    phoneNumber: `+1555000${i.toString().padStart(4, '0')}`,
                    email: `client${i}@example.com`,
                    country: 'USA',
                    isPrimary: true,
                }
            });
        }
    }

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
