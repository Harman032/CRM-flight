import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @desc    Get all agents
// @route   GET /api/users/agents
// @access  Private (Admin & Agent)
export const getAgents = asyncHandler(async (req: Request, res: Response) => {
    const agents = await prisma.user.findMany({
        where: { role: 'AGENT' },
        select: {
            id: true,
            name: true,
            email: true,
        },
        orderBy: { name: 'asc' },
    });

    res.json(agents);
});
