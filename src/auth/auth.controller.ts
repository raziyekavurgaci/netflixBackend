import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import {
  LoginValidation,
  RegisterValidation,
} from './validations/auth.validation';
import { User } from './types/user.type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginValidation: LoginValidation) {
    const user = await this.authService.validateUser(
      loginValidation.email,
      loginValidation.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.login(user);
  }

  @Public()
  @Post('register')
  async register(
    @Body() registerValidation: RegisterValidation,
  ): Promise<Omit<User, 'password'>> {
    return this.authService.register(
      registerValidation.email,
      registerValidation.password,
      registerValidation.name,
    );
  }
}
