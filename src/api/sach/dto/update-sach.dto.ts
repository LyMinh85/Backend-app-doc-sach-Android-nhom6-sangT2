import { PartialType } from '@nestjs/swagger';
import { CreateSachDto } from './create-sach.dto';

export class UpdateSachDto extends PartialType(CreateSachDto) {}
