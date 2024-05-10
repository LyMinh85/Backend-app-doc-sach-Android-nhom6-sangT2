import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { SachService } from './sach.service';
import { CreateSachDto } from './dto/create-sach.dto';
import { UpdateSachDto } from './dto/update-sach.dto';
import { SachQueryParams } from './interface/sach-query-params.interface';
import { ApiAcceptedResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { ChuongService } from '../chuong/chuong.service';
import { CreateChuongDto } from '../chuong/dto/create-chuong.dto';
import { DanhGiaService } from '../danh-gia/danh-gia.service';
import { CreateDanhGiaDto } from '../danh-gia/dto/create-danh-gia.dto';
import { LuotDocService } from '../luot-doc/luot-doc.service';
import { SachDto } from './dto/sach.dto';
import { ChuongDto } from '../chuong/dto/chuong.dto';

@Controller('api/sach')
export class SachController {
  constructor(
    @Inject(forwardRef(() => SachService))
    private readonly sachService: SachService,

    @Inject(forwardRef(() => ChuongService))
    private readonly chuongService: ChuongService,

    @Inject(forwardRef(() => DanhGiaService))
    private readonly danhGiaService: DanhGiaService,

    @Inject(forwardRef(() => LuotDocService))
    private readonly luotDocService: LuotDocService,
  ) {}

  @Post()
  async create(@Body() createSachDto: CreateSachDto) {
    return await this.sachService.create(createSachDto);
  }

  @Get()
  @ApiOkResponse({ description: 'List of Sach', type: [SachDto] })
  @ApiQuery({ name: 'TenSach', required: false })
  @ApiQuery({ name: 'NhaXuatBan', required: false })
  async findAll(@Query() sachQueryParams: SachQueryParams): Promise<SachDto[]> {
    return await this.sachService.findAll(sachQueryParams);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Sach detail', type: SachDto })
  async findOne(@Param('id') id: string): Promise<SachDto> {
    return await this.sachService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Updated Sach', type: SachDto })
  async update(@Param('id') id: string, @Body() updateSachDto: UpdateSachDto) {
    return await this.sachService.update(id, updateSachDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Deleted Sach', type: SachDto })
  async remove(@Param('id') id: string) {
    return await this.sachService.remove(id);
  }

  // Các API liên quan đến chương
  @Get(':idSach/chuong')
  @ApiQuery({ name: 'idNguoiDung', required: false })
  async findAllChuong(
    @Param('idSach') idSach: string,
    @Query('idNguoiDung') idNguoiDung?: string,
  ): Promise<ChuongDto[]> {
    return await this.chuongService.find(idSach, idNguoiDung);
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

  // Các API liên quan đến đánh giá
  @Get(':idSach/danh-gia')
  async findAllDanhGia(@Param('idSach') idSach: string) {
    return await this.danhGiaService.findDanhGiaByIdSach(idSach);
  }

  @Post(':idSach/danh-gia')
  async createDanhGia(
    @Param('idSach') idSach: string,
    @Body() createDanhGiaDto: CreateDanhGiaDto,
  ) {
    const danhGia = await this.danhGiaService.create(idSach, createDanhGiaDto);
    // Increase danhGia count of sach
    await this.sachService.increaseDanhGia(idSach, 1);

    return danhGia;
  }

  // Các API liên quan đến lượt đọc
  @Get(':idSach/luot-doc')
  async findAllLuotDoc(@Param('idSach') idSach: string) {
    return await this.luotDocService.findByIdSach(idSach);
  }

  @Post(':idSach/luot-doc/:idNguoiDung')
  async createLuotDoc(
    @Param('idSach') idSach: string,
    @Param('idNguoiDung') idNguoiDung: string,
  ) {
    return await this.luotDocService.create({ idSach, idNguoiDung });
  }
}
