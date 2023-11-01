import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { failCode, HttpResponse, successCode } from 'src/configs/response';
import { JwtService } from '@nestjs/jwt';
import { NguoiDung, PrismaClient } from '@prisma/client'
import * as moment from 'moment';
const prisma = new PrismaClient()

@Injectable()
export class AuthService {
   constructor(
      private config: ConfigService,
      private jwt: JwtService
   ) { }

   async dangKi(body: NguoiDung): Promise<HttpResponse<NguoiDung>> {
      const { email } = body
      const checkEmail = await prisma.nguoiDung.findFirst(
         { where: { email } }
      )
      if (checkEmail) {
         return failCode('Email đã tồn tại')
      } else {
         delete body.id
         body.role = 'USER'
         const data = await prisma.nguoiDung.create({ data: body })
         data.birthday = moment(data.birthday).format('DD/MM/YYYY')
         return successCode(data)
      }
   }

   async dangNhap(body: NguoiDung): Promise<HttpResponse<NguoiDung>> {
      const { email, password } = body
      const data = await prisma.nguoiDung.findFirst(
         { where: { email } }
      )
      if (data) {
         if (data.password === password) {
            data.password = ''
            data.avatar = null
            const token = this.jwt.sign(data, { expiresIn: '1y', secret: this.config.get('SECRET_KEY') })
            return successCode({ user: data, token })
         } else {
            failCode('Mật khẩu không đúng')
         }
      } else {
         failCode('Email không đúng')
      }
   }
}
