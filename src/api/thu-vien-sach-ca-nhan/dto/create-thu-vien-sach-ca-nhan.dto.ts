import { ApiProperty } from '@nestjs/swagger';

export class CreateThuVienSachCaNhanDto {
  @ApiProperty()
  sachYeuThich: boolean;
}
