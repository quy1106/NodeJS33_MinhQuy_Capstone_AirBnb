import { Injectable } from '@nestjs/common';
import { failCode, HttpResponse, successCode } from 'src/configs/response';
import { NguoiDung, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import * as fs from 'fs'
import { File } from './dto/nguoi-dung.dto';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';

@Injectable()
export class NguoiDungService {
   constructor(
      private config: ConfigService,
   ) { }

   async layDanhSachNguoiDung(): Promise<HttpResponse<NguoiDung[]>> {
      const data = await prisma.nguoiDung.findMany()
      data.forEach(nguoiDung => {
         if (nguoiDung.avatar && nguoiDung.id !== 1) {
            nguoiDung.avatar = `${this.config.get('DOMAIN')}/public/images/${nguoiDung.avatar}`
         }
         nguoiDung.birthday = moment(nguoiDung.birthday).format('DD/MM/YYYY')
      })
      return successCode(data)
   }

   async layDanhSachNguoiDungTimKiem(tenNguoiDung: string): Promise<HttpResponse<NguoiDung[]>> {
      const data = await prisma.nguoiDung.findMany(
         { where: { name: { contains: `%${tenNguoiDung}%` } } }
      )
      data.forEach(nguoiDung => {
         if (nguoiDung.avatar && nguoiDung.id !== 1) {
            nguoiDung.avatar = `${this.config.get('DOMAIN')}/public/images/${nguoiDung.avatar}`
         }
         nguoiDung.birthday = moment(nguoiDung.birthday).format('DD/MM/YYYY')
      })
      return successCode(data)
   }

   async layDanhSachNguoiDungPhanTrangTimKiem(pageIndex: number, pageSize: number, keyword: string): Promise<HttpResponse<any>> {
      let data: NguoiDung[]
      if (keyword) {
         data = await prisma.nguoiDung.findMany(
            { where: { name: { contains: `%${keyword}%` } } }
         )
      } else {
         data = await prisma.nguoiDung.findMany()
      }
      data.forEach(nguoiDung => {
         if (nguoiDung.avatar && nguoiDung.id !== 1) {
            nguoiDung.avatar = `${this.config.get('DOMAIN')}/public/images/${nguoiDung.avatar}`
         }
         nguoiDung.birthday = moment(nguoiDung.birthday).format('DD/MM/YYYY')
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

   async layNguoiDungTheoId(id: number): Promise<HttpResponse<NguoiDung>> {
      const data = await prisma.nguoiDung.findFirst(
         { where: { id } }
      )
      if (data) {
         if (id > 1 && data.avatar) {
            data.avatar = `${this.config.get('DOMAIN')}/public/images/${data.avatar}`
         }
         data.birthday = moment(data.birthday).format('DD/MM/YYYY')
         return successCode(data)
      } else {
         return failCode('Người dùng không tồn tại!')
      }
   }

   async themNguoiDung(body: NguoiDung): Promise<HttpResponse<NguoiDung>> {
      const { email } = body
      const checkEmail = await prisma.nguoiDung.findFirst(
         { where: { email } }
      )
      if (checkEmail) {
         return failCode('Email đã tồn tại!')
      } else {
         if (body.role !== 'ADMIN' && body.role !== 'USER') {
            return failCode('Role không hợp lệ!')
         } else {
            delete body.id
            const data = await prisma.nguoiDung.create({ data: body })
            data.birthday = moment(data.birthday).format('DD/MM/YYYY')
            return successCode(data)
         }
      }
   }

   async xoaNguoiDung(id: number): Promise<HttpResponse<string>> {
      if (id > 1) {
         const data = await prisma.nguoiDung.findFirst(
            { where: { id } }
         )
         if (data) {
            await prisma.nguoiDung.delete(
               { where: { id } }
            )
            const check = fs.existsSync(process.cwd() + '/public/images/' + data.avatar)
            if (check) {
               fs.unlinkSync(process.cwd() + '/public/images/' + data.avatar)
            }
            return successCode('Xoá thành công!')
         } else {
            return failCode('Người dùng không tồn tại!')
         }
      } else {
         return failCode('Không có quyền!')
      }
   }

   async capNhatNguoiDung(id: number, body: NguoiDung): Promise<HttpResponse<NguoiDung>> {
      if (id > 1) {
         const { email } = body
         const data = await prisma.nguoiDung.findFirst(
            { where: { id } }
         )
         if (data) {
            const checkEmail = await prisma.nguoiDung.findFirst(
               { where: { email } }
            )
            if (!checkEmail || data.email === email) {
               if (body.role !== 'ADMIN' && body.role !== 'USER') {
                  return failCode('Role không hợp lệ!')
               } else {
                  delete body.id
                  const dataNew = await prisma.nguoiDung.update(
                     { data: body, where: { id } }
                  )
                  delete dataNew.avatar
                  dataNew.birthday = moment(dataNew.birthday).format('DD/MM/YYYY')
                  return successCode(dataNew)
               }
            } else {
               return failCode('Email đã tồn tại!')
            }
         } else {
            return failCode('Người dùng không tồn tại!')
         }
      } else {
         return failCode('Không có quyền!')
      }
   }

   async uploadAvatar(file: File, req: any): Promise<HttpResponse<string>> {
      const { size, mimetype, filename } = file
      const { id } = req.user
      if (id > 1) {
         if (mimetype == 'image/jpg' || mimetype == 'image/jpeg' || mimetype == 'image/gif' || mimetype == 'image/png') {
            if (size < 1000000) {
               const nguoiDung = await prisma.nguoiDung.findFirst(
                  { where: { id } }
               )
               const filename = nguoiDung.avatar
               // kiểm tra file đã có tồn tại trong /public/image/
               const check = fs.existsSync(process.cwd() + '/public/images/' + filename)
               if (check) {
                  fs.unlinkSync(process.cwd() + '/public/images/' + filename)
               }
               await prisma.nguoiDung.update({
                  data: { avatar: file.filename },
                  where: { id }
               })
               return successCode('Cập nhật avatar thành công!')
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
         return failCode('Không có quyền!')
      }
   }
}
