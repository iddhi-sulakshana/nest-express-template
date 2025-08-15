/* eslint-disable prettier/prettier */
import { UsersRepository } from '@app/database';
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';
import { LoginDto, RefreshTokenDto } from './dto';

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

    return this.generateTokens(user.id, user.email);
  }

  async refreshToken(dto: RefreshTokenDto) {
    try {
      // Verify refresh token
      await this.jwt.verifyAsync(dto.refreshToken, {
        secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      });

      // hash the refresh token
      const refreshTokenHash = await argon.hash(dto.refreshToken);
      console.log('refreshTokenHash', refreshTokenHash);
      // Find user by refresh token
      const user = await this.usersRepository.findByRefreshToken(refreshTokenHash);
      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Generate new tokens
      return this.generateTokens(user.id, user.email);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: number) {
    // Clear refresh token
    await this.usersRepository.updateRefreshToken(userId, null);
    return { message: 'Logged out successfully' };
  }

  private async generateTokens(userId: number, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(
        { sub: userId, email },
        {
          expiresIn: this.config.get<string>('JWT_ACCESS_EXPIRES_IN'),
          secret: this.config.get<string>('JWT_SECRET'),
        },
      ),
      this.jwt.signAsync(
        { sub: userId, email },
        {
          expiresIn: this.config.get<string>('JWT_REFRESH_EXPIRES_IN'),
          secret: this.config.get<string>('JWT_REFRESH_SECRET'),
        },
      ),
    ]);

    // Store refresh token hash in database
    await this.usersRepository.updateRefreshToken(userId, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
