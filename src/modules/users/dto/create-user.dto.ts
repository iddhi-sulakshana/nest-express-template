// src/users/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user',
    example: 'test@example.com',
  })
  email!: string;

  @IsString()
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  firstName!: string;

  @IsString()
  @ApiProperty({
    description: 'The phone number of the user',
    example: '+1234567890',
  })
  phone!: string;

  @IsString()
  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  lastName!: string;

  @IsString()
  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  password!: string;
}
