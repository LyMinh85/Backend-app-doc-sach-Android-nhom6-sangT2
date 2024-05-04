import { PartialType } from '@nestjs/swagger';
import { CreateChuongDto } from './create-chuong.dto';

export class UpdateChuongDto extends PartialType(CreateChuongDto) {}
