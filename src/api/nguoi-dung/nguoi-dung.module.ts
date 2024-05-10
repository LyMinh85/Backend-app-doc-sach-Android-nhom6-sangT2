import { Module } from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';
import { NguoiDungController } from './nguoi-dung.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { ThuVienSachCaNhanModule } from '../thu-vien-sach-ca-nhan/thu-vien-sach-ca-nhan.module';
import { LichSuCaNhanModule } from '../lich-su-ca-nhan/lich-su-ca-nhan.module';

@Module({
  imports: [FirebaseModule, ThuVienSachCaNhanModule, LichSuCaNhanModule],
  controllers: [NguoiDungController],
  providers: [NguoiDungService],
  exports: [NguoiDungService],
})
export class NguoiDungModule {}
