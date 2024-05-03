import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NguoiDungModule } from './api/nguoi-dung/nguoi-dung.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './api/firebase/firebase.module';
import { SachModule } from './api/sach/sach.module';
import { TheLoaiSachModule } from './api/the-loai-sach/the-loai-sach.module';

@Module({
  imports: [
    NguoiDungModule,
    ConfigModule.forRoot({ cache: true }),
    FirebaseModule,
    SachModule,
    TheLoaiSachModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
