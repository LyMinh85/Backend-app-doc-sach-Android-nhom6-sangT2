import { PartialType } from '@nestjs/mapped-types';
import { CreateNguoiDungDto } from './create-nguoi-dung.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNguoiDungDto extends PartialType(CreateNguoiDungDto) {
  @ApiProperty()
  @IsString()
  tenNguoiDung: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  avatar: string;

  @ApiProperty()
  @IsString()
  matKhau: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phanCap: string;
}
