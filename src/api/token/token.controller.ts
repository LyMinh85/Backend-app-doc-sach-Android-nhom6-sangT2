import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { Token } from './entities/token.entity';
import { Query } from '@nestjs/common';
@Controller('api/token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('createTokenById/:token/userID/:id')
  createTokenById(@Param('token') token: string, @Param('id') id: string) {
    return this.tokenService.createTokenById(token, id);
  }

  @Post('createIDToken/:id')
  createIDToken(@Param('id') id: string): Promise<string> {
    return this.tokenService.createIDToken(id);
  }

  @Get('findAllTokens')
  async findAllTokens(): Promise<Token[]> {
    return this.tokenService.findAllTokens();
  }

  @Get('findAllTokenById/:id')
  async findAllTokenById(@Param('id') tokenID: string): Promise<Token[]> {
    return this.tokenService.findAllTokenById(tokenID);
  }

  @Delete('removeTokenById/:id')
  async removeTokenById(
    @Param('id') id: string,
    @Query('keys') keys: string[],
  ): Promise<void> {
    await this.tokenService.removeTokenById(id, keys);
  }

  @Delete('removeTokenByToken/:id/:token')
  async removeTokenByToken(
    @Param('id') id: string,
    @Param('token') token: string,
  ): Promise<void> {
    console.log(token + " " + id);
    await this.tokenService.removeTokenByToken(id, token);
  }
}
