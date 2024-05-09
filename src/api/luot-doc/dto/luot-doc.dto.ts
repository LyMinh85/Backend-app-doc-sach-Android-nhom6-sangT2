import { NguoiDung } from 'src/api/nguoi-dung/entities/nguoi-dung.entity';
import { SachDto } from 'src/api/sach/dto/sach.dto';

export class LuotDocDTO {
  id: string;
  sachDto: SachDto;
  nguoiDung: NguoiDung;
  constructor(luotDoc: Partial<LuotDocDTO>) {
    this.id = luotDoc.id;
    this.sachDto = luotDoc.sachDto;
    this.nguoiDung = luotDoc.nguoiDung;
  }
}
