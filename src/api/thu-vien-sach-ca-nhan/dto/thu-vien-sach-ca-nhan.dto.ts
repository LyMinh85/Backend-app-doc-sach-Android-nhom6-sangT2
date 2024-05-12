import { ApiProperty } from '@nestjs/swagger';
import { SachDto } from 'src/api/sach/dto/sach.dto';

export class ThuVienSachCaNhanDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  idNguoiDung: string;

  @ApiProperty()
  sach: SachDto;

  @ApiProperty()
  ngayThem: string;

  @ApiProperty()
  sachYeuThich: boolean;

  constructor(source: Partial<ThuVienSachCaNhanDto>) {
    this.id = source.id;
    this.idNguoiDung = source.idNguoiDung;
    this.sach = source.sach;
    this.ngayThem = source.ngayThem;
    this.sachYeuThich = source.sachYeuThich;
  }
}
