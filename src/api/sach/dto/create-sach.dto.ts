import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { TheLoaiSach } from 'src/api/the-loai-sach/entities/the-loai-sach.entity';

export class CreateSachDto {
  @ApiProperty()
  @IsString()
  img: string;

  @ApiProperty()
  @IsString()
  TenSach: string;

  @ApiProperty()
  @IsString()
  NhaXuatBan: string;

  @ApiProperty()
  @IsNumber()
  NamXuatBan: number;

  @ApiProperty()
  @IsString()
  Mota: string;

  @ApiProperty()
  @IsOptional()
  ListTheLoaiId: string[];
}
