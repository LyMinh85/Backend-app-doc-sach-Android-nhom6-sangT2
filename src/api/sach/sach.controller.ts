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
import { ChuongService } from '../chuong/chuong.service';
import { CreateChuongDto } from '../chuong/dto/create-chuong.dto';

@Controller('api/sach')
export class SachController {
  constructor(
    private readonly sachService: SachService,
    private readonly chuongService: ChuongService,
  ) {}

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

  @Get(':idSach/chuong')
  async findAllChuong(@Param('idSach') idSach: string) {
    return await this.chuongService.find({ idSach });
  }

  @Post(':idSach/chuong')
  async createChuong(
    @Param('idSach') idSach: string,
    @Body() createChuongDto: CreateChuongDto,
  ) {
    return await this.chuongService.create(idSach, createChuongDto);
  }

  @Get(':idSach/chuong/final')
  async getFinalChuong(@Param('idSach') idSach: string) {
    return await this.chuongService.getFinalChuong(idSach);
  }
}
