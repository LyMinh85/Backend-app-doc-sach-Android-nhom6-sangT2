import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateLuotDocDto {
  @ApiProperty()
  @IsString()
  idSach: string;

  @ApiProperty()
  @IsString()
  idNguoiDung: string;
}
