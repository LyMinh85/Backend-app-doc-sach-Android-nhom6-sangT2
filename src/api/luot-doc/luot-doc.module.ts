import { Module } from '@nestjs/common';
import { LuotDocService } from './luot-doc.service';
import { LuotDocController } from './luot-doc.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { SachModule } from '../sach/sach.module';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';

@Module({
  imports: [FirebaseModule, SachModule, NguoiDungModule],
  controllers: [LuotDocController],
  providers: [LuotDocService],
})
export class LuotDocModule {}
