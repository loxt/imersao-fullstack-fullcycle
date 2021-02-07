import { Controller, Get, Post } from '@nestjs/common';

@Controller('pix-keys')
export class PixKeyController {
  @Get()
  index() {}

  @Post()
  store() {}

  @Get('exists')
  exists() {}
}
