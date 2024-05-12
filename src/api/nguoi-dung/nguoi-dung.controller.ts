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
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ThuVienSachCaNhanService } from '../thu-vien-sach-ca-nhan/thu-vien-sach-ca-nhan.service';
import { ThuVienSachCaNhan } from '../thu-vien-sach-ca-nhan/entities/thu-vien-sach-ca-nhan.entity';
import { ThuVienSachCaNhanDto } from '../thu-vien-sach-ca-nhan/dto/thu-vien-sach-ca-nhan.dto';
import { CreateThuVienSachCaNhanDto } from '../thu-vien-sach-ca-nhan/dto/create-thu-vien-sach-ca-nhan.dto';
import { UpdateThuVienSachCaNhanDto } from '../thu-vien-sach-ca-nhan/dto/update-thu-vien-sach-ca-nhan.dto';
import { LoginPasswordEmailDto } from './dto/login-password-email.dto';
import { LoginByGoogleDto } from './dto/login-by-google.dto';

@Controller('api/nguoi-dung')
export class NguoiDungController {
  constructor(
    private readonly nguoiDungService: NguoiDungService,
    private readonly thuVienSachCaNhanService: ThuVienSachCaNhanService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Tạo 1 người dùng mới' })
  @ApiBody({
    type: CreateNguoiDungDto,
    description: 'avatar, googleId, phân cấp là optional, còn lại bắt buộc',
    examples: {
      example1: {
        value: {
          tenNguoiDung: 'Nguyễn Văn A',
          email: 'nguyenVanA@gmail.com',
          matKhau: '123456',
        },
      },
    },
  })
  @ApiCreatedResponse({ type: NguoiDung })
  async create(
    @Body() createNguoiDungDto: CreateNguoiDungDto,
  ): Promise<NguoiDung> {
    return this.nguoiDungService.create(createNguoiDungDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập người dùng bằng email và password' })
  @ApiBody({
    type: CreateNguoiDungDto,
    description: 'email, matKhau',
    examples: {
      example1: {
        value: {
          email: 'sample@gmail.com',
          matKhau: '123456',
        },
      },
    },
  })
  @ApiOkResponse({ type: NguoiDung })
  async login(
    @Body() loginPasswordEmailDto: LoginPasswordEmailDto,
  ): Promise<NguoiDung> {
    return this.nguoiDungService.login(loginPasswordEmailDto);
  }

  @Post('login/google')
  @ApiOperation({ summary: 'Đăng nhập người dùng bằng googleId' })
  @ApiBody({
    type: CreateNguoiDungDto,
    description: 'googleId',
    examples: {
      example1: {
        value: {
          googleId: '46fghfgh4676',
        },
      },
    },
  })
  @ApiOkResponse({ type: NguoiDung })
  async loginGoogle(
    @Body() loginByGoogleDto: LoginByGoogleDto,
  ): Promise<NguoiDung> {
    return this.nguoiDungService.loginGoogle(loginByGoogleDto);
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
