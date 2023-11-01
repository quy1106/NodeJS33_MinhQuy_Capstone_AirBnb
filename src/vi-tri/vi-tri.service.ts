import { Injectable } from '@nestjs/common';
import { failCode, HttpResponse, successCode } from 'src/configs/response';
import { ConfigService } from '@nestjs/config';
import { PrismaClient, ViTri } from '@prisma/client';
const prisma = new PrismaClient()
import * as fs from 'fs'
import { File } from './dto/vi-tri.dto';

@Injectable()
export class ViTriService {
   constructor(
      private config: ConfigService,
   ) { }

   async layDanhSachViTri(): Promise<HttpResponse<ViTri[]>> {
      const data = await prisma.viTri.findMany()
      data.forEach(viTri => {
         if (viTri.id > 8 && viTri.hinhAnh && viTri.hinhAnh.search(';base64,') === -1) {
            viTri.hinhAnh = `${this.config.get('DOMAIN')}/public/images/${viTri.hinhAnh}`
         }
      })
      return successCode(data)
   }

   async layDanhSachViTriTimKiem(tenViTri: string): Promise<HttpResponse<ViTri[]>> {
      const data = await prisma.viTri.findMany(
         { where: { tenViTri: { contains: `%${tenViTri}%` } } }
      )
      data.forEach(viTri => {
         if (viTri.id > 8 && viTri.hinhAnh && viTri.hinhAnh.search(';base64,') === -1) {
            viTri.hinhAnh = `${this.config.get('DOMAIN')}/public/images/${viTri.hinhAnh}`
         }
      })
      return successCode(data)
   }

   async layDanhSachViTriPhanTrangTimKiem(pageIndex: number, pageSize: number, keyword: string): Promise<HttpResponse<any>> {
      let data: ViTri[]
      if (keyword) {
         data = await prisma.viTri.findMany(
            { where: { tenViTri: { contains: `%${keyword}%` } } }
         )
      } else {
         data = await prisma.viTri.findMany()
      }
      data.forEach(viTri => {
         if (viTri.id > 8 && viTri.hinhAnh && viTri.hinhAnh.search(';base64,') === -1) {
            viTri.hinhAnh = `${this.config.get('DOMAIN')}/public/images/${viTri.hinhAnh}`
         }
      })
      const dataNew = data.slice(pageSize * (pageIndex - 1), pageSize * pageIndex)
      return successCode({
         pageIndex,
         pageSize,
         totalRow: data.length,
         keyword: keyword ? keyword : null,
         data: dataNew
      })
   }

   async layViTriTheoId(id: number): Promise<HttpResponse<ViTri>> {
      const data = await prisma.viTri.findFirst(
         { where: { id } }
      )
      if (data) {
         if (id > 8 && data.hinhAnh && data.hinhAnh.search(';base64,') === -1) {
            data.hinhAnh = `${this.config.get('DOMAIN')}/public/images/${data.hinhAnh}`
         }
         return successCode(data)
      } else {
         return failCode('Vị trí không tồn tại!')
      }
   }

   async themViTri(req: any, body: ViTri): Promise<HttpResponse<ViTri>> {
      if (req.user.role === 'ADMIN') {
         const { tenViTri, hinhAnh } = body
         const checkViTri = await prisma.viTri.findFirst(
            { where: { tenViTri } }
         )
         if (checkViTri) {
            return failCode('Tên vị trí đã tồn tại')
         } else {
            if (hinhAnh.search(';base64,') === -1) {
               delete body.hinhAnh
            }
            delete body.id
            const data = await prisma.viTri.create({ data: body })
            return successCode(data)
         }
      } else {
         return failCode('Không có quyền!')
      }
   }

   async xoaViTri(req: any, id: number): Promise<HttpResponse<string>> {
      if (id > 8 && req.user.role === 'ADMIN') {
         const data = await prisma.viTri.findFirst(
            { where: { id } }
         )
         if (data) {
            const check = fs.existsSync(process.cwd() + '/public/images/' + data.hinhAnh)
            if (check) {
               fs.unlinkSync(process.cwd() + '/public/images/' + data.hinhAnh)
            }
            await prisma.viTri.delete(
               { where: { id } }
            )
            return successCode('Xoá thành công!')
         } else {
            return failCode('Vị trí không tồn tại!')
         }
      } else {
         return failCode('Không có quyền!')
      }
   }

   async capNhatViTri(req: any, id: number, body: ViTri): Promise<HttpResponse<ViTri>> {
      if (id > 8 && req.user.role === 'ADMIN') {
         const { tenViTri, hinhAnh } = body
         const data = await prisma.viTri.findFirst(
            { where: { id } }
         )
         if (data) {
            const checkViTri = await prisma.viTri.findFirst(
               { where: { tenViTri } }
            )
            if (!checkViTri || data.tenViTri === tenViTri) {
               if (hinhAnh.search(';base64,') > 0) {
                  const check = fs.existsSync(process.cwd() + '/public/images/' + data.hinhAnh)
                  if (check) {
                     fs.unlinkSync(process.cwd() + '/public/images/' + data.hinhAnh)
                  }
               } else {
                  delete body.hinhAnh
               }
               delete body.id
               const dataNew = await prisma.viTri.update(
                  { data: body, where: { id } }
               )
               if (id > 8 && dataNew.hinhAnh && dataNew.hinhAnh.search(';base64,') === -1) {
                  dataNew.hinhAnh = `${this.config.get('DOMAIN')}/public/images/${dataNew.hinhAnh}`
               }
               return successCode(dataNew)
            } else {
               return failCode('Tên vị trí đã tồn tại!')
            }
         } else {
            return failCode('Vị trí không tồn tại!')
         }
      } else {
         return failCode('Không có quyền!')
      }
   }

   async uploadHinhViTri(file: File, req: any, id: number): Promise<HttpResponse<string>> {
      const { size, mimetype, filename } = file
      const viTri = await prisma.viTri.findFirst(
         { where: { id } }
      )
      if (id > 8 && req.user.role === 'ADMIN') {
         if (viTri) {
            if (mimetype == 'image/jpg' || mimetype == 'image/jpeg' || mimetype == 'image/gif' || mimetype == 'image/png') {
               if (size < 1000000) {
                  const filename = viTri.hinhAnh
                  // kiểm tra file đã có tồn tại trong /public/image/
                  const check = fs.existsSync(process.cwd() + '/public/images/' + filename)
                  if (check) {
                     fs.unlinkSync(process.cwd() + '/public/images/' + filename)
                  }
                  await prisma.viTri.update({
                     data: { hinhAnh: file.filename },
                     where: { id }
                  })
                  return successCode('Cập nhật hình vị trí thành công')
               } else {
                  fs.unlinkSync(process.cwd() + '/public/images/' + filename)
                  return failCode('Dung lượng ảnh phải nhỏ hơn 1MB')
               }
            } else {
               fs.unlinkSync(process.cwd() + '/public/images/' + filename)
               return failCode('Định dạng ảnh phải là jpg, jpeg, png, gif')
            }
         } else {
            fs.unlinkSync(process.cwd() + '/public/images/' + filename)
            return failCode('Vị trí không tồn tại')
         }
      } else {
         fs.unlinkSync(process.cwd() + '/public/images/' + filename)
         return failCode('Không có quyền!')
      }
   }
}

