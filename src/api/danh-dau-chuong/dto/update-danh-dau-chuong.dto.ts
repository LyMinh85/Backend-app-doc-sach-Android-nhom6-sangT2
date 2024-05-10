import { PartialType } from '@nestjs/swagger';
import { CreateDanhDauChuongDto } from './create-danh-dau-chuong.dto';

export class UpdateDanhDauChuongDto extends PartialType(
  CreateDanhDauChuongDto,
) {}
