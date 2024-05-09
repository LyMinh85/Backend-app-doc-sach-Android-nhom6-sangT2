import { ApiProperty } from '@nestjs/swagger';
import { NguoiDung } from 'src/api/nguoi-dung/entities/nguoi-dung.entity';

export class DanhGiaDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nguoiDung: NguoiDung;

  @ApiProperty()
  idSach: string;

  @ApiProperty()
  diem: number;

  @ApiProperty()
  noiDung: string;

  constructor(source: Partial<DanhGiaDto>) {
    this.id = source.id;
    this.nguoiDung = source.nguoiDung;
    this.idSach = source.idSach;
    this.diem = source.diem;
    this.noiDung = source.noiDung;
  }
}
