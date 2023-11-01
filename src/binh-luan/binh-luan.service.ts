import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BinhLuan, PrismaClient } from '@prisma/client';
import * as moment from 'moment';
import { failCode, HttpResponse, successCode } from 'src/configs/response';
const prisma = new PrismaClient()

@Injectable()
export class BinhLuanService {
   constructor(
      private config: ConfigService,
   ) { }

   async layDanhSachBinhLuan(): Promise<HttpResponse<BinhLuan[]>> {
      const data = await prisma.binhLuan.findMany()
      data.forEach(binhLuan => {
         binhLuan.ngayBinhLuan = moment(binhLuan.ngayBinhLuan).format('DD/MM/YYYY')
      })
      return successCode(data)
   }

   async layDanhSachBinhLuanTheoMaPhong(id: number): Promise<HttpResponse<any>> {
      const data = await prisma.phong.findFirst(
         { where: { id }, include: { BinhLuan: { include: { NguoiDung: true } } } }
      )
      if (data) {
         const danhSachBinhLuan = data.BinhLuan.map(binhLuan => {
            return {
               ngayBinhLuan: moment(binhLuan.ngayBinhLuan).format('DD/MM/YYYY'),
               noiDung: binhLuan.noiDung,
               saoBinhLuan: binhLuan.saoBinhLuan,
               tenNguoiBinhLuan: binhLuan.NguoiDung.name,
               avatar: (binhLuan.NguoiDung.avatar && binhLuan.NguoiDung.id > 1) ? `${this.config.get('DOMAIN')}/public/images/${binhLuan.NguoiDung.avatar}` : binhLuan.NguoiDung.avatar
            }
         })
         return successCode(danhSachBinhLuan)
      } else {
         return failCode('Phòng thuê không tồn tại!')
      }
   }

   async themBinhLuan(req: any, body: BinhLuan): Promise<HttpResponse<BinhLuan>> {
      delete body.id
      body.maNguoiBinhLuan = req.user.id
      const data = await prisma.binhLuan.create(
         { data: body }
      )
      data.ngayBinhLuan = moment(data.ngayBinhLuan).format('DD/MM/YYYY')
      return successCode(data)
   }

   async xoaBinhLuan(req: any, id: number): Promise<HttpResponse<string>> {
      const data = await prisma.binhLuan.findFirst(
         { where: { id } }
      )
      if (data) {
         if (req.user.role === 'ADMIN') {
            await prisma.binhLuan.delete(
               { where: { id } }
            )
            return successCode('Xoá thành công!')
         } else {
            if (data.maNguoiBinhLuan == req.user.id) {
               await prisma.binhLuan.delete(
                  { where: { id } }
               )
               return successCode('Xoá thành công!')
            } else {
               failCode('Không có quyền!')
            }
         }
         return successCode(data)
      } else {
         return failCode('Bình luận không tồn tại!')
      }
   }

   async capNhatBinhLuan(req: any, id: number, body: BinhLuan): Promise<HttpResponse<BinhLuan>> {
      const data = await prisma.binhLuan.findFirst(
         { where: { id } }
      )
      if (data) {
         delete body.id
         if (req.user.role === 'ADMIN') {
            body.maPhong = data.maPhong
            body.maNguoiBinhLuan = data.maNguoiBinhLuan
            const dataNew = await prisma.binhLuan.update(
               { data: body, where: { id } }
            )
            dataNew.ngayBinhLuan = moment(dataNew.ngayBinhLuan).format('DD/MM/YYYY')
            return successCode(dataNew)
         } else {
            if (data.maNguoiBinhLuan == req.user.id) {
               body.maPhong = data.maPhong
               body.maNguoiBinhLuan = data.maNguoiBinhLuan
               const dataNew = await prisma.binhLuan.update(
                  { data: body, where: { id } }
               )
               dataNew.ngayBinhLuan = moment(dataNew.ngayBinhLuan).format('DD/MM/YYYY')
               return successCode(dataNew)
            } else {
               return failCode('Không có quyền!')
            }
         }
      } else {
         return failCode('Bình luận không tồn tại!')
      }
   }
}
