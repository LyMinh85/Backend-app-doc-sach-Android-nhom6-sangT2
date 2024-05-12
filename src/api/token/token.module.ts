import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports:[FirebaseModule],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
