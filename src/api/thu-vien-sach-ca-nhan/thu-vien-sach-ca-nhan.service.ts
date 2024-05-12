import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateThuVienSachCaNhanDto } from './dto/create-thu-vien-sach-ca-nhan.dto';
import { UpdateThuVienSachCaNhanDto } from './dto/update-thu-vien-sach-ca-nhan.dto';
import { FirebaseCollection } from '../firebase/firebase-collection.enum';
import { CollectionReference, DocumentData } from 'firebase-admin/firestore';
import { FirebaseRepository } from '../firebase/firebase.repository';
import { SachService } from '../sach/sach.service';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { ThuVienSachCaNhanDto } from './dto/thu-vien-sach-ca-nhan.dto';
import * as moment from 'moment';

@Injectable()
export class ThuVienSachCaNhanService {
  private thuVienSachCaNhanColletion: CollectionReference<DocumentData>;
  constructor(
    private firebaseRepository: FirebaseRepository,
    private sachService: SachService,
  ) {
    this.thuVienSachCaNhanColletion = this.firebaseRepository.getCollection(
      FirebaseCollection.ThuVienSachCaNhan,
    );
  }

  async toThuVienSachCaNhanDto(
    thuVienSachCaNhan: DocumentData,
  ): Promise<ThuVienSachCaNhanDto> {
    const sach = await this.sachService.findOne(thuVienSachCaNhan.idSach);
    return new ThuVienSachCaNhanDto({
      ...thuVienSachCaNhan,
      sach,
      ngayThem: moment(thuVienSachCaNhan.ngayThem.toDate()).format(
        'DD/MM/YYYY',
      ),
    });
  }

  async create(
    idNguoiDung: string,
    idSach: string,
    createThuVienSachCaNhanDto: CreateThuVienSachCaNhanDto,
  ): Promise<ThuVienSachCaNhanDto> {
    const thuVienSachCaNhan = await this.findByIdSachAndIdNguoiDung(
      idSach,
      idNguoiDung,
    );

    // if exist do not create
    // show error message
    if (thuVienSachCaNhan) {
      throw new BadRequestException(
        `ThuVienSachCaNhan with idSach ${idSach} and idNguoiDung ${idNguoiDung} already`,
      );
    }

    const ref = this.thuVienSachCaNhanColletion.doc();
    const id = ref.id;
    await ref.set({
      ...createThuVienSachCaNhanDto,
      idNguoiDung,
      idSach,
      ngayThem: new Date(),
      id,
    });

    return this.findOne(id);
  }

  async findAll(): Promise<ThuVienSachCaNhanDto[]> {
    const snapshot = await this.thuVienSachCaNhanColletion.get();
    return Promise.all(
      snapshot.docs.map((doc) => this.toThuVienSachCaNhanDto(doc.data())),
    );
  }

  async findOne(id: string): Promise<ThuVienSachCaNhanDto> {
    const doc = await this.thuVienSachCaNhanColletion.doc(id).get();
    if (!doc.exists) {
      throw new Error(`ThuVienSachCaNhan with id ${id} not found`);
    }
    return this.toThuVienSachCaNhanDto(doc.data());
  }

  async findByIdNguoiDung(
    idNguoiDung: string,
  ): Promise<ThuVienSachCaNhanDto[]> {
    const snapshot = await this.thuVienSachCaNhanColletion
      .where('idNguoiDung', '==', idNguoiDung)
      .get();
    return Promise.all(
      snapshot.docs.map((doc) => this.toThuVienSachCaNhanDto(doc.data())),
    );
  }

  async findByIdSachAndIdNguoiDung(
    idSach: string,
    idNguoiDung: string,
  ): Promise<ThuVienSachCaNhanDto> {
    const snapshot = await this.thuVienSachCaNhanColletion
      .where('idSach', '==', idSach)
      .where('idNguoiDung', '==', idNguoiDung)
      .get();
    if (snapshot.empty) {
      return null;
    }
    return this.toThuVienSachCaNhanDto(snapshot.docs[0].data());
  }

  async update(
    idNguoiDung: string,
    idSach: string,
    updateThuVienSachCaNhanDto: UpdateThuVienSachCaNhanDto,
  ): Promise<ThuVienSachCaNhanDto> {
    const thuVienSachCaNhan = await this.findByIdSachAndIdNguoiDung(
      idSach,
      idNguoiDung,
    );

    await this.thuVienSachCaNhanColletion.doc(thuVienSachCaNhan.id).update({
      ...updateThuVienSachCaNhanDto,
    });
    return this.findOne(thuVienSachCaNhan.id);
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.thuVienSachCaNhanColletion.doc(id).delete();
      return true;
    } catch (error) {
      return false;
    }
  }

  async removeByIdSachAndIdNguoiDung(
    idSach: string,
    idNguoiDung: string,
  ): Promise<boolean> {
    const thuVienSachCaNhan = await this.findByIdSachAndIdNguoiDung(
      idSach,
      idNguoiDung,
    );
    if (!thuVienSachCaNhan) {
      return false;
    }
    return await this.remove(thuVienSachCaNhan.id);
  }
}
