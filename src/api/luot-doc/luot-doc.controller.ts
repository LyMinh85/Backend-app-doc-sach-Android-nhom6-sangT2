import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LuotDocService } from './luot-doc.service';
import { CreateLuotDocDto } from './dto/create-luot-doc.dto';
import { UpdateLuotDocDto } from './dto/update-luot-doc.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { LuotDoc } from './entities/luot-doc.entity';
import { LuotDocDTO } from './dto/luot-doc.dto';

@Controller('luot-doc')
export class LuotDocController {
  constructor(private readonly luotDocService: LuotDocService) {}

  // @Post()
  // @ApiCreatedResponse({
  //   description: 'The record has been successfully created.',
  //   type: LuotDoc,
  // })
  // create(@Body() createLuotDocDto: CreateLuotDocDto): Promise<LuotDoc> {
  //   return this.luotDocService.create(createLuotDocDto);
  // }

  // @Get()
  // @ApiOkResponse({
  //   description: 'Records have been successfully retrieved.',
  //   type: [LuotDocDTO],
  // })
  // findAll(): Promise<LuotDocDTO[]> {
  //   return this.luotDocService.findAll();
  // }

  @Get(':id')
  @ApiOkResponse({
    description: 'Record has been successfully retrieved.',
    type: LuotDoc,
  })
  findOne(@Param('id') id: string): Promise<LuotDoc> {
    return this.luotDocService.findOne(id);
  }

  // @Patch(':id')
  // @ApiOkResponse({
  //   description: 'Record has been successfully updated.',
  //   type: LuotDocDTO,
  // })
  // update(
  //   @Param('id') id: string,
  //   @Body() updateLuotDocDto: UpdateLuotDocDto,
  // ): Promise<LuotDocDTO> {
  //   return this.luotDocService.update(id, updateLuotDocDto);
  // }

  // @Delete(':id')
  // @ApiOkResponse({
  //   description: 'Record has been successfully deleted.',
  //   type: Boolean,
  // })
  // remove(@Param('id') id: string): Promise<boolean> {
  //   return this.luotDocService.remove(id);
  // }
}
