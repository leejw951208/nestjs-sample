import { Controller, Get } from '@nestjs/common';

@Controller('sample')
export class SampleController {
  @Get('/')
  async getSample() {
    return 'sample';
  }
}
