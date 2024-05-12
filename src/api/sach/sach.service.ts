import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSachDto } from './dto/create-sach.dto';
import { UpdateSachDto } from './dto/update-sach.dto';
import { FirebaseRepository } from '../firebase/firebase.repository';
import { Sach } from './entities/sach.entity';
import { SachQueryParams } from './interface/sach-query-params.interface';
import { TheLoaiSachService } from '../the-loai-sach/the-loai-sach.service';
import { FirebaseCollection } from '../firebase/firebase-collection.enum';
import { TheLoaiSach } from '../the-loai-sach/entities/the-loai-sach.entity';
import { SachDto } from './dto/sach.dto';
import { FieldValue } from 'firebase-admin/firestore';
import * as moment from 'moment';

@Injectable()
export class SachService {
  private sachCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  private COLLECTION_NAME = 'Sach';

  constructor(private firebaseRepository: FirebaseRepository) {
    this.sachCollection = this.firebaseRepository.getCollection(
      this.COLLECTION_NAME,
    );
  }

  async docToSachDto(
    doc: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>,
  ): Promise<SachDto> {
    const sach = new SachDto({ id: doc.id, ...doc.data() });
    if (doc.data().ListTheLoaiRef) {
      const listTheLoai = await Promise.all(
        doc.data().ListTheLoaiRef.map(async (theLoaiRef) => {
          const theLoaiDoc = await theLoaiRef.get();
          return new TheLoaiSach({
            id: theLoaiDoc.id,
            ...theLoaiDoc.data(),
          });
        }),
      );
      sach.ListTheLoai = listTheLoai;
    }
    sach.ngayDang = moment(sach.ngayDang).format('DD/MM/YYYY');
    return sach;
  }

  async create(createSachDto: CreateSachDto): Promise<Sach> {
    const ref = this.sachCollection.doc();
    const ListTheLoaiId = createSachDto.ListTheLoaiId;
    // remove ListTheLoaiId from createSachDto
    delete createSachDto.ListTheLoaiId;
    let sach;
    if (ListTheLoaiId) {
      const listTheLoaiRef = ListTheLoaiId.map((theLoaiId) =>
        this.firebaseRepository
          .getCollection(FirebaseCollection.TheLoai)
          .doc(theLoaiId),
      );

      sach = new Sach({
        id: ref.id,
        ...createSachDto,
        ListTheLoaiRef: listTheLoaiRef,
        tongSoLuotDoc: 0,
        tongSoDanhGia: 0,
        ngayDang: new Date(),
      });
    } else {
      sach = new Sach({
        id: ref.id,
        ...createSachDto,
        tongSoLuotDoc: 0,
        tongSoDanhGia: 0,
        ngayDang: new Date(),
      });
    }

    await ref.set({ ...sach });
    return sach;
  }

  async findAll(sachQueryParams: SachQueryParams): Promise<SachDto[]> {
    const { TenSach, NhaXuatBan, idNguoiDung, ngayDang, xemNhieuNhat } =
      sachQueryParams;
    let query = this.firebaseRepository.getQuery(this.COLLECTION_NAME);

    if (TenSach) {
      query = query.where('TenSach', '==', TenSach);
    }

    if (NhaXuatBan) {
      query = query.where('NhaXuatBan', '==', NhaXuatBan);
    }

    if (idNguoiDung) {
      query = query.where('idNguoiDung', '==', idNguoiDung);
    }

    // sort asc and desc by ngayDang
    if (ngayDang) {
      query = query.orderBy('ngayDang', ngayDang);
    }

    // sort by xemNhieuNhat
    if (xemNhieuNhat) {
      query = query.orderBy('tongSoLuotDoc', 'desc');
    }

    const snapshot = await query.get();
    const sachList: SachDto[] = await Promise.all(
      snapshot.docs.map((doc) => this.docToSachDto(doc)),
    );
    return sachList;
  }

  async findOne(id: string): Promise<SachDto> {
    const snapshot = await this.sachCollection.doc(id).get();

    if (!snapshot.exists) {
      throw new NotFoundException(`Sach with id ${id} not found`);
    }

    const sachDto: SachDto = new SachDto({
      id: snapshot.id,
      ...snapshot.data(),
    });
    if (snapshot.data().ListTheLoaiRef) {
      const listTheLoai = await Promise.all(
        snapshot.data().ListTheLoaiRef.map(async (theLoaiRef) => {
          const theLoaiDoc = await theLoaiRef.get();
          return new TheLoaiSach({
            id: theLoaiDoc.id,
            ...theLoaiDoc.data(),
          });
        }),
      );
      sachDto.ListTheLoai = listTheLoai;
    }
    return sachDto;
  }

  async update(id: string, updateSachDto: UpdateSachDto): Promise<SachDto> {
    await this.findOne(id);

    const ref = this.sachCollection.doc(id);
    const ListTheLoaiId = updateSachDto.ListTheLoaiId;
    let listTheLoaiRef = undefined;
    if (ListTheLoaiId) {
      delete updateSachDto.ListTheLoaiId;
      listTheLoaiRef = ListTheLoaiId.map((theLoaiId) =>
        this.firebaseRepository
          .getCollection(FirebaseCollection.TheLoai)
          .doc(theLoaiId),
      );
      await ref.update({ ...updateSachDto, ListTheLoaiRef: listTheLoaiRef });
    } else {
      await ref.update({ ...updateSachDto });
    }

    return await this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    await this.findOne(id);
    const ref = this.sachCollection.doc(id);
    await ref.delete();
    return true;
  }

  async increaseLuotDoc(idSach: string): Promise<void> {
    await this.sachCollection.doc(idSach).update({
      tongSoLuotDoc: FieldValue.increment(1),
    });
  }

  async increaseDanhGia(idSach: string, value: number): Promise<void> {
    await this.sachCollection.doc(idSach).update({
      tongSoDanhGia: FieldValue.increment(value),
    });
  }
}
