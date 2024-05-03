import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/api/dto/base.dto';
import { TheLoaiSach } from 'src/api/the-loai-sach/entities/the-loai-sach.entity';

interface ISachDto {
  id?: string;
  img?: string;
  TenSach?: string;
  NhaXuatBan?: string;
  NamXuatBan?: number;
  Mota?: string;
  ListTheLoai?: TheLoaiSach[];
}

export class SachDto implements ISachDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  img: string;

  @ApiProperty()
  TenSach: string;

  @ApiProperty()
  NhaXuatBan: string;

  @ApiProperty()
  NamXuatBan: number;

  @ApiProperty()
  Mota: string;

  @ApiProperty()
  ListTheLoai: TheLoaiSach[];

  constructor(source: ISachDto) {
    this.id = source.id;
    this.img = source.img;
    this.TenSach = source.TenSach;
    this.NhaXuatBan = source.NhaXuatBan;
    this.NamXuatBan = source.NamXuatBan;
    this.Mota = source.Mota;
    this.ListTheLoai = source.ListTheLoai;
  }
}
