import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { LichSuCaNhanService } from './lich-su-ca-nhan.service';
import { CreateLichSuCaNhanDto } from './dto/create-lich-su-ca-nhan.dto';
import { UpdateLichSuCaNhanDto } from './dto/update-lich-su-ca-nhan.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { LichSuCaNhan } from './entities/lich-su-ca-nhan.entity';

@Controller('lich-su-ca-nhan')
export class LichSuCaNhanController {
  constructor(private readonly lichSuCaNhanService: LichSuCaNhanService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Create LichSuCaNhan',
    type: LichSuCaNhan,
  })
  create(
    @Body() createLichSuCaNhanDto: CreateLichSuCaNhanDto,
  ): Promise<LichSuCaNhan> {
    return this.lichSuCaNhanService.create(createLichSuCaNhanDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Get all LichSuCaNhan',
    type: [LichSuCaNhan],
  })
  findAll(): Promise<LichSuCaNhan[]> {
    return this.lichSuCaNhanService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Get one LichSuCaNhan by id',
    type: LichSuCaNhan,
  })
  findOne(@Param('id') id: string): Promise<LichSuCaNhan> {
    return this.lichSuCaNhanService.findOne(id);
  }

  @Patch('nguoi-dung/:idNguoiDung')
  @ApiOkResponse({
    description: 'Update thoiGianTruyCapCuoi of LichSuCaNhan',
    type: LichSuCaNhan,
  })
  updateThoiGianTruyCapCuoi(
    @Param('idNguoiDung') idNguoiDung: string,
    @Body() updateLichSuCaNhanDto: UpdateLichSuCaNhanDto,
  ): Promise<LichSuCaNhan> {
    return this.lichSuCaNhanService.updateOne(
      idNguoiDung,
      updateLichSuCaNhanDto,
    );
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateLichSuCaNhanDto: UpdateLichSuCaNhanDto,
  // ) {
  //   return this.lichSuCaNhanService.update(+id, updateLichSuCaNhanDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.lichSuCaNhanService.remove(+id);
  // }
}
