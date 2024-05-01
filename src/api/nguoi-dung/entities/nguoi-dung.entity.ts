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
    Object.assign(this, source);
  }
}
