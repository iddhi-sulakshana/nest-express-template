import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DatabaseService } from '../database.service';
import { users, type User, type NewUser } from '../schema';

@Injectable()
export class UsersRepository {
  constructor(private databaseService: DatabaseService) {}

  async findAll(): Promise<User[]> {
    const db = this.databaseService.getDb();
    return await db.select().from(users);
  }

  async findById(id: number): Promise<User | undefined> {
    const db = this.databaseService.getDb();
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const db = this.databaseService.getDb();
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async create(userData: NewUser): Promise<User> {
    const db = this.databaseService.getDb();
    const result = await db.insert(users).values(userData).returning();
    return result[0];
  }

  async update(id: number, userData: Partial<NewUser>): Promise<User | undefined> {
    const db = this.databaseService.getDb();
    const result = await db
      .update(users)
      .set({ ...userData, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return result[0];
  }

  async delete(id: number): Promise<boolean> {
    const db = this.databaseService.getDb();
    const result = await db.delete(users).where(eq(users.id, id)).returning();
    return result.length > 0;
  }

  async updateRefreshToken(id: number, refreshToken: string | null): Promise<User | undefined> {
    const db = this.databaseService.getDb();
    const result = await db
      .update(users)
      .set({
        refreshToken: refreshToken,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();
    return result[0];
  }

  async findByRefreshToken(refreshToken: string): Promise<User | undefined> {
    const db = this.databaseService.getDb();
    const result = await db.select().from(users).where(eq(users.refreshToken, refreshToken));
    return result[0];
  }
}
