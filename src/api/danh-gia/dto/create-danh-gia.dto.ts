import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

export class CreateDanhGiaDto {
  @ApiProperty()
  idNguoiDung: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(5)
  diem: number;

  @ApiProperty()
  noiDung: string;
}
