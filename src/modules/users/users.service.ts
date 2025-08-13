import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../database/repositories/users.repository';
import type { User, NewUser } from '../../database/schema';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }

  async findById(id: number): Promise<User | undefined> {
    return await this.usersRepository.findById(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findByEmail(email);
  }

  async create(userData: NewUser): Promise<User> {
    return await this.usersRepository.create(userData);
  }

  async update(id: number, userData: Partial<NewUser>): Promise<User | undefined> {
    return await this.usersRepository.update(id, userData);
  }

  async delete(id: number): Promise<boolean> {
    return await this.usersRepository.delete(id);
  }
}
