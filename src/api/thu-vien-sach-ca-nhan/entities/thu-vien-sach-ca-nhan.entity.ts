import { ApiProperty } from '@nestjs/swagger';

export class ThuVienSachCaNhan {
  @ApiProperty()
  id: string;

  @ApiProperty()
  idNguoiDung: string;

  @ApiProperty()
  idSach: string;

  @ApiProperty()
  ngayThem: Date;

  @ApiProperty()
  sachYeuThich: boolean;

  constructor(source: Partial<ThuVienSachCaNhan>) {
    this.id = source.id;
    this.idNguoiDung = source.idNguoiDung;
    this.idSach = source.idSach;
    this.ngayThem = source.ngayThem;
    this.sachYeuThich = source.sachYeuThich;
  }
}
