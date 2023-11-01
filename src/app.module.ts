import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { NguoiDungModule } from './nguoi-dung/nguoi-dung.module';
import { ViTriModule } from './vi-tri/vi-tri.module';
import { PhongThueModule } from './phong-thue/phong-thue.module';
import { BinhLuanModule } from './binh-luan/binh-luan.module';
import { DatPhongModule } from './dat-phong/dat-phong.module';

@Module({
   imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, NguoiDungModule, ViTriModule, PhongThueModule, BinhLuanModule, DatPhongModule],
   controllers: [],
   providers: [],
})
export class AppModule { }
