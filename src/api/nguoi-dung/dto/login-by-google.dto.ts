import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginByGoogleDto {
  @ApiProperty({ description: 'googleId', example: '46fghfgh4676' })
  @IsString()
  googleId: string;
}
