import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindChuongParams {
  @ApiProperty()
  @IsString()
  @IsOptional()
  idSach: string;
}
