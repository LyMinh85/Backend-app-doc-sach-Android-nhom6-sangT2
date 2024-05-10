import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DanhGiaService } from './danh-gia.service';
import { CreateDanhGiaDto } from './dto/create-danh-gia.dto';
import { UpdateDanhGiaDto } from './dto/update-danh-gia.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { DanhGiaDto } from './dto/danh-gia.dto';

@Controller('danh-gia')
export class DanhGiaController {
  constructor(private readonly danhGiaService: DanhGiaService) {}

  // @Post()
  // @ApiCreatedResponse({
  //   description: 'The record has been successfully created.',
  //   type: DanhGiaDto,
  // })
  // create(@Body() createDanhGiaDto: CreateDanhGiaDto): Promise<DanhGiaDto> {
  //   return this.danhGiaService.create(createDanhGiaDto);
  // }

  // @Get()
  // @ApiOkResponse({
  //   type: DanhGiaDto,
  //   isArray: true,
  //   description: 'Records have been successfully retrieved.',
  // })
  // findAll(): Promise<DanhGiaDto[]> {
  //   return this.danhGiaService.findAll();
  // }

  @Get(':id')
  @ApiOkResponse({
    type: DanhGiaDto,
    description: 'Record has been successfully retrieved.',
  })
  findOne(@Param('id') id: string) {
    return this.danhGiaService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: DanhGiaDto,
    description: 'Record has been successfully updated.',
  })
  update(@Param('id') id: string, @Body() updateDanhGiaDto: UpdateDanhGiaDto) {
    return this.danhGiaService.update(id, updateDanhGiaDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: Boolean,
    description: 'Record has been successfully deleted.',
  })
  remove(@Param('id') id: string): Promise<boolean> {
    return this.danhGiaService.remove(id);
  }
}
