import { ApiProperty } from '@nestjs/swagger';

export class CreateLichSuCaNhanDto {
  @ApiProperty()
  idNguoiDung: string;

  @ApiProperty()
  idSach: string;
}
