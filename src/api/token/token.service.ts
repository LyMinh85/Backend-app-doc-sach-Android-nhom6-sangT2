import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { FirebaseCollection } from '../firebase/firebase-collection.enum';
import { FirebaseRepository } from '../firebase/firebase.repository';
import { Token } from './entities/token.entity';
import { FieldValue } from '@google-cloud/firestore';

@Injectable()
export class TokenService {

  private tokenCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor(private firebaseRepository: FirebaseRepository) {
    this.tokenCollection = this.firebaseRepository.getCollection(
      FirebaseCollection.Token,
    );
  }

  create(createTokenDto: CreateTokenDto) {
    return 'This action adds a new token';
  }

  findAll() {
    return `This action returns all token`;
  }

  async createIDToken(idUser: string): Promise<string> {
    const ref = this.tokenCollection.doc(idUser);
    await ref.set({});
    return ref.id;
  }

  async createTokenById(createTokenDto: CreateTokenDto, docId: string) {
    const snapshot = await this.tokenCollection.doc(docId).get();

    const data = snapshot.data();
    const keys = Object.keys(data);
    const lastKey = keys[keys.length - 1]; // Lấy giá trị key cuối cùng
    var lastKeyInt = parseInt(lastKey, 10); // Chuyển đổi lastKey sang kiểu số nguyên

    if (isNaN(lastKeyInt)) {
      lastKeyInt = -1;
    }

    const ref = this.tokenCollection.doc(docId);

    const tokenData = {

      [lastKeyInt + 1]: createTokenDto.token

    };

    await ref.update(tokenData);

    return 'This action adds a new notification';
  }

  async findAllTokenById(idUser: string): Promise<Token[]> {
    const snapshot = await this.tokenCollection.doc(idUser).get();
    const tokens: Token[] = [];


    const data = snapshot.data();

    for (const key in data) {

      const token = new Token({ token: data[key], key: key });

      tokens.push(token);
    }


    return tokens;
  }

  async findAllTokens(): Promise<Token[]> {
    const snapshot = await this.tokenCollection.get();
    const tokens: Token[] = [];
  
    snapshot.forEach((doc) => {
      const data = doc.data();
  
      for (const key in data) {
        const token = new Token({ token: data[key], key: key });
        tokens.push(token);
      }
    });
  
    return tokens;
  }

  async removeTokenById(docId: string, mapKeys: string[]): Promise<void> {
    const docRef = this.tokenCollection.doc(docId);

    const updateData = mapKeys.reduce((acc, key) => {
      acc[key] = FieldValue.delete();
      return acc;
    }, {});

    await docRef.update(updateData);
  }

  async removeTokenByToken(idUser: string, token: string): Promise<void> {
    const docRef = this.tokenCollection.doc(idUser);
    const snapshot = await docRef.get();
  
    if (snapshot.exists) {
      const data = snapshot.data();
  
      for (const key in data) {
        console.log(data[key])
        if (data[key] === token) {
          const updateData = {
            [key]: FieldValue.delete()
          };
  
          await docRef.update(updateData);
          break;
        }
      }
    }
  }
}
