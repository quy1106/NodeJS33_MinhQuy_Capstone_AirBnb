import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger/dist/decorators';
import { DatPhong } from '@prisma/client';
import { HttpResponse } from 'src/configs/response';
import { DatPhongService } from './dat-phong.service';
import { DatPhongDto } from './dto/dat-phong.dto';

@ApiTags('DatPhong')
@Controller('api/dat-phong')
export class DatPhongController {
   constructor(
      private datPhongService: DatPhongService
   ) { }

   @Get()
   layDanhSachDatPhong(): Promise<HttpResponse<DatPhong[]>> {
      return this.datPhongService.layDanhSachDatPhong()
   }

   @Get(':id')
   layDatPhongTheoId(@Param('id') id: string): Promise<HttpResponse<DatPhong>> {
      return this.datPhongService.layDatPhongTheoId(+id)
   }

   @Get('lay-theo-nguoi-dung/:maNguoiDung')
   layDatPhongTheoMaNguoiDung(@Param('maNguoiDung') maNguoiDung: string): Promise<HttpResponse<DatPhong[]>> {
      return this.datPhongService.layDatPhongTheoMaNguoiDung(+maNguoiDung)
   }

   @ApiBody({ type: DatPhongDto })
   @Post()
   themDatPhong(@Body() body: DatPhong): Promise<HttpResponse<DatPhong>> {
      return this.datPhongService.themDatPhong(body)
   }

   @Delete(':id')
   xoaDatPhong(@Param('id') id: string): Promise<HttpResponse<string>> {
      return this.datPhongService.xoaDatPhong(+id)
   }

   @ApiBody({ type: DatPhongDto })
   @Put(':id')
   capNhatDatPhong(@Param('id') id: string, @Body() body: DatPhong): Promise<HttpResponse<DatPhong>> {
      return this.datPhongService.capNhatDatPhong(+id, body)
   }
}
