import { ApiProperty } from '@nestjs/swagger';

export class NguoiDung {
  @ApiProperty()
  id: string;
  @ApiProperty()
  tenNguoiDung: string;
  @ApiProperty()
  avatar: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  googleId: string;
  @ApiProperty()
  matKhau: string;
  @ApiProperty()
  phanCap: string;
  constructor(source: Partial<NguoiDung>) {
    this.id = source.id;
    this.tenNguoiDung = source.tenNguoiDung;
    this.avatar = source.avatar;
    this.email = source.email;
    this.googleId = source.googleId;
    this.matKhau = source.matKhau;
    this.phanCap = source.phanCap;
  }
}
