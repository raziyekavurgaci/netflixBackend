import { RoleType } from '@prisma/client';

export interface JwtPayload {
  email: string;
  sub: string;
  role: RoleType;
}
