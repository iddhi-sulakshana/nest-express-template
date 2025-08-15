/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //POST request to /auth/signup
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    console.log('Received signup request with DTO:', dto);
    return this.authService.signUp(dto);
  }

  @Post('signin')
  signin(@Body() dto: LoginDto) {
    console.log('Received signin request with DTO:', dto);
    return this.authService.signin(dto);
  }
}
