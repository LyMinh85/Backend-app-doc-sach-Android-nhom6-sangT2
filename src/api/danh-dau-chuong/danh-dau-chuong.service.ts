import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDanhDauChuongDto } from './dto/create-danh-dau-chuong.dto';
import { UpdateDanhDauChuongDto } from './dto/update-danh-dau-chuong.dto';
import {
  CollectionReference,
  DocumentData,
  DocumentSnapshot,
} from 'firebase-admin/firestore';
import { FirebaseRepository } from '../firebase/firebase.repository';
import { FirebaseCollection } from '../firebase/firebase-collection.enum';
import { DanhDauChuong } from './entities/danh-dau-chuong.entity';

@Injectable()
export class DanhDauChuongService {
  private danhDauChuongCollection: CollectionReference<DocumentData>;
  constructor(private firebaseRepository: FirebaseRepository) {
    this.danhDauChuongCollection = this.firebaseRepository.getCollection(
      FirebaseCollection.DanhDauChuong,
    );
  }

  async docToDanhDauChuong(
    doc: DocumentSnapshot<DocumentData, DocumentData>,
  ): Promise<DanhDauChuong> {
    return new DanhDauChuong({ ...doc.data() });
  }

  async create(
    idChuong: string,
    createDanhDauChuongDto: CreateDanhDauChuongDto,
  ): Promise<DanhDauChuong> {
    // if isDanhDau
    if (await this.isDanhDau(idChuong, createDanhDauChuongDto.idNguoiDung)) {
      throw new BadRequestException('Đã đánh dấu chương này');
    }

    // Create danhDauChuong
    const ref = this.danhDauChuongCollection.doc();
    const danhDauChuong: DanhDauChuong = {
      id: ref.id,
      idChuong,
      ...createDanhDauChuongDto,
    };
    await ref.set(danhDauChuong);
    return this.findOne(ref.id);
  }

  async findOne(id: string): Promise<DanhDauChuong> {
    const doc = await this.danhDauChuongCollection.doc(id).get();
    return this.docToDanhDauChuong(doc);
  }

  async findByIdNguoiDung(idNguoiDung: string): Promise<DanhDauChuong[]> {
    const snapshot = await this.danhDauChuongCollection
      .where('idNguoiDung', '==', idNguoiDung)
      .get();
    return Promise.all(
      snapshot.docs.map((doc) => this.docToDanhDauChuong(doc)),
    );
  }

  async isDanhDau(idChuong: string, idNguoiDung: string): Promise<boolean> {
    const snapshot = await this.danhDauChuongCollection
      .where('idChuong', '==', idChuong)
      .where('idNguoiDung', '==', idNguoiDung)
      .get();
    return snapshot.size > 0;
  }

  async remove(idChuong: string, idNguoiDung: string): Promise<boolean> {
    if (this.isDanhDau(idChuong, idNguoiDung)) {
      const snapshot = await this.danhDauChuongCollection
        .where('idChuong', '==', idChuong)
        .where('idNguoiDung', '==', idNguoiDung)
        .get();
      await snapshot.docs[0].ref.delete();
      return true;
    }
    return false;
  }
}
