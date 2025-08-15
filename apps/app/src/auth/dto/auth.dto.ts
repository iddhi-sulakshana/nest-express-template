/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @Length(10, 20) // matches your varchar(20)
  @Matches(/^\+?[0-9\s-]+$/, { message: 'Phone number must be valid' })
  phone!: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  lastName!: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 100) // basic password length check
  password!: string;
}
