import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger/dist/decorators';
import { NguoiDung } from '@prisma/client';
import { HttpResponse } from 'src/configs/response';
import { AuthService } from './auth.service';
import { DangKiDto, DangNhapDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
   constructor(
      private authServices: AuthService
   ) { }

   @ApiBody({ type: DangKiDto })
   @Post('signup')
   dangKi(@Body() body: NguoiDung): Promise<HttpResponse<NguoiDung>> {
      return this.authServices.dangKi(body)
   }

   @ApiBody({ type: DangNhapDto })
   @Post('signin')
   dangNhap(@Body() body: NguoiDung): Promise<HttpResponse<NguoiDung>> {
      return this.authServices.dangNhap(body)
   }

}
