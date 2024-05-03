import { Injectable } from '@nestjs/common';
import { CreateNguoiDungDto } from './dto/create-nguoi-dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi-dung.dto';
import { FirebaseRepository } from '../firebase/firebase.repository';
import { NguoiDung } from './entities/nguoi-dung.entity';
import { FirebaseCollection } from '../firebase/firebase-collection.enum';

@Injectable()
export class NguoiDungService {
  private nguoiDungCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  constructor(private firebaseRepository: FirebaseRepository) {
    this.nguoiDungCollection = this.firebaseRepository.getCollection(
      FirebaseCollection.NguoiDung,
    );
  }

  async create(createNguoiDungDto: CreateNguoiDungDto): Promise<NguoiDung> {
    const ref = this.nguoiDungCollection.doc();
    const res = await ref.set({ id: ref.id, ...createNguoiDungDto });
    return new NguoiDung({ id: ref.id, ...createNguoiDungDto });
  }

  async findAll(): Promise<NguoiDung[]> {
    const snapshot = await this.nguoiDungCollection.get();
    const nguoiDungs: NguoiDung[] = snapshot.docs.map((doc) => {
      return new NguoiDung({ id: doc.id, ...doc.data() });
    });
    return nguoiDungs;
  }

  async findOne(id: string): Promise<NguoiDung> {
    const snapshot = await this.nguoiDungCollection.doc(id).get();
    return new NguoiDung({ id: snapshot.id, ...snapshot.data() });
  }

  async update(id: string, updateNguoiDungDto: UpdateNguoiDungDto) {
    await this.nguoiDungCollection.doc(id).update({ ...updateNguoiDungDto });
    return await this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.nguoiDungCollection.doc(id).delete();
      return true;
    } catch (error) {
      return false;
    }
  }
}
