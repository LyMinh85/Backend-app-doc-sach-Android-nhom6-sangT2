import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NguoiDungModule } from './api/nguoi-dung/nguoi-dung.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './api/firebase/firebase.module';

@Module({
  imports: [
    NguoiDungModule,
    ConfigModule.forRoot({ cache: true }),
    FirebaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
