import { Module } from '@nestjs/common';
import { DanhGiaService } from './danh-gia.service';
import { DanhGiaController } from './danh-gia.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { SachModule } from '../sach/sach.module';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';

@Module({
  imports: [FirebaseModule, SachModule, NguoiDungModule],
  controllers: [DanhGiaController],
  providers: [DanhGiaService],
})
export class DanhGiaModule {}
