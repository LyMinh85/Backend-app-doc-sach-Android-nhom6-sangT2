import { forwardRef, Module } from '@nestjs/common';
import { ChuongService } from './chuong.service';
import { ChuongController } from './chuong.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { SachService } from '../sach/sach.service';
import { SachModule } from '../sach/sach.module';

@Module({
  imports: [FirebaseModule, forwardRef(() => SachModule)],
  controllers: [ChuongController],
  providers: [ChuongService],
  exports: [ChuongService],
})
export class ChuongModule {}
