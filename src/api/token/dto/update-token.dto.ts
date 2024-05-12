import { PartialType } from '@nestjs/swagger';
import { CreateTokenDto } from './create-token.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class UpdateTokenDto extends PartialType(CreateTokenDto) {
    @ApiProperty()
    @IsString()
    token: string;
}
