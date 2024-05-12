import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateNguoiDungDto {
  @ApiProperty()
  @IsString()
  tenNguoiDung: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  avatar: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  googleId: string;

  @ApiProperty()
  @IsString()
  matKhau: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phanCap: string;

  @ApiProperty()
  @IsString()
  uuid: string;
}
