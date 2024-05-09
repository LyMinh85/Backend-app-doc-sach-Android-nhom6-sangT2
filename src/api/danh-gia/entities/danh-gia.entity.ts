import { ApiProperty } from '@nestjs/swagger';

export class DanhGia {
  @ApiProperty()
  id: string;

  @ApiProperty()
  idNguoiDung: string;

  @ApiProperty()
  idSach: string;

  @ApiProperty()
  diem: number;

  @ApiProperty()
  noiDung: string;

  @ApiProperty()
  ngayTao: Date;

  constructor(source: Partial<DanhGia>) {
    this.id = source.id;
    this.idNguoiDung = source.idNguoiDung;
    this.idSach = source.idSach;
    this.diem = source.diem;
    this.noiDung = source.noiDung;
  }
}
