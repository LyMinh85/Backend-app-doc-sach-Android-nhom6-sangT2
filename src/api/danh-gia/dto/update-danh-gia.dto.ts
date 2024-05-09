import { PartialType } from '@nestjs/swagger';
import { CreateDanhGiaDto } from './create-danh-gia.dto';

export class UpdateDanhGiaDto extends PartialType(CreateDanhGiaDto) {}
