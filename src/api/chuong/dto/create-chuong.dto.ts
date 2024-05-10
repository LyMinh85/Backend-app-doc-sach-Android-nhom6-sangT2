import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateChuongDto {
  @ApiProperty()
  @IsString()
  NoiDung: string;

  @ApiProperty()
  @IsString()
  TenChuong: string;
}
