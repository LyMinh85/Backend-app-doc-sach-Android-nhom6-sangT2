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
import {
  NgayDangSort,
  SachQueryParams,
} from './interface/sach-query-params.interface';
import {
  ApiAcceptedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { ChuongService } from '../chuong/chuong.service';
import { CreateChuongDto } from '../chuong/dto/create-chuong.dto';
import { DanhGiaService } from '../danh-gia/danh-gia.service';
import { CreateDanhGiaDto } from '../danh-gia/dto/create-danh-gia.dto';
import { LuotDocService } from '../luot-doc/luot-doc.service';
import { SachDto } from './dto/sach.dto';
import { ChuongDto } from '../chuong/dto/chuong.dto';
import { Chuong } from '../chuong/entities/chuong.entity';
import { DanhGiaDto } from '../danh-gia/dto/danh-gia.dto';

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
  @ApiOperation({ summary: 'Tạo sách mới' })
  async create(@Body() createSachDto: CreateSachDto) {
    return await this.sachService.create(createSachDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách sách' })
  @ApiOkResponse({ description: 'List of Sach', type: [SachDto] })
  @ApiQuery({ name: 'TenSach', required: false })
  @ApiQuery({ name: 'NhaXuatBan', required: false })
  @ApiQuery({
    enum: NgayDangSort,
    name: 'ngayDangSort',
    required: false,
    enumName: 'NgayDangSort',
  })
  @ApiQuery({ name: 'idNguoiDung', required: false })
  @ApiQuery({ name: 'xemNhieuNhat', required: false, type: Boolean })
  async findAll(@Query() sachQueryParams: SachQueryParams): Promise<SachDto[]> {
    return await this.sachService.findAll(sachQueryParams);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin sách theo id' })
  @ApiOkResponse({ description: 'Sach detail', type: SachDto })
  async findOne(@Param('id') id: string): Promise<SachDto> {
    return await this.sachService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin sách' })
  @ApiOkResponse({ description: 'Updated Sach', type: SachDto })
  async update(@Param('id') id: string, @Body() updateSachDto: UpdateSachDto) {
    return await this.sachService.update(id, updateSachDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa sách' })
  @ApiOkResponse({ description: 'Deleted Sach', type: SachDto })
  async remove(@Param('id') id: string) {
    return await this.sachService.remove(id);
  }

  // Các API liên quan đến chương
  @Get(':idSach/chuong')
  @ApiOperation({ summary: 'Lấy danh sách chương của sách' })
  @ApiQuery({ name: 'idNguoiDung', required: false })
  async findAllChuong(
    @Param('idSach') idSach: string,
    @Query('idNguoiDung') idNguoiDung?: string,
  ): Promise<ChuongDto[]> {
    return await this.chuongService.find(idSach, idNguoiDung);
  }

  @Post(':idSach/chuong')
  @ApiOperation({ summary: 'Tạo chương mới của sách' })
  async createChuong(
    @Param('idSach') idSach: string,
    @Body() createChuongDto: CreateChuongDto,
  ): Promise<Chuong> {
    return await this.chuongService.create(idSach, createChuongDto);
  }

  @Get(':idSach/chuong/final')
  @ApiOperation({ summary: 'Lấy chương cuối cùng của sách' })
  async getFinalChuong(@Param('idSach') idSach: string): Promise<Chuong> {
    return await this.chuongService.getFinalChuong(idSach);
  }

  // Các API liên quan đến đánh giá
  @Get(':idSach/danh-gia')
  @ApiOperation({ summary: 'Lấy danh sách đánh giá của sách' })
  async findAllDanhGia(@Param('idSach') idSach: string): Promise<DanhGiaDto[]> {
    return await this.danhGiaService.findDanhGiaByIdSach(idSach);
  }

  @Post(':idSach/danh-gia')
  @ApiOperation({ summary: 'Tạo đánh giá mới cho sách' })
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
  @ApiOperation({ summary: 'Lấy danh sách lượt đọc của sách' })
  async findAllLuotDoc(@Param('idSach') idSach: string) {
    return await this.luotDocService.findByIdSach(idSach);
  }

  @Post(':idSach/luot-doc/:idNguoiDung')
  @ApiOperation({ summary: 'Tạo lượt đọc mới cho sách' })
  async createLuotDoc(
    @Param('idSach') idSach: string,
    @Param('idNguoiDung') idNguoiDung: string,
  ) {
    return await this.luotDocService.create({ idSach, idNguoiDung });
  }
}
