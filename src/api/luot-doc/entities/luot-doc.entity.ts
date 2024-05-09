import { ApiProperty } from '@nestjs/swagger';

export class LuotDoc {
  @ApiProperty()
  id: string;

  @ApiProperty()
  idSach: string;

  @ApiProperty()
  idNguoiDung: string;

  constructor(luotDoc: Partial<LuotDoc>) {
    this.id = luotDoc.id;
    this.idSach = luotDoc.idSach;
    this.idNguoiDung = luotDoc.idNguoiDung;
  }
}
