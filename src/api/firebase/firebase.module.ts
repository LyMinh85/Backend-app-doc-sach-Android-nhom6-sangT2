import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { firebaseProvider } from './firebase.provider';
import { FirebaseRepository } from './firebase.repository';

@Module({
  imports: [ConfigModule],
  providers: [firebaseProvider, FirebaseRepository],
  exports: [FirebaseRepository],
})
export class FirebaseModule {}
