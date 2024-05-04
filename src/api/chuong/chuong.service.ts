import { Injectable } from '@nestjs/common';
import { CreateChuongDto } from './dto/create-chuong.dto';
import { UpdateChuongDto } from './dto/update-chuong.dto';
import { FirebaseRepository } from '../firebase/firebase.repository';
import { FirebaseCollection } from '../firebase/firebase-collection.enum';
import { CollectionReference, DocumentData } from 'firebase-admin/firestore';
import { Chuong } from './entities/chuong.entity';

@Injectable()
export class ChuongService {
  private chuongCollection: CollectionReference<DocumentData>;
  constructor(private firebaseRepository: FirebaseRepository) {
    this.chuongCollection = this.firebaseRepository.getCollection(
      FirebaseCollection.Chuong,
    );
  }

  async create(createChuongDto: CreateChuongDto): Promise<Chuong> {
    const ref = await this.chuongCollection.doc();
    const chuong = new Chuong({
      id: ref.id,
      ...createChuongDto,
    });
    await ref.set({
      ...chuong,
    });
    return chuong;
  }

  async findAll(): Promise<Chuong[]> {
    const snapshot = await this.chuongCollection.get();
    return snapshot.docs.map((doc) => {
      return new Chuong({
        id: doc.id,
        ...doc.data(),
      });
    });
  }

  async findOne(id: string): Promise<Chuong> {
    const snapshot = await this.chuongCollection.doc(id).get();
    return new Chuong({
      id: snapshot.id,
      ...snapshot.data(),
    });
  }

  async update(id: string, updateChuongDto: UpdateChuongDto): Promise<Chuong> {
    await this.chuongCollection.doc(id).set({
      ...updateChuongDto,
    });
    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.chuongCollection.doc(id).delete();
      return true;
    } catch (error) {
      return false;
    }
  }
}
