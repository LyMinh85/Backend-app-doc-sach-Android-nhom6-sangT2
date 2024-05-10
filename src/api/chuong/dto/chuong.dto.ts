import { ApiProperty } from '@nestjs/swagger';

export class ChuongDto {
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

  // default value is false
  @ApiProperty()
  isDanhDau: boolean;

  constructor(chuong: Partial<ChuongDto>) {
    this.id = chuong.id;
    this.NoiDung = chuong.NoiDung;
    this.TenChuong = chuong.TenChuong;
    this.idSach = chuong.idSach;
    this.soThuTu = chuong.soThuTu;
    this.isDanhDau = chuong.isDanhDau || false;
  }
}
