import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateChuongDto } from './create-chuong.dto';
import { IsNumber } from 'class-validator';

export class UpdateChuongDto extends PartialType(CreateChuongDto) {
  @ApiProperty()
  @IsNumber()
  soThuTu: number;
}
