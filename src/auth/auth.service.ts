/* eslint-disable prettier/prettier */
import { DatabaseService } from '@/database/database.service';
import { users } from '@/database/schema/users.schema';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';
import { eq } from 'drizzle-orm';
import { LoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private drizzle: DatabaseService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(dto: AuthDto) {
    const hash = await argon.hash(dto.password);

    try {
      // Insert into DB
      const insertedUsers = await this.drizzle.db
        .insert(users)
        .values({
          email: dto.email,
          password: hash,
          phone: dto.phone,
          firstName: dto.firstName,
          lastName: dto.lastName,
        })
        .returning({
          id: users.id,
          email: users.email,
          createdAt: users.createdAt,
        });

      // returning() gives an array — take the first row
      return insertedUsers[0];
    } catch (error: any) {
      // Handle unique constraint violation for Postgres
      if (error.code === '23505') {
        throw new ForbiddenException('Email already exists');
      }
    }
    throw new Error('Error creating user');
  }

  async signin(dto: LoginDto) {
    // Fetch user by email
    const result = await this.drizzle.db.select().from(users).where(eq(users.email, dto.email));

    const user = result[0];

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
