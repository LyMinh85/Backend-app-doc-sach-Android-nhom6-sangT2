import { ApiProperty } from '@nestjs/swagger';

export class UpdateThuVienSachCaNhanDto {
  @ApiProperty()
  sachYeuThich: boolean;
}
