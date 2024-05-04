import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChuongService } from './chuong.service';
import { CreateChuongDto } from './dto/create-chuong.dto';
import { UpdateChuongDto } from './dto/update-chuong.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Chuong } from './entities/chuong.entity';

@Controller('chuong')
export class ChuongController {
  constructor(private readonly chuongService: ChuongService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Chuong,
  })
  async create(@Body() createChuongDto: CreateChuongDto) {
    return this.chuongService.create(createChuongDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Records have been successfully retrieved.',
    type: [Chuong],
  })
  async findAll() {
    return this.chuongService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Record has been successfully retrieved.',
    type: Chuong,
  })
  async findOne(@Param('id') id: string) {
    return this.chuongService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Record has been successfully updated.',
    type: Chuong,
  })
  update(@Param('id') id: string, @Body() updateChuongDto: UpdateChuongDto) {
    return this.chuongService.update(id, updateChuongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chuongService.remove(id);
  }
}
