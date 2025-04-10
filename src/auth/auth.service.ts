import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { compare, hash } from 'bcrypt';
import { User } from './types/user.type';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { roleRelation: true },
    });

    if (user && (await compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = user;
      return result as unknown as User;
    }
    return null;
  }

  login(user: Omit<User, 'password'>) {
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      role: user.roleRelation.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(
    email: string,
    password: string,
    name?: string,
  ): Promise<Omit<User, 'password'>> {
    const hashedPassword = await hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'USER',
        roleRelation: {
          connect: {
            name: 'USER',
          },
        },
      },
      include: {
        roleRelation: true,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;
    return result as unknown as User;
  }
}
