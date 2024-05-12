import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SachService } from './api/sach/sach.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private sachService: SachService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  async test() {
    const listSach = await this.sachService.findAll({});
    console.log(listSach);
    listSach.forEach(async (sach) => {
      this.sachService.update(sach.id, {
        idNguoiDung: 'fYw3HzyQGqdME6zPzDF6YSXPtPu1',
      });
    });
  }
}
