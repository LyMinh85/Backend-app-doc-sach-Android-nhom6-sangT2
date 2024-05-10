import { forwardRef, Module } from '@nestjs/common';
import { DanhDauChuongService } from './danh-dau-chuong.service';
import { DanhDauChuongController } from './danh-dau-chuong.controller';
import { ChuongModule } from '../chuong/chuong.module';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [FirebaseModule, forwardRef(() => ChuongModule)],
  controllers: [DanhDauChuongController],
  providers: [DanhDauChuongService],
  exports: [DanhDauChuongService],
})
export class DanhDauChuongModule {}
