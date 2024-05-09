import { ApiProperty } from '@nestjs/swagger';

export class LichSuCaNhan {
  @ApiProperty()
  id: string;

  @ApiProperty()
  idNguoiDung: string;

  @ApiProperty()
  idSach: string;

  @ApiProperty()
  thoiGianTruyCapCuoi: Date;

  @ApiProperty()
  soChuongDaDoc: number;

  constructor(source: Partial<LichSuCaNhan>) {
    this.id = source.id;
    this.idNguoiDung = source.idNguoiDung;
    this.idSach = source.idSach;
    this.thoiGianTruyCapCuoi = source.thoiGianTruyCapCuoi;
    this.soChuongDaDoc = source.soChuongDaDoc;
  }
}
