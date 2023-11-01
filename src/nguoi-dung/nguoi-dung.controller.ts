import { Controller, Query, Get, Post, Put, Delete, Body, Param, UseInterceptors, UploadedFile, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiHeader, ApiBody, ApiTags, ApiConsumes, ApiQuery } from '@nestjs/swagger/dist/decorators';
import { NguoiDung } from '@prisma/client';
import { diskStorage } from 'multer';
import { HttpResponse } from 'src/configs/response';
import { File, FileUploadDto, NguoiDungDto } from './dto/nguoi-dung.dto';
import { NguoiDungService } from './nguoi-dung.service';

@ApiTags('NguoiDung')
@Controller('api/users')
export class NguoiDungController {
   constructor(
      private nguoiDungService: NguoiDungService
   ) { }

   @Get()
   layDanhSachNguoiDung(): Promise<HttpResponse<NguoiDung[]>> {
      return this.nguoiDungService.layDanhSachNguoiDung()
   }

   @Get('search')
   layDanhSachNguoiDungTimKiem(@Query('tenNguoiDung') tenNguoiDung: string): Promise<HttpResponse<NguoiDung[]>> {
      return this.nguoiDungService.layDanhSachNguoiDungTimKiem(tenNguoiDung)
   }

   @ApiQuery({name:'keyword', type: 'string', required: false})
   @Get('phan-tran-tim-kiem')
   layDanhSachNguoiDungPhanTrangTimKiem(@Query('pageIndex') pageIndex: string, @Query('pageSize') pageSize: string, @Query('keyword') keyword: string): Promise<HttpResponse<any>> {
      return this.nguoiDungService.layDanhSachNguoiDungPhanTrangTimKiem(+pageIndex, +pageSize, keyword)
   }

   @Get('/:id')
   layNguoiDungTheoId(@Param('id') id: string): Promise<HttpResponse<NguoiDung>> {
      return this.nguoiDungService.layNguoiDungTheoId(+id)
   }

   @ApiBody({ type: NguoiDungDto })
   @Post()
   themNguoiDung(@Body() body: NguoiDung): Promise<HttpResponse<NguoiDung>> {
      return this.nguoiDungService.themNguoiDung(body)
   }

   @Delete('/:id')
   xoaNguoiDung(@Param('id') id: string): Promise<HttpResponse<string>> {
      return this.nguoiDungService.xoaNguoiDung(+id)
   }

   @ApiBody({ type: NguoiDungDto })
   @Put('/:id')
   capNhatNguoiDung(@Param('id') id: string, @Body() body: NguoiDung): Promise<HttpResponse<NguoiDung>> {
      return this.nguoiDungService.capNhatNguoiDung(+id, body)
   }

   @ApiHeader({ name: 'token', required: true })
   @ApiConsumes('multipart/form-data')
   @ApiBody({ type: FileUploadDto })
   @UseGuards(AuthGuard('jwt'))
   @UseInterceptors(FileInterceptor('formFile', {
      storage: diskStorage({
         destination: 'public/images', // đường dẫn lưu file
         filename(req, file, callback) {
            callback(null, `${Date.now()}_${file.originalname}`)
         }, // đổi tên file
      })
   }))
   @Post('upload-avatar')
   uploadAvatar(@UploadedFile() file: File, @Req() req: any): Promise<HttpResponse<string>> {
      return this.nguoiDungService.uploadAvatar(file, req)
   }
}
