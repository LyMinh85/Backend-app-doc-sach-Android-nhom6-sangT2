import { ApiProperty } from '@nestjs/swagger';
export class Notification {
    @ApiProperty()
    title: string;
    @ApiProperty()
    content: string;
    @ApiProperty()
    key: string;
    constructor(source: Partial<Notification>) {
      Object.assign(this, source);
    }
}
