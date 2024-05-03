import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTheLoaiSachDto {
  @ApiProperty()
  @IsString()
  TenTheLoai: string;

  @ApiProperty()
  @IsString()
  MoTaTheLoai: string;
}
