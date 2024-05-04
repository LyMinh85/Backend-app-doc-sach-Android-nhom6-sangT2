import { Injectable } from '@nestjs/common';
import { CreateSachDto } from './dto/create-sach.dto';
import { UpdateSachDto } from './dto/update-sach.dto';
import { FirebaseRepository } from '../firebase/firebase.repository';
import { Sach } from './entities/sach.entity';
import { SachQueryParams } from './interface/sach-query-params.interface';
import { TheLoaiSachService } from '../the-loai-sach/the-loai-sach.service';
import { FirebaseCollection } from '../firebase/firebase-collection.enum';
import { TheLoaiSach } from '../the-loai-sach/entities/the-loai-sach.entity';
import { SachDto } from './dto/sach.dto';

@Injectable()
export class SachService {
  private sachCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  private COLLECTION_NAME = 'Sach';

  constructor(private firebaseRepository: FirebaseRepository) {
    this.sachCollection = this.firebaseRepository.getCollection(
      this.COLLECTION_NAME,
    );
  }

  async create(createSachDto: CreateSachDto): Promise<Sach> {
    const ref = this.sachCollection.doc();
    const ListTheLoaiId = createSachDto.ListTheLoaiId;
    // remove ListTheLoaiId from createSachDto
    delete createSachDto.ListTheLoaiId;
    const listTheLoaiRef = ListTheLoaiId.map((theLoaiId) =>
      this.firebaseRepository
        .getCollection(FirebaseCollection.TheLoai)
        .doc(theLoaiId),
    );
    const sach = new Sach({
      id: ref.id,
      ...createSachDto,
      ListTheLoaiRef: listTheLoaiRef,
    });
    await ref.set({ ...sach });
    return sach;
  }

  async findAll(sachQueryParams: SachQueryParams): Promise<SachDto[]> {
    const { TenSach, NhaXuatBan } = sachQueryParams;
    let query = this.firebaseRepository.getQuery(this.COLLECTION_NAME);

    if (TenSach) {
      query = query.where('TenSach', '==', TenSach);
    }

    if (NhaXuatBan) {
      query = query.where('NhaXuatBan', '==', NhaXuatBan);
    }

    const snapshot = await query.get();
    const sachList: SachDto[] = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const sach = new SachDto({ id: doc.id, ...doc.data() });
        console.log(sach);
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
        return sach;
      }),
    );
    return sachList;
  }

  async findOne(id: string): Promise<SachDto> {
    const snapshot = await this.sachCollection.doc(id).get();
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
    }

    await ref.update({ ...updateSachDto, ListTheLoaiRef: listTheLoaiRef });
    return await this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.sachCollection.doc(id).delete();
      return true;
    } catch (error) {
      return false;
    }
  }
}
