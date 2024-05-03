import { Injectable } from '@nestjs/common';
import { CreateTheLoaiSachDto } from './dto/create-the-loai-sach.dto';
import { UpdateTheLoaiSachDto } from './dto/update-the-loai-sach.dto';
import { FirebaseRepository } from '../firebase/firebase.repository';
import { TheLoaiSach } from './entities/the-loai-sach.entity';

@Injectable()
export class TheLoaiSachService {
  public readonly COLLECTION_NAME = 'TheLoaiSach';
  private theLoaiSachCollection = this.firebaseRepository.getCollection(
    this.COLLECTION_NAME,
  );
  constructor(private firebaseRepository: FirebaseRepository) {}

  async create(
    createTheLoaiSachDto: CreateTheLoaiSachDto,
  ): Promise<TheLoaiSach> {
    const ref = this.theLoaiSachCollection.doc();
    await ref.set({
      id: ref.id,
      ...createTheLoaiSachDto,
    });
    return new TheLoaiSach({ id: ref.id, ...createTheLoaiSachDto });
  }

  async findAll(): Promise<TheLoaiSach[]> {
    const snapshot = await this.theLoaiSachCollection.get();
    return snapshot.docs.map((doc) => {
      return new TheLoaiSach(doc.data());
    });
  }

  async findOne(id: string): Promise<TheLoaiSach> {
    const doc = await this.theLoaiSachCollection.doc(id).get();
    return new TheLoaiSach(doc.data());
  }

  async update(
    id: string,
    updateTheLoaiSachDto: UpdateTheLoaiSachDto,
  ): Promise<TheLoaiSach> {
    await this.theLoaiSachCollection.doc(id).update({
      ...updateTheLoaiSachDto,
    });
    return await this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.theLoaiSachCollection.doc(id).delete();
      return true;
    } catch (error) {
      return false;
    }
  }
}
