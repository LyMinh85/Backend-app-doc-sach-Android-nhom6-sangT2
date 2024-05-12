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
import { ThuVienSachCaNhanDto } from './dto/thu-vien-sach-ca-nhan.dto';

@Controller('thu-vien-sach-ca-nhan')
export class ThuVienSachCaNhanController {
  constructor(
    private readonly thuVienSachCaNhanService: ThuVienSachCaNhanService,
  ) { }

  // @Post()
  // @ApiCreatedResponse({
  //   type: ThuVienSachCaNhanDto,
  //   description: 'Create ThuVienSachCaNhan',
  // })
  // create(
  //   @Body() createThuVienSachCaNhanDto: CreateThuVienSachCaNhanDto,
  // ): Promise<ThuVienSachCaNhanDto> {
  //   return this.thuVienSachCaNhanService.create(createThuVienSachCaNhanDto);
  // }

  @Get()
  @ApiOkResponse({
    type: [ThuVienSachCaNhanDto],
    description: 'Get all ThuVienSachCaNhan',
  })
  findAll(): Promise<ThuVienSachCaNhanDto[]> {
    return this.thuVienSachCaNhanService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: ThuVienSachCaNhanDto,
    description: 'Get one ThuVienSachCaNhan by id',
  })
  findOne(@Param('id') id: string): Promise<ThuVienSachCaNhanDto> {
    return this.thuVienSachCaNhanService.findOne(id);
  }

  // @Patch(':id')
  // @ApiOkResponse({
  //   type: ThuVienSachCaNhanDto,
  //   description: 'Update ThuVienSachCaNhan by id',
  // })
  // update(
  //   @Param('id') id: string,
  //   @Body() updateThuVienSachCaNhanDto: UpdateThuVienSachCaNhanDto,
  // ): Promise<ThuVienSachCaNhanDto> {
  //   return this.thuVienSachCaNhanService.update(id, updateThuVienSachCaNhanDto);
  // }

  @Delete(':id')
  @ApiOkResponse({
    type: Boolean,
    description: 'Delete ThuVienSachCaNhan by id',
  })
  remove(@Param('id') id: string): Promise<boolean> {
    return this.thuVienSachCaNhanService.remove(id);
  }
}
