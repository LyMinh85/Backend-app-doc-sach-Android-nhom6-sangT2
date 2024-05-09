import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDanhGiaDto } from './dto/create-danh-gia.dto';
import { UpdateDanhGiaDto } from './dto/update-danh-gia.dto';
import { FirebaseRepository } from '../firebase/firebase.repository';
import { SachService } from '../sach/sach.service';
import {
  CollectionReference,
  DocumentData,
  DocumentSnapshot,
} from 'firebase-admin/firestore';
import { FirebaseCollection } from '../firebase/firebase-collection.enum';
import { DanhGia } from './entities/danh-gia.entity';
import { DanhGiaDto } from './dto/danh-gia.dto';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';

@Injectable()
export class DanhGiaService {
  private danhGiaCollection: CollectionReference<DocumentData>;
  constructor(
    private firebaseRepository: FirebaseRepository,
    private sachService: SachService,
    private nguoiDungService: NguoiDungService,
  ) {
    this.danhGiaCollection = this.firebaseRepository.getCollection(
      FirebaseCollection.DanhGia,
    );
  }

  async docToDanhGiaDto(
    doc: DocumentSnapshot<DocumentData, DocumentData>,
  ): Promise<DanhGiaDto> {
    const nguoiDung = await this.nguoiDungService.findOne(
      doc.data().idNguoiDung,
    );
    return new DanhGiaDto({
      ...doc.data(),
      nguoiDung,
    });
  }

  async create(createDanhGiaDto: CreateDanhGiaDto): Promise<DanhGiaDto> {
    // Create danhGia
    const ref = this.danhGiaCollection.doc();
    const danhGia: DanhGia = {
      id: ref.id,
      ...createDanhGiaDto,
      ngayTao: new Date(),
    };
    const doc = await ref.set(danhGia);

    // Increase danhGia count of sach
    await this.sachService.increaseDanhGia(createDanhGiaDto.idSach, 1);

    return this.findOne(ref.id);
  }

  async findAll(): Promise<DanhGiaDto[]> {
    const snapshot = await this.danhGiaCollection.get();
    return Promise.all(
      snapshot.docs.map(async (doc) => this.docToDanhGiaDto(doc)),
    );
  }

  async findOne(id: string): Promise<DanhGiaDto> {
    const doc = await this.danhGiaCollection.doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`DanhGia with ID ${id} not found`);
    }
    return this.docToDanhGiaDto(doc);
  }

  async update(
    id: string,
    updateDanhGiaDto: UpdateDanhGiaDto,
  ): Promise<DanhGiaDto> {
    await this.danhGiaCollection.doc(id).update({
      ...updateDanhGiaDto,
    });
    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    try {
      const danhGia = await this.findOne(id);
      await this.danhGiaCollection.doc(id).delete();
      await this.sachService.increaseDanhGia(danhGia.idSach, -1);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
