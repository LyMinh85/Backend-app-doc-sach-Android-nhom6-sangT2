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
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ThuVienSachCaNhanService } from '../thu-vien-sach-ca-nhan/thu-vien-sach-ca-nhan.service';
import { ThuVienSachCaNhan } from '../thu-vien-sach-ca-nhan/entities/thu-vien-sach-ca-nhan.entity';
import { ThuVienSachCaNhanDto } from '../thu-vien-sach-ca-nhan/dto/thu-vien-sach-ca-nhan.dto';
import { CreateThuVienSachCaNhanDto } from '../thu-vien-sach-ca-nhan/dto/create-thu-vien-sach-ca-nhan.dto';
import { UpdateThuVienSachCaNhanDto } from '../thu-vien-sach-ca-nhan/dto/update-thu-vien-sach-ca-nhan.dto';

@Controller('api/nguoi-dung')
export class NguoiDungController {
  constructor(
    private readonly nguoiDungService: NguoiDungService,
    private readonly thuVienSachCaNhanService: ThuVienSachCaNhanService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Tạo 1 người dùng mới' })
  @ApiCreatedResponse({ type: NguoiDung })
  async create(
    @Body() createNguoiDungDto: CreateNguoiDungDto,
  ): Promise<NguoiDung> {
    return this.nguoiDungService.create(createNguoiDungDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách người dùng' })
  @ApiOkResponse({ type: [NguoiDung] })
  async findAll(): Promise<NguoiDung[]> {
    return await this.nguoiDungService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin người dùng theo id' })
  @ApiOkResponse({ type: NguoiDung })
  async findOne(@Param('id') id: string): Promise<NguoiDung> {
    return await this.nguoiDungService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin người dùng' })
  @ApiOkResponse({ type: NguoiDung })
  update(
    @Param('id') id: string,
    @Body() updateNguoiDungDto: UpdateNguoiDungDto,
  ): Promise<NguoiDung> {
    return this.nguoiDungService.update(id, updateNguoiDungDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa người dùng' })
  @ApiOkResponse({ type: Boolean })
  remove(@Param('id') id: string): Promise<boolean> {
    return this.nguoiDungService.remove(id);
  }

  @Get(':idNguoiDung/thu-vien-sach')
  @ApiOperation({ summary: 'Lấy danh sách sách trong thư viện cá nhân' })
  @ApiOkResponse({ type: [ThuVienSachCaNhanDto] })
  async getThuVienSach(
    @Param('idNguoiDung') idNguoiDung: string,
  ): Promise<ThuVienSachCaNhanDto[]> {
    return await this.thuVienSachCaNhanService.findByIdNguoiDung(idNguoiDung);
  }

  @Post(':idNguoiDung/thu-vien-sach/:idSach')
  @ApiOperation({ summary: 'Thêm sách vào thư viện cá nhân' })
  @ApiCreatedResponse({ type: ThuVienSachCaNhanDto })
  async addSachToThuVien(
    @Param('idNguoiDung') idNguoiDung: string,
    @Param('idSach') idSach: string,
    @Body() createThuVienSachCaNhanDto: CreateThuVienSachCaNhanDto,
  ): Promise<ThuVienSachCaNhanDto> {
    return await this.thuVienSachCaNhanService.create(
      idNguoiDung,
      idSach,
      createThuVienSachCaNhanDto,
    );
  }

  @Patch(':idNguoiDung/thu-vien-sach/:idSach')
  @ApiOperation({ summary: 'Cập nhật sách yêu thích trong thư viện cá nhân' })
  @ApiOkResponse({ type: ThuVienSachCaNhanDto })
  async updateThuVienSach(
    @Param('idNguoiDung') idNguoiDung: string,
    @Param('idSach') idSach: string,
    @Body() updateThuVienSachCaNhanDto: UpdateThuVienSachCaNhanDto,
  ): Promise<ThuVienSachCaNhanDto> {
    return await this.thuVienSachCaNhanService.update(
      idNguoiDung,
      idSach,
      updateThuVienSachCaNhanDto,
    );
  }

  @Delete(':idNguoiDung/thu-vien-sach/:idSach')
  @ApiOperation({ summary: 'Xóa sách khỏi thư viện cá nhân' })
  @ApiOkResponse({ type: Boolean })
  async removeSachFromThuVien(
    @Param('idNguoiDung') idNguoiDung: string,
    @Param('idSach') idSach: string,
  ): Promise<boolean> {
    return await this.thuVienSachCaNhanService.removeByIdSachAndIdNguoiDung(
      idSach,
      idNguoiDung,
    );
  }
}
