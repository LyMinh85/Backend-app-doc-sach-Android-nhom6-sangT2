import { ApiProperty } from '@nestjs/swagger';
import { TheLoaiSach } from 'src/api/the-loai-sach/entities/the-loai-sach.entity';

export class Sach {
  @ApiProperty()
  id: string;

  @ApiProperty()
  img: string;

  @ApiProperty()
  TenSach: string;

  @ApiProperty()
  NhaXuatBan: string;

  @ApiProperty()
  NamXuatBan: number;

  @ApiProperty()
  Mota: string;

  @ApiProperty()
  tongSoLuotDoc: number;

  @ApiProperty()
  ListTheLoaiRef: FirebaseFirestore.DocumentReference<
    FirebaseFirestore.DocumentData,
    FirebaseFirestore.DocumentData
  >[];

  constructor(source: Partial<Sach>) {
    Object.assign(this, source);
  }
}
