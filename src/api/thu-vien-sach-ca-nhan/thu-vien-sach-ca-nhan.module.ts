import { Module } from '@nestjs/common';
import { ThuVienSachCaNhanService } from './thu-vien-sach-ca-nhan.service';
import { ThuVienSachCaNhanController } from './thu-vien-sach-ca-nhan.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { SachModule } from '../sach/sach.module';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';

@Module({
  imports: [FirebaseModule, SachModule, NguoiDungModule],
  controllers: [ThuVienSachCaNhanController],
  providers: [ThuVienSachCaNhanService],
})
export class ThuVienSachCaNhanModule {}
