import 'dotenv/config';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['error', 'warn'],
    accelerateUrl: process.env.DATABASE_URL?.startsWith('prisma+postgres') 
      ? process.env.DATABASE_URL 
      : undefined,
  });
};

const globalForPrisma = global;

const prisma = globalForPrisma.prisma || prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
