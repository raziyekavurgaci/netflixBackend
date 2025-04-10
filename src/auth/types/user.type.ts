import { RoleType, User as PrismaUser } from '@prisma/client';

export type User = Omit<PrismaUser, 'password'> & {
  roleRelation: {
    id: string;
    name: RoleType;
    createdAt: Date;
    updatedAt: Date;
  };
};
