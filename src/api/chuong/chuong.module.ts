import { Module } from '@nestjs/common';
import { ChuongService } from './chuong.service';
import { ChuongController } from './chuong.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { SachModule } from '../sach/sach.module';
import { SachService } from '../sach/sach.service';

@Module({
  imports: [FirebaseModule, SachModule],
  controllers: [ChuongController],
  providers: [ChuongService, SachService],
})
export class ChuongModule {}
