import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLichSuCaNhanDto } from './dto/create-lich-su-ca-nhan.dto';
import { UpdateLichSuCaNhanDto } from './dto/update-lich-su-ca-nhan.dto';
import { CollectionReference, DocumentData } from 'firebase-admin/firestore';
import { FirebaseRepository } from '../firebase/firebase.repository';
import { SachService } from '../sach/sach.service';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { FirebaseCollection } from '../firebase/firebase-collection.enum';
import { LichSuCaNhan } from './entities/lich-su-ca-nhan.entity';

@Injectable()
export class LichSuCaNhanService {
  private lichSuCaNhanColletion: CollectionReference<DocumentData>;
  constructor(
    private firebaseRepository: FirebaseRepository,
    private sachService: SachService,
  ) {
    this.lichSuCaNhanColletion = this.firebaseRepository.getCollection(
      FirebaseCollection.LichSuCaNhan,
    );
  }

  async docToLichSuCaNhan(doc: DocumentData): Promise<LichSuCaNhan> {
    return new LichSuCaNhan({
      id: doc.id,
      ...doc.data(),
    });
  }

  async create(
    createLichSuCaNhanDto: CreateLichSuCaNhanDto,
  ): Promise<LichSuCaNhan> {
    const lichSuCaNhan = await this.findByIdNguoiDungAndIdSach(
      createLichSuCaNhanDto.idNguoiDung,
      createLichSuCaNhanDto.idSach,
    );

    // Check if lichSuCaNhan exists
    if (lichSuCaNhan) {
      throw new BadRequestException(
        `Sách id ${createLichSuCaNhanDto.idSach} đã tồn tại trong lịch sử cá nhân của người dùng id ${createLichSuCaNhanDto.idNguoiDung}`,
      );
    }

    const ref = this.lichSuCaNhanColletion.doc();
    await ref.set({
      id: ref.id,
      idNguoiDung: createLichSuCaNhanDto.idNguoiDung,
      idSach: createLichSuCaNhanDto.idSach,
      thoiGianTruyCapCuoi: new Date(),
      soChuongDaDoc: 0,
    });

    return this.findOne(ref.id);
  }

  async findAll(): Promise<LichSuCaNhan[]> {
    const snapshot = await this.lichSuCaNhanColletion.get();
    return Promise.all(snapshot.docs.map((doc) => this.docToLichSuCaNhan(doc)));
  }

  async findOne(id: string): Promise<LichSuCaNhan> {
    const doc = await this.lichSuCaNhanColletion.doc(id).get();
    return this.docToLichSuCaNhan(doc);
  }

  async findByIdNguoiDungAndIdSach(idNguoiDung: string, idSach: string) {
    const query = this.lichSuCaNhanColletion
      .where('idNguoiDung', '==', idNguoiDung)
      .where('idSach', '==', idSach);
    const snapshot = await query.get();
    if (snapshot.empty) {
      return null;
    }
    return this.docToLichSuCaNhan(snapshot.docs[0]);
  }

  async updateOne(
    idNguoiDung: string,
    updateLichSuCaNhanDto: UpdateLichSuCaNhanDto,
  ): Promise<LichSuCaNhan> {
    const { idSach, soChuongDaDoc } = updateLichSuCaNhanDto;

    const lichSuCaNhan = await this.findByIdNguoiDungAndIdSach(
      idNguoiDung,
      idSach,
    );

    // update
    this.lichSuCaNhanColletion.doc(lichSuCaNhan.id).update({
      thoiGianTruyCapCuoi: new Date(),
      soChuongDaDoc,
    });

    return this.findOne(lichSuCaNhan.id);
  }

  // update(id: string, updateLichSuCaNhanDto: UpdateLichSuCaNhanDto) {
  //   return `This action updates a #${id} lichSuCaNhan`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} lichSuCaNhan`;
  // }
}
