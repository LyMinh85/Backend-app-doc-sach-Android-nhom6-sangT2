import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NguoiDungModule } from './api/nguoi-dung/nguoi-dung.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './api/firebase/firebase.module';
import { SachModule } from './api/sach/sach.module';
import { TheLoaiSachModule } from './api/the-loai-sach/the-loai-sach.module';
import { ChuongModule } from './api/chuong/chuong.module';
import { LuotDocModule } from './api/luot-doc/luot-doc.module';
import { DanhGiaModule } from './api/danh-gia/danh-gia.module';
import { ThuVienSachCaNhanModule } from './api/thu-vien-sach-ca-nhan/thu-vien-sach-ca-nhan.module';
import { LichSuCaNhanModule } from './api/lich-su-ca-nhan/lich-su-ca-nhan.module';
import { DanhDauChuongModule } from './api/danh-dau-chuong/danh-dau-chuong.module';
import { NotificationModule } from './api/notification/notification.module';
import { TokenModule } from './api/token/token.module';

@Module({
  imports: [
    NguoiDungModule,
    ConfigModule.forRoot({ cache: true }),
    FirebaseModule,
    SachModule,
    TheLoaiSachModule,
    ChuongModule,
    LuotDocModule,
    DanhGiaModule,
    ThuVienSachCaNhanModule,
    LichSuCaNhanModule,
    DanhDauChuongModule,
    NotificationModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
