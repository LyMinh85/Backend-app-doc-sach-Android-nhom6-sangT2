import { ApiProperty } from '@nestjs/swagger';

export class CreateThuVienSachCaNhanDto {
  @ApiProperty()
  idNguoiDung: string;

  @ApiProperty()
  idSach: string;

  @ApiProperty()
  sachYeuThich: boolean;
}
