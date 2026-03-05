import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { PrismaClient } from '@prisma/client';
import { loginSchema } from '../types';
import { matchPassword } from '../utils/password';
import { generateToken } from '../utils/jwt';

const prisma = new PrismaClient();

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400);
        throw new Error('Invalid input');
    }

    const { email, password } = result.data;

    // Find user by email
    const user = await prisma.user.findUnique({
        where: { email },
    });

    // Verify user exists and password matches
    if (user && (await matchPassword(password, user.passwordHash))) {
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});
