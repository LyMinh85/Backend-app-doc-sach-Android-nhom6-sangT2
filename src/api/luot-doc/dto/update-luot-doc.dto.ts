import { PartialType } from '@nestjs/swagger';
import { CreateLuotDocDto } from './create-luot-doc.dto';

export class UpdateLuotDocDto extends PartialType(CreateLuotDocDto) {}
