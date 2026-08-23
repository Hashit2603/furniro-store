import { PrismaClient } from '@/generated/prisma/client';
import Database from 'better-sqlite3';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const connection = new Database('./dev.db');
const adapter = new PrismaBetterSqlite3(/* eslint-disable-next-line @typescript-eslint/no-explicit-any */ connection as any);

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
