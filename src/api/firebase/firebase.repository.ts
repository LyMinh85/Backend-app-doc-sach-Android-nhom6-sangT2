import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

@Injectable()
export class FirebaseRepository {
  private db: Firestore;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.db = getFirestore(firebaseApp);
  }

  getDb() {
    return this.db;
  }

  getCollection(collection: string) {
    return this.db.collection(collection);
  }
}
