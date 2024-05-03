import { Module } from '@nestjs/common';
import { TheLoaiSachService } from './the-loai-sach.service';
import { TheLoaiSachController } from './the-loai-sach.controller';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [TheLoaiSachController],
  providers: [TheLoaiSachService],
})
export class TheLoaiSachModule {}
