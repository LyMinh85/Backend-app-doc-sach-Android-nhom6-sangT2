import { ApiProperty } from '@nestjs/swagger';

export class CreateChuongDto {
  @ApiProperty()
  NoiDung: string;

  @ApiProperty()
  TenChuong: string;
}
