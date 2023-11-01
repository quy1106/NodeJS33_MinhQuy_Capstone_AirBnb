import { Injectable } from '@nestjs/common';
import { DatPhong, PrismaClient, } from '@prisma/client';
import { failCode, HttpResponse, successCode } from 'src/configs/response';
const prisma = new PrismaClient()

@Injectable()
export class DatPhongService {

   async layDanhSachDatPhong(): Promise<HttpResponse<DatPhong[]>> {
      const data = await prisma.datPhong.findMany()
      return successCode(data)
   }

   async layDatPhongTheoId(id: number): Promise<HttpResponse<DatPhong>> {
      const data = await prisma.datPhong.findFirst(
         { where: { id } }
      )
      if (data) {
         return successCode(data)
      } else {
         return failCode('Đặt phòng không tồn tại!')
      }
   }

   async layDatPhongTheoMaNguoiDung(id: number): Promise<HttpResponse<DatPhong[]>> {
      const data = await prisma.nguoiDung.findFirst(
         { where: { id }, include: { DatPhong: true } }
      )
      if (data) {
         return successCode(data.DatPhong)
      } else {
         return failCode('Người dùng không tồn tại!')
      }
   }

   async themDatPhong(body: DatPhong): Promise<HttpResponse<DatPhong>> {
      const { maPhong, soLuongKhach } = body
      const phongThue = await prisma.phong.findFirst(
         { where: { id: maPhong } }
      )
      if (soLuongKhach <= phongThue.khach) {
         delete body.id
         const data = await prisma.datPhong.create(
            { data: body }
         )
         return successCode(data)
      } else {
         failCode(`Số lượng khách tối đa là ${phongThue.khach}`)
      }
   }

   async xoaDatPhong(id: number): Promise<HttpResponse<string>> {
      const data = await prisma.datPhong.findFirst(
         { where: { id } }
      )
      if (data) {
         await prisma.datPhong.delete(
            { where: { id } }
         )
         return successCode('Xoá thành công!')
      } else {
         return failCode('Đặt phòng không tồn tại!')
      }
   }

   async capNhatDatPhong(id: number, body: DatPhong): Promise<HttpResponse<DatPhong>> {
      const { maPhong, soLuongKhach } = body
      const phongThue = await prisma.phong.findFirst(
         { where: { id: maPhong } }
      )
      const data = await prisma.datPhong.findFirst(
         { where: { id } }
      )
      if (data) {
         if (soLuongKhach <= phongThue.khach) {
            delete body.id
            body.maNguoiDung = data.maNguoiDung
            const dataNew = await prisma.datPhong.update(
               { data: body, where: { id } }
            )
            return successCode(dataNew)
         } else {
            failCode(`Số lượng khách tối đa là ${phongThue.khach}`)
         }
      } else {
         return failCode('Đặt phòng không tồn tại!')
      }
   }
}
