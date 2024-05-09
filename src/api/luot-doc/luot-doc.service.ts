import { Injectable } from '@nestjs/common';
import { CreateLuotDocDto } from './dto/create-luot-doc.dto';
import { UpdateLuotDocDto } from './dto/update-luot-doc.dto';
import {
  CollectionReference,
  DocumentData,
  DocumentSnapshot,
} from 'firebase-admin/firestore';
import { FirebaseRepository } from '../firebase/firebase.repository';
import { FirebaseCollection } from '../firebase/firebase-collection.enum';
import { LuotDocDTO } from './dto/luot-doc.dto';
import { SachService } from '../sach/sach.service';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { LuotDoc } from './entities/luot-doc.entity';

@Injectable()
export class LuotDocService {
  private luotDocCollection: CollectionReference<DocumentData>;
  constructor(
    private firebaseRepository: FirebaseRepository,
    private sachService: SachService,
    private nguoiDungService: NguoiDungService,
  ) {
    this.luotDocCollection = this.firebaseRepository.getCollection(
      FirebaseCollection.LuotDoc,
    );
  }

  // convert a document data to LuotDoc entity
  // also fetch the id of sach and nguoi dung
  async toNguoiDocDTO(
    doc: DocumentSnapshot<DocumentData, DocumentData>,
  ): Promise<LuotDocDTO> {
    const sachDto = await this.sachService.findOne(doc.data().idSach);
    const nguoiDung = await this.nguoiDungService.findOne(
      doc.data().idNguoiDung,
    );
    return new LuotDocDTO({
      id: doc.id,
      sachDto,
      nguoiDung,
    });
  }

  luotDocDTOtoLuotDoc(luotDocDTO: LuotDocDTO): LuotDoc {
    const luotDoc = new LuotDoc({
      id: luotDocDTO.id,
      idSach: luotDocDTO.sachDto.id,
      idNguoiDung: luotDocDTO.nguoiDung.id,
    });
    return luotDoc;
  }

  async create(createLuotDocDto: CreateLuotDocDto): Promise<LuotDoc> {
    // check if this book has been viewed by this user
    const alreadyRead = await this.findByIdSachAndIdNguoiDung(
      createLuotDocDto.idSach,
      createLuotDocDto.idNguoiDung,
    );
    // if the book has been viewed by this user
    // do not increase the number of views of the book
    if (alreadyRead) {
      return this.luotDocDTOtoLuotDoc(alreadyRead);
    }

    const ref = this.luotDocCollection.doc();
    const luotDoc = {
      id: ref.id,
      ...createLuotDocDto,
    };
    await ref.set(luotDoc);

    // increase the number of views of the book
    await this.sachService.increaseLuotDoc(luotDoc.idSach);

    return luotDoc;
  }

  async findAll(): Promise<LuotDocDTO[]> {
    const snapshot = await this.luotDocCollection.get();
    const luotDocs = snapshot.docs.map((doc) => this.toNguoiDocDTO(doc));
    return Promise.all(luotDocs);
  }

  async findOne(id: string): Promise<LuotDocDTO> {
    const doc = await this.luotDocCollection.doc(id).get();
    return this.toNguoiDocDTO(doc);
  }

  // find by sachId and nguoiDungId
  // only return the first record because there should be only one record
  async findByIdSachAndIdNguoiDung(
    idSach: string,
    idNguoiDung: string,
  ): Promise<LuotDocDTO> {
    const snapshot = await this.luotDocCollection
      .where('idSach', '==', idSach)
      .where('idNguoiDung', '==', idNguoiDung)
      .get();
    if (snapshot.empty) {
      return null;
    }
    return this.toNguoiDocDTO(snapshot.docs[0]);
  }

  async update(
    id: string,
    updateLuotDocDto: UpdateLuotDocDto,
  ): Promise<LuotDocDTO> {
    const ref = this.luotDocCollection.doc(id);
    await ref.update({ ...updateLuotDocDto });
    return await this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.luotDocCollection.doc(id).delete();
      return true;
    } catch (error) {
      return false;
    }
  }
}
