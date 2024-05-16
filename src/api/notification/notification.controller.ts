import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';
import { Query } from '@nestjs/common';
@Controller('api/notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @Post('createNotificationById/:id')
  createNotificationById(@Param('id') id: string, @Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.createNotificationById(createNotificationDto, id);
  }

  @Post('createIDNotification/:id')
  createIDNotification(@Param('id') id: string): Promise<string> {
    return this.notificationService.createIDNotification(id);
  }

  @Get('findAllNotificationById/:id')
  async findAllNotificationById(@Param('id') notificationId: string): Promise<Notification[]> {
    return this.notificationService.findAllNotificationById(notificationId);
  }

  @Delete('removeNotificationById/:id')
  async removeNotificationById(
    @Param('id') id: string,
    @Query('keys') keys: string[],
  ): Promise<void> {
    await this.notificationService.removeNotificationById(id, keys);
  }


  @Post('sendSingleFCM/:token')
  sendSingleFCM(@Param('token') token: string, @Body() createNotificationDto: CreateNotificationDto): Promise<void> {
    return this.notificationService.sendSingleFCM(token, createNotificationDto);
  }


  @Post('sendMultipleFCM')
  sendMultipleFCM(@Query('tokens') tokens: string[], @Body() createNotificationDto: CreateNotificationDto): Promise<void> {
    return this.notificationService.sendMultipleFCM(tokens, createNotificationDto);
  }


}
