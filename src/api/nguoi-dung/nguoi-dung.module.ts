import { Module } from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';
import { NguoiDungController } from './nguoi-dung.controller';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [NguoiDungController],
  providers: [NguoiDungService],
  exports: [NguoiDungService],
})
export class NguoiDungModule {}
