import { Module } from '@nestjs/common';
import { SachService } from './sach.service';
import { SachController } from './sach.controller';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [SachController],
  providers: [SachService],
  exports: [SachService],
})
export class SachModule {}
