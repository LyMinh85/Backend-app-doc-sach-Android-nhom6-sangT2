import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';
import { CreateNguoiDungDto } from './dto/create-nguoi-dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi-dung.dto';
import { NguoiDung } from './entities/nguoi-dung.entity';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('api/nguoi-dung')
export class NguoiDungController {
  constructor(private readonly nguoiDungService: NguoiDungService) {}

  @Post()
  @ApiCreatedResponse({ type: NguoiDung })
  async create(
    @Body() createNguoiDungDto: CreateNguoiDungDto,
  ): Promise<NguoiDung> {
    return this.nguoiDungService.create(createNguoiDungDto);
  }

  @Get()
  @ApiOkResponse({ type: [NguoiDung] })
  async findAll(): Promise<NguoiDung[]> {
    return await this.nguoiDungService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: NguoiDung })
  async findOne(@Param('id') id: string): Promise<NguoiDung> {
    return await this.nguoiDungService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: NguoiDung })
  update(
    @Param('id') id: string,
    @Body() updateNguoiDungDto: UpdateNguoiDungDto,
  ): Promise<NguoiDung> {
    return this.nguoiDungService.update(id, updateNguoiDungDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Boolean })
  remove(@Param('id') id: string): Promise<boolean> {
    return this.nguoiDungService.remove(id);
  }
}
