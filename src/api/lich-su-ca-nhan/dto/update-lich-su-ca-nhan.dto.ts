import { ApiProperty } from '@nestjs/swagger';

export class UpdateLichSuCaNhanDto {
  @ApiProperty()
  idSach: string;

  @ApiProperty()
  soChuongDaDoc: number;
}
