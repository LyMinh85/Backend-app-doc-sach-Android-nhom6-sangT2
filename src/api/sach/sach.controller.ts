import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SachService } from './sach.service';
import { CreateSachDto } from './dto/create-sach.dto';
import { UpdateSachDto } from './dto/update-sach.dto';
import { SachQueryParams } from './interface/sach-query-params.interface';
import { ApiQuery } from '@nestjs/swagger';

@Controller('api/sach')
export class SachController {
  constructor(private readonly sachService: SachService) {}

  @Post()
  async create(@Body() createSachDto: CreateSachDto) {
    return await this.sachService.create(createSachDto);
  }

  @Get()
  @ApiQuery({ name: 'TenSach', required: false })
  @ApiQuery({ name: 'NhaXuatBan', required: false })
  async findAll(@Query() sachQueryParams: SachQueryParams) {
    return await this.sachService.findAll(sachQueryParams);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.sachService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSachDto: UpdateSachDto) {
    return await this.sachService.update(id, updateSachDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.sachService.remove(id);
  }
}
