import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ThuVienSachCaNhanService } from './thu-vien-sach-ca-nhan.service';
import { CreateThuVienSachCaNhanDto } from './dto/create-thu-vien-sach-ca-nhan.dto';
import { UpdateThuVienSachCaNhanDto } from './dto/update-thu-vien-sach-ca-nhan.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('thu-vien-sach-ca-nhan')
export class ThuVienSachCaNhanController {
  constructor(
    private readonly thuVienSachCaNhanService: ThuVienSachCaNhanService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: CreateThuVienSachCaNhanDto,
    description: 'Create ThuVienSachCaNhan',
  })
  create(@Body() createThuVienSachCaNhanDto: CreateThuVienSachCaNhanDto) {
    return this.thuVienSachCaNhanService.create(createThuVienSachCaNhanDto);
  }

  @Get()
  @ApiOkResponse({
    type: CreateThuVienSachCaNhanDto,
    description: 'Get all ThuVienSachCaNhan',
  })
  findAll() {
    return this.thuVienSachCaNhanService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: CreateThuVienSachCaNhanDto,
    description: 'Get one ThuVienSachCaNhan by id',
  })
  findOne(@Param('id') id: string) {
    return this.thuVienSachCaNhanService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: CreateThuVienSachCaNhanDto,
    description: 'Update ThuVienSachCaNhan by id',
  })
  update(
    @Param('id') id: string,
    @Body() updateThuVienSachCaNhanDto: UpdateThuVienSachCaNhanDto,
  ) {
    return this.thuVienSachCaNhanService.update(id, updateThuVienSachCaNhanDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: CreateThuVienSachCaNhanDto,
    description: 'Delete ThuVienSachCaNhan by id',
  })
  remove(@Param('id') id: string) {
    return this.thuVienSachCaNhanService.remove(id);
  }
}
