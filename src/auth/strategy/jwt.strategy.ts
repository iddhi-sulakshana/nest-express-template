/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { users } from '@/database/schema/users.schema';
import { eq } from 'drizzle-orm/sql/expressions/conditions';
import { DatabaseService } from '@/database/database.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private drizzle: DatabaseService,
  ) {
    const jwtSecret = config.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: { sub: number; email: string }) {
    // You can customize the returned object as needed for your app
    console.log('JWT payload:', payload);

    // return payload; // this is the user object, meaning it will be available as req.user in your routes this happens because of the Passport.js middleware

    // explanation of the validate function:
    // The validate function is called by Passport.js after a JWT is successfully extracted and verified.
    // It receives the decoded JWT payload as an argument.
    // You can use this function to perform additional checks or to transform the user object before it is attached to the request.

    // req.user is the user object extracted from the JWT and req.user is used to access the authenticated user's information in your route handlers.

    const result = await this.drizzle.db.select().from(users).where(eq(users.id, payload.sub));

    const user = result[0];

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
