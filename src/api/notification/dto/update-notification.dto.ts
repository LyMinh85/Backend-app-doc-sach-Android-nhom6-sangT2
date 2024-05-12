import { PartialType } from '@nestjs/swagger';
import { CreateNotificationDto } from './create-notification.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
    @ApiProperty()
    @IsString()
    tokenID: string;
}
