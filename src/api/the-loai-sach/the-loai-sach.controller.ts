import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TheLoaiSachService } from './the-loai-sach.service';
import { CreateTheLoaiSachDto } from './dto/create-the-loai-sach.dto';
import { UpdateTheLoaiSachDto } from './dto/update-the-loai-sach.dto';

@Controller('api/the-loai-sach')
export class TheLoaiSachController {
  constructor(private readonly theLoaiSachService: TheLoaiSachService) {}

  @Post()
  create(@Body() createTheLoaiSachDto: CreateTheLoaiSachDto) {
    return this.theLoaiSachService.create(createTheLoaiSachDto);
  }

  @Get()
  findAll() {
    return this.theLoaiSachService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.theLoaiSachService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTheLoaiSachDto: UpdateTheLoaiSachDto,
  ) {
    return this.theLoaiSachService.update(id, updateTheLoaiSachDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.theLoaiSachService.remove(id);
  }
}
