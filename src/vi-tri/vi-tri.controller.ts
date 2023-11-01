import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger/dist/decorators';
import { ViTri } from '@prisma/client';
import { diskStorage } from 'multer';
import { HttpResponse } from 'src/configs/response';
import { File, FileUploadDto, ViTriDto } from './dto/vi-tri.dto';
import { ViTriService } from './vi-tri.service';

@ApiTags('ViTri')
@Controller('api/vi-tri')
export class ViTriController {
   constructor(
      private viTriService: ViTriService
   ) { }

   @Get()
   layDanhSachViTri(): Promise<HttpResponse<ViTri[]>> {
      return this.viTriService.layDanhSachViTri()
   }

   @Get('search')
   layDanhSachViTriTimKiem(@Query('tenViTri') tenViTri: string): Promise<HttpResponse<ViTri[]>> {
      return this.viTriService.layDanhSachViTriTimKiem(tenViTri)
   }

   @ApiQuery({ name: 'keyword', type: 'string', required: false })
   @Get('phan-tran-tim-kiem')
   layDanhSachViTriPhanTrangTimKiem(@Query('pageIndex') pageIndex: string, @Query('pageSize') pageSize: string, @Query('keyword') keyword: string): Promise<HttpResponse<any>> {
      return this.viTriService.layDanhSachViTriPhanTrangTimKiem(+pageIndex, +pageSize, keyword)
   }

   @Get('/:id')
   layViTriTheoId(@Param('id') id: string): Promise<HttpResponse<ViTri>> {
      return this.viTriService.layViTriTheoId(+id)
   }

   @ApiHeader({ name: 'token', required: true })
   @ApiBody({ type: ViTriDto })
   @UseGuards(AuthGuard('jwt'))
   @Post()
   themViTri(@Req() req: any, @Body() body: ViTri): Promise<HttpResponse<ViTri>> {
      return this.viTriService.themViTri(req, body)
   }

   @ApiHeader({ name: 'token', required: true })
   @UseGuards(AuthGuard('jwt'))
   @Delete('/:id')
   xoaViTri(@Req() req: any, @Param('id') id: string): Promise<HttpResponse<string>> {
      return this.viTriService.xoaViTri(req, +id)
   }

   @ApiHeader({ name: 'token', required: true })
   @ApiBody({ type: ViTriDto })
   @UseGuards(AuthGuard('jwt'))
   @Put('/:id')
   capNhatViTri(@Req() req: any, @Param('id') id: string, @Body() body: ViTri): Promise<HttpResponse<ViTri>> {
      return this.viTriService.capNhatViTri(req, +id, body)
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
   @Post('upload-hinh-vitri/:id')
   uploadHinhViTri(@UploadedFile() file:File, @Req() req: any, @Param('id') id: string): Promise<HttpResponse<string>> {
      return this.viTriService.uploadHinhViTri(file, req, +id)
   }

}
