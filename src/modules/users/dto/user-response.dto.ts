// src/users/dto/user-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'The id of the user',
    example: 1,
  })
  id!: number;

  @ApiProperty({
    description: 'The email of the user',
    example: 'test@example.com',
  })
  email!: string;

  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  firstName!: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  lastName!: string;

  @ApiProperty({
    description: 'The created at date of the user',
    example: '2021-01-01',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'The updated at date of the user',
    example: '2021-01-01',
  })
  updatedAt!: Date;
}
