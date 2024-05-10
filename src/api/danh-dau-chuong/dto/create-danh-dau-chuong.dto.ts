import { ApiProperty } from '@nestjs/swagger';

export class CreateDanhDauChuongDto {
  @ApiProperty()
  idNguoiDung: string;
}
