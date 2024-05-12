import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DanhDauChuongService } from './danh-dau-chuong.service';
import { CreateDanhDauChuongDto } from './dto/create-danh-dau-chuong.dto';
import { UpdateDanhDauChuongDto } from './dto/update-danh-dau-chuong.dto';

@Controller('api/danh-dau-chuong')
export class DanhDauChuongController {
  constructor(private readonly danhDauChuongService: DanhDauChuongService) {}

  // @Post()
  // create(@Body() createDanhDauChuongDto: CreateDanhDauChuongDto) {
  //   return this.danhDauChuongService.create(createDanhDauChuongDto);
  // }

  // @Get()
  // findAll() {
  //   return this.danhDauChuongService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.danhDauChuongService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateDanhDauChuongDto: UpdateDanhDauChuongDto,
  // ) {
  //   return this.danhDauChuongService.update(+id, updateDanhDauChuongDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.danhDauChuongService.remove(+id);
  // }
}
