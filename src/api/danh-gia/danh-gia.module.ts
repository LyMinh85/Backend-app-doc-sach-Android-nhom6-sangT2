import { forwardRef, Module } from '@nestjs/common';
import { DanhGiaService } from './danh-gia.service';
import { DanhGiaController } from './danh-gia.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { SachModule } from '../sach/sach.module';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';

@Module({
  imports: [
    FirebaseModule,
    forwardRef(() => SachModule),
    forwardRef(() => NguoiDungModule),
  ],
  controllers: [DanhGiaController],
  providers: [DanhGiaService],
  exports: [DanhGiaService],
})
export class DanhGiaModule {}
