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
import { ApiOperation } from '@nestjs/swagger';

@Controller('api/the-loai-sach')
export class TheLoaiSachController {
  constructor(private readonly theLoaiSachService: TheLoaiSachService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo thể loại sách mới' })
  create(@Body() createTheLoaiSachDto: CreateTheLoaiSachDto) {
    return this.theLoaiSachService.create(createTheLoaiSachDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách thể loại sách' })
  findAll() {
    return this.theLoaiSachService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin thể loại sách theo id' })
  findOne(@Param('id') id: string) {
    return this.theLoaiSachService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin thể loại sách' })
  update(
    @Param('id') id: string,
    @Body() updateTheLoaiSachDto: UpdateTheLoaiSachDto,
  ) {
    return this.theLoaiSachService.update(id, updateTheLoaiSachDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa thể loại sách' })
  remove(@Param('id') id: string) {
    return this.theLoaiSachService.remove(id);
  }
}
