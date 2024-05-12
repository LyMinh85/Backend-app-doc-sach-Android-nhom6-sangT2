import { ApiProperty } from '@nestjs/swagger';
export class Token {
    @ApiProperty()
    token: string;
    @ApiProperty()
    key: string;
    constructor(source: Partial<Token>) {
        Object.assign(this, source);
      }
}
