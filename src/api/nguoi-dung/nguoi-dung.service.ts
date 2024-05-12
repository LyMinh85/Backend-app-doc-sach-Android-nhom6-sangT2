import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNguoiDungDto } from './dto/create-nguoi-dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi-dung.dto';
import { FirebaseRepository } from '../firebase/firebase.repository';
import { NguoiDung } from './entities/nguoi-dung.entity';
import { FirebaseCollection } from '../firebase/firebase-collection.enum';
import { LoginPasswordEmailDto } from './dto/login-password-email.dto';
import { LoginByGoogleDto } from './dto/login-by-google.dto';

@Injectable()
export class NguoiDungService {
  private nguoiDungCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  constructor(private firebaseRepository: FirebaseRepository) {
    this.nguoiDungCollection = this.firebaseRepository.getCollection(
      FirebaseCollection.NguoiDung,
    );
  }

  async create(createNguoiDungDto: CreateNguoiDungDto): Promise<NguoiDung> {
    const ref = this.nguoiDungCollection.doc(createNguoiDungDto.uuid);
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

  async login(
    loginPasswordEmailDto: LoginPasswordEmailDto,
  ): Promise<NguoiDung> {
    const { email, matKhau } = loginPasswordEmailDto;
    const snapshot = await this.nguoiDungCollection
      .where('email', '==', email)
      .where('matKhau', '==', matKhau)
      .get();
    if (snapshot.empty) {
      throw new NotFoundException('Email hoặc mật khẩu không đúng');
    }
    const doc = snapshot.docs[0];
    return new NguoiDung({ id: doc.id, ...doc.data() });
  }

  async loginGoogle(loginByGoogleDto: LoginByGoogleDto): Promise<NguoiDung> {
    const { googleId } = loginByGoogleDto;
    const snapshot = await this.nguoiDungCollection
      .where('googleId', '==', googleId)
      .get();
    if (snapshot.empty) {
      throw new NotFoundException(
        'Không tìm thấy người dùng với tài khoản google này',
      );
    }
    const doc = snapshot.docs[0];
    return new NguoiDung({ id: doc.id, ...doc.data() });
  }
}
