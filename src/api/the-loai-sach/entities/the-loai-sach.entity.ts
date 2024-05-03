import { ApiProperty } from '@nestjs/swagger';

export class TheLoaiSach {
  @ApiProperty()
  id: string;

  @ApiProperty()
  TenTheLoai: string;

  @ApiProperty()
  MoTaTheLoai: string;

  constructor(source: Partial<TheLoaiSach>) {
    Object.assign(this, source);
  }
}
