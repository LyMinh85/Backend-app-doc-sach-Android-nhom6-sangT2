import { Module } from '@nestjs/common';
import { ChuongService } from './chuong.service';
import { ChuongController } from './chuong.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { SachService } from '../sach/sach.service';

@Module({
  imports: [FirebaseModule],
  controllers: [ChuongController],
  providers: [ChuongService],
  exports: [ChuongService],
})
export class ChuongModule {}
