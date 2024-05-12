import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginPasswordEmailDto {
  @ApiProperty({ description: 'email', example: 'email@gmail.com' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'matKhau', example: '123456' })
  @IsString()
  matKhau: string;
}
