import { Module } from '@nestjs/common';
import { LichSuCaNhanService } from './lich-su-ca-nhan.service';
import { LichSuCaNhanController } from './lich-su-ca-nhan.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { SachModule } from '../sach/sach.module';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';

@Module({
  imports: [FirebaseModule, SachModule],
  controllers: [LichSuCaNhanController],
  providers: [LichSuCaNhanService],
  exports: [LichSuCaNhanService],
})
export class LichSuCaNhanModule {}
