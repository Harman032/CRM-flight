import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
};

export const matchPassword = async (
    enteredPassword: string,
    storedHash: string
): Promise<boolean> => {
    return await bcrypt.compare(enteredPassword, storedHash);
};
