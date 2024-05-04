import { ApiProperty } from '@nestjs/swagger';

export class Chuong {
  @ApiProperty()
  id: string;

  @ApiProperty()
  NoiDung: string;

  @ApiProperty()
  TenChuong: string;

  constructor(chuong: Partial<Chuong>) {
    this.id = chuong.id;
    this.NoiDung = chuong.NoiDung;
    this.TenChuong = chuong.TenChuong;
  }
}
