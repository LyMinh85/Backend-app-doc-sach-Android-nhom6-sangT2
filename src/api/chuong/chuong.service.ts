import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateChuongDto } from './dto/create-chuong.dto';
import { UpdateChuongDto } from './dto/update-chuong.dto';
import { FirebaseRepository } from '../firebase/firebase.repository';
import { FirebaseCollection } from '../firebase/firebase-collection.enum';
import { CollectionReference, DocumentData } from 'firebase-admin/firestore';
import { Chuong } from './entities/chuong.entity';
import { FindChuongParams } from './params/find-chuong.params';
import { SachService } from '../sach/sach.service';
import { DanhDauChuongService } from '../danh-dau-chuong/danh-dau-chuong.service';
import { ChuongDto } from './dto/chuong.dto';

@Injectable()
export class ChuongService {
  private chuongCollection: CollectionReference<DocumentData>;
  constructor(
    private firebaseRepository: FirebaseRepository,

    @Inject(forwardRef(() => DanhDauChuongService))
    private danhDauChuongService: DanhDauChuongService,
  ) {
    this.chuongCollection = this.firebaseRepository.getCollection(
      FirebaseCollection.Chuong,
    );
  }

  // Convert a document data to Chuong entity include sach property
  // by fetching sach document from firebase
  // async convertToChuong(
  //   doc: QueryDocumentSnapshot<DocumentData, DocumentData>,
  // ): Chuong {
  //   const chuong = new Chuong({ id: doc.id, ...doc.data() });
  //   // Fetch sach document from firebase
  //   const sach = await this.sachService.findOne(chuong.idSach);
  //   chuong.sach = sach;
  // }

  async create(
    idSach: string,
    createChuongDto: CreateChuongDto,
  ): Promise<Chuong> {
    const ref = this.chuongCollection.doc();

    // Get the last chuong of the sach
    const lastChuong = await this.getFinalChuong(idSach);
    const soThuTu = lastChuong ? lastChuong.soThuTu + 1 : 1;

    const chuong = new Chuong({
      id: ref.id,
      idSach,
      ...createChuongDto,
      soThuTu,
    });
    await ref.set({
      ...chuong,
    });
    return chuong;
  }

  async find(idSach: string, idNguoiDung: string): Promise<ChuongDto[]> {
    let query = this.firebaseRepository.getQuery(FirebaseCollection.Chuong);

    if (idSach) {
      query = query.where('idSach', '==', idSach);
    }

    // sort by soThuTu
    query = query.orderBy('soThuTu');

    const snapshot = await query.get();

    return Promise.all(
      snapshot.docs.map(async (doc) => {
        const chuong = new ChuongDto({ id: doc.id, ...doc.data() });

        // Check if the chuong is danh dau
        if (idNguoiDung) {
          chuong.isDanhDau = await this.danhDauChuongService.isDanhDau(
            chuong.id,
            idNguoiDung,
          );
        }
        return chuong;
      }),
    );
  }

  async findOne(id: string): Promise<Chuong> {
    const snapshot = await this.chuongCollection.doc(id).get();
    return new Chuong({
      id: snapshot.id,
      ...snapshot.data(),
    });
  }

  async update(id: string, updateChuongDto: UpdateChuongDto): Promise<Chuong> {
    await this.chuongCollection.doc(id).update({
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

  async getFinalChuong(idSach: string): Promise<Chuong> {
    let query = this.firebaseRepository.getQuery(FirebaseCollection.Chuong);
    query = query
      .where('idSach', '==', idSach)
      .orderBy('soThuTu', 'desc')
      .limit(1);
    const snapshot = await query.get();
    // Check if there is no chuong
    if (snapshot.empty) {
      return null;
    }

    return new Chuong({
      id: snapshot.docs[0].id,
      ...snapshot.docs[0].data(),
    });
  }
}
