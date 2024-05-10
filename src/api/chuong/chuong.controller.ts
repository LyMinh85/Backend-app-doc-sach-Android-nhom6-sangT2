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
import { ChuongService } from './chuong.service';
import { CreateChuongDto } from './dto/create-chuong.dto';
import { UpdateChuongDto } from './dto/update-chuong.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { Chuong } from './entities/chuong.entity';
import { FindChuongParams } from './params/find-chuong.params';

@Controller('api/chuong')
export class ChuongController {
  constructor(private readonly chuongService: ChuongService) {}

  // @Post()
  // @ApiCreatedResponse({
  //   description: 'The record has been successfully created.',
  //   type: Chuong,
  // })
  // async create(@Body() createChuongDto: CreateChuongDto) {
  //   return this.chuongService.create(createChuongDto);
  // }

  // // find all chuong by idSach
  // @Get()
  // @ApiOkResponse({
  //   description: 'Records have been successfully retrieved.',
  //   type: [Chuong],
  // })
  // @ApiQuery({ name: 'idSach', required: false })
  // async find(@Query() findChuongParams: FindChuongParams) {
  //   return this.chuongService.find(findChuongParams);
  // }

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

  // @Get('final-chuong/:idSach')
  // @ApiOkResponse({
  //   description: 'Record has been successfully retrieved.',
  //   type: Chuong,
  // })
  // async getFinalChuong(@Param('idSach') idSach: string): Promise<Chuong> {
  //   return await this.chuongService.getFinalChuong(idSach);
  // }
}
