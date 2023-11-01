import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger/dist/decorators';
import { Phong } from '@prisma/client';
import { diskStorage } from 'multer';
import { HttpResponse } from 'src/configs/response';
import { File, FileUploadDto, PhongThueDto } from './dto/phong-thue.dto';
import { PhongThueService } from './phong-thue.service';

@ApiTags('Phong')
@Controller('api/phong-thue')
export class PhongThueController {
   constructor(
      private phongThueService: PhongThueService
   ) { }

   @Get()
   layDanhSachPhongThue(): Promise<HttpResponse<Phong[]>> {
      return this.phongThueService.layDanhSachPhongThue()
   }

   @Get('search')
   layDanhSachPhongThueTimKiem(@Query('tenPhongThue') tenPhongThue: string): Promise<HttpResponse<Phong[]>> {
      return this.phongThueService.layDanhSachPhongThueTimKiem(tenPhongThue)
   }

   @ApiQuery({ name: 'keyword', type: 'string', required: false })
   @Get('phan-tran-tim-kiem')
   layDanhSachPhongThuePhanTrangTimKiem(@Query('pageIndex') pageIndex: string, @Query('pageSize') pageSize: string, @Query('keyword') keyword: string | null): Promise<HttpResponse<any>> {
      return this.phongThueService.layDanhSachPhongThuePhanTrangTimKiem(+pageIndex, +pageSize, keyword)
   }

   @Get('lay-phong-theo-vi-tri/:maViTri')
   layDanhSachPhongThueTheoViTri(@Param('maViTri') maViTri: string): Promise<HttpResponse<Phong[]>> {
      return this.phongThueService.layDanhSachPhongThueTheoViTri(+maViTri)
   }

   @Get('/:id')
   layPhongThueTheoId(@Param('id') id: string): Promise<HttpResponse<Phong>> {
      return this.phongThueService.layPhongThueTheoId(+id)
   }

   @ApiHeader({ name: 'token', required: true })
   @ApiBody({ type: PhongThueDto })
   @UseGuards(AuthGuard('jwt'))
   @Post()
   themPhongThue(@Req() req: any, @Body() body: Phong): Promise<HttpResponse<Phong>> {
      return this.phongThueService.themPhongThue(req, body)
   }

   @ApiHeader({ name: 'token', required: true })
   @UseGuards(AuthGuard('jwt'))
   @Delete('/:id')
   xoaPhongThue(@Req() req: any, @Param('id') id: string): Promise<HttpResponse<string>> {
      return this.phongThueService.xoaPhongThue(req, +id)
   }

   @ApiHeader({ name: 'token', required: true })
   @ApiBody({ type: PhongThueDto })
   @UseGuards(AuthGuard('jwt'))
   @Put('/:id')
   capNhatPhongThue(@Req() req: any, @Param('id') id: string, @Body() body: Phong): Promise<HttpResponse<Phong>> {
      return this.phongThueService.capNhatPhongThue(req, +id, body)
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
   @Post('upload-hinh-phong/:id')
   uploadHinhPhongThue(@UploadedFile() file: File, @Req() req: any, @Param('id') id: string): Promise<HttpResponse<string>> {
      return this.phongThueService.uploadHinhPhongThue(file, req, +id)
   }
}
