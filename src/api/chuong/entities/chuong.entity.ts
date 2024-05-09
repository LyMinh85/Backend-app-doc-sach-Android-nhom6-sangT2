import { ApiProperty } from '@nestjs/swagger';

export class Chuong {
  @ApiProperty()
  id: string;

  @ApiProperty()
  NoiDung: string;

  @ApiProperty()
  TenChuong: string;

  @ApiProperty()
  idSach: string;

  @ApiProperty()
  soThuTu: number;

  constructor(chuong: Partial<Chuong>) {
    this.id = chuong.id;
    this.NoiDung = chuong.NoiDung;
    this.TenChuong = chuong.TenChuong;
    this.idSach = chuong.idSach;
    this.soThuTu = chuong.soThuTu;
  }
}
