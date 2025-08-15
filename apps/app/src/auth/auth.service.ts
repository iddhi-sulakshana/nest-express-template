/* eslint-disable prettier/prettier */
import { UsersRepository } from '@app/database';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';
import { LoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(dto: AuthDto) {
    const hash = await argon.hash(dto.password);

    try {
      // Use repository to create user
      const newUser = await this.usersRepository.create({
        email: dto.email,
        password: hash,
        phone: dto.phone,
        firstName: dto.firstName,
        lastName: dto.lastName,
      });

      // Return user data without password
      return {
        id: newUser.id,
        email: newUser.email,
        createdAt: newUser.createdAt,
      };
    } catch (error: any) {
      // Handle unique constraint violation for Postgres
      if (error?.cause?.code == '23505') {
        throw new ForbiddenException('Email already exists');
      }
      throw new Error('Error creating user');
    }
  }

  async signin(dto: LoginDto) {
    // Use repository to find user by email
    const user = await this.usersRepository.findByEmail(dto.email);

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    // Verify password
    const isPasswordValid = await argon.verify(user.password, dto.password);
    if (!isPasswordValid) {
      throw new ForbiddenException('Credentials incorrect');
    }

    return this.signToken(user.id, user.email);
  }

  async signToken(userId: number, email: string): Promise<{ access_token: string }> {
    const payload = { sub: userId, email };

    const secret = this.config.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in configuration');
    }

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return { access_token: token };
  }
}
