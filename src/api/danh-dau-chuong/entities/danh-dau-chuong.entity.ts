import { ApiProperty } from '@nestjs/swagger';

export class DanhDauChuong {
  @ApiProperty()
  id: string;

  @ApiProperty()
  idNguoiDung: string;

  @ApiProperty()
  idChuong: string;

  constructor(source: Partial<DanhDauChuong>) {
    this.id = source.id;
    this.idNguoiDung = source.idNguoiDung;
    this.idChuong = source.idChuong;
  }
}
