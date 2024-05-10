import { forwardRef, Module } from '@nestjs/common';
import { ChuongService } from './chuong.service';
import { ChuongController } from './chuong.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { SachModule } from '../sach/sach.module';
import { DanhDauChuongModule } from '../danh-dau-chuong/danh-dau-chuong.module';

@Module({
  imports: [
    FirebaseModule,
    forwardRef(() => SachModule),
    forwardRef(() => DanhDauChuongModule),
  ],
  controllers: [ChuongController],
  providers: [ChuongService],
  exports: [ChuongService],
})
export class ChuongModule {}
