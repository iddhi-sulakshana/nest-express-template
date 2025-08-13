import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { User } from '../../database/schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersService.findAll();
    return users.map(this.toUserResponseDto);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<UserResponseDto | undefined> {
    const user = await this.usersService.findById(id);
    return user ? this.toUserResponseDto(user) : undefined;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() userData: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersService.create(userData);
    return this.toUserResponseDto(user);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: UpdateUserDto,
  ): Promise<UserResponseDto | undefined> {
    const user = await this.usersService.update(id, userData);
    return user ? this.toUserResponseDto(user) : undefined;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<{ success: boolean }> {
    const success = await this.usersService.delete(id);
    return { success };
  }

  // Helper method inside controller:
  private toUserResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
