import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateTokenDto {
    @ApiProperty()
    @IsString()
    token: string;
}
