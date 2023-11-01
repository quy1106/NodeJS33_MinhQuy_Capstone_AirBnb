import { ApiProperty } from "@nestjs/swagger"

export interface File {
   fieldname: string,
   originalname: string,
   encoding: string,
   mimetype: string,
   destination: string,
   filename: string,
   path: string,
   size: number
}

export class PhongThueDto {
   @ApiProperty({ description: "tenPhong", type: String })
   tenPhong: string;
   @ApiProperty({ description: "khach", type: Number })
   khach: number;
   @ApiProperty({ description: "phongNgu", type: Number })
   phongNgu: number;
   @ApiProperty({ description: "giuong", type: Number })
   giuong: number;
   @ApiProperty({ description: "phongTam", type: Number })
   phongTam: number;
   @ApiProperty({ description: "moTa", type: String })
   moTa: string | null;
   @ApiProperty({ description: "giaTien", type: Number })
   giaTien: number;
   @ApiProperty({ description: "mayGiat", type: Boolean })
   mayGiat: boolean;
   @ApiProperty({ description: "banLa", type: Boolean })
   banLa: boolean;
   @ApiProperty({ description: "tivi", type: Boolean })
   tivi: boolean;
   @ApiProperty({ description: "dieuHoa", type: Boolean })
   dieuHoa: boolean;
   @ApiProperty({ description: "wifi", type: Boolean })
   wifi: boolean;
   @ApiProperty({ description: "bep", type: Boolean })
   bep: boolean;
   @ApiProperty({ description: "doXe", type: Boolean })
   doXe: boolean;
   @ApiProperty({ description: "hoBoi", type: Boolean })
   hoBoi: boolean;
   @ApiProperty({ description: "banUi", type: Boolean })
   banUi: boolean;
   @ApiProperty({ description: "maViTri", type: Number })
   maViTri: number;
   @ApiProperty({ description: "hinhAnh", type: String })
   hinhAnh: string | null;
}

export class FileUploadDto {
   @ApiProperty({ name: 'formFile', type: 'string', format: 'binary' })
   file: any;
}