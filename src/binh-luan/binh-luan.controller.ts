import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger/dist';
import { BinhLuan } from '@prisma/client';
import { HttpResponse } from 'src/configs/response';
import { BinhLuanService } from './binh-luan.service';
import { BinhLuanDto } from './dto/binh-luan.dto';

@ApiTags('BinhLuan')
@Controller('api/binh-luan')
export class BinhLuanController {
   constructor(
      private binhLuanService: BinhLuanService
   ) { }

   @Get()
   layDanhSachBinhLuan(): Promise<HttpResponse<BinhLuan[]>> {
      return this.binhLuanService.layDanhSachBinhLuan()
   }
   
   @Get('lay-binh-luan-theo-phong/:maPhong')
   layDanhSachBinhLuanTheoMaPhong(@Param('maPhong') maPhong:string): Promise<HttpResponse<any>> {
      return this.binhLuanService.layDanhSachBinhLuanTheoMaPhong(+maPhong)
   }

   @ApiHeader({ name: 'token', required: true })
   @ApiBody({ type: BinhLuanDto })
   @UseGuards(AuthGuard('jwt'))
   @Post()
   themBinhLuan(@Req() req: any, @Body() body: BinhLuan): Promise<HttpResponse<BinhLuan>> {
      return this.binhLuanService.themBinhLuan(req, body)
   }

   @ApiHeader({ name: 'token', required: true })
   @UseGuards(AuthGuard('jwt'))
   @Delete('/:id')
   xoaBinhLuan(@Req() req: any, @Param('id') id: string): Promise<HttpResponse<string>> {
      return this.binhLuanService.xoaBinhLuan(req, +id)
   }

   @ApiHeader({ name: 'token', required: true })
   @ApiBody({ type: BinhLuanDto })
   @UseGuards(AuthGuard('jwt'))
   @Put('/:id')
   capNhatBinhLuan(@Req() req: any, @Param('id') id: string, @Body() body: BinhLuan): Promise<HttpResponse<BinhLuan>> {
      return this.binhLuanService.capNhatBinhLuan(req, +id, body)
   }
}
