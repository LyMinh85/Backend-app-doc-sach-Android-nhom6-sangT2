import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { Storage } from 'firebase-admin/storage';

@Injectable()
export class FirebaseRepository {
  private db: Firestore;
  private storage: Storage;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.db = getFirestore(firebaseApp);
  }

  getDb() {
    return this.db;
  }

  getCollection(collection: string) {
    return this.db.collection(collection);
  }

  getQuery(
    collection: string,
  ): FirebaseFirestore.Query<
    FirebaseFirestore.DocumentData,
    FirebaseFirestore.DocumentData
  > {
    return this.db.collection(collection);
  }

  getBucket() {
    return this.storage.bucket();
  }
}
