import { PartialType } from '@nestjs/swagger';
import { CreateTheLoaiSachDto } from './create-the-loai-sach.dto';

export class UpdateTheLoaiSachDto extends PartialType(CreateTheLoaiSachDto) {}
