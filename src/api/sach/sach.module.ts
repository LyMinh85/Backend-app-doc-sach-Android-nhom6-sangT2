import { forwardRef, Module } from '@nestjs/common';
import { SachService } from './sach.service';
import { SachController } from './sach.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { ChuongModule } from '../chuong/chuong.module';
import { DanhGiaModule } from '../danh-gia/danh-gia.module';
import { ThuVienSachCaNhanModule } from '../thu-vien-sach-ca-nhan/thu-vien-sach-ca-nhan.module';
import { LichSuCaNhanModule } from '../lich-su-ca-nhan/lich-su-ca-nhan.module';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';
import { LuotDocModule } from '../luot-doc/luot-doc.module';

@Module({
  imports: [
    FirebaseModule,
    forwardRef(() => ChuongModule),
    forwardRef(() => DanhGiaModule),
    forwardRef(() => ThuVienSachCaNhanModule),
    forwardRef(() => LichSuCaNhanModule),
    forwardRef(() => NguoiDungModule),
    forwardRef(() => LuotDocModule),
  ],
  controllers: [SachController],
  providers: [SachService],
  exports: [SachService],
})
export class SachModule {}
