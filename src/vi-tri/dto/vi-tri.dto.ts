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

export class ViTriDto{
   @ApiProperty({ description: "tenViTri", type: String })
   tenViTri: string;
   @ApiProperty({ description: "tinhThanh", type: String })
   tinhThanh: string;
   @ApiProperty({ description: "quocGia", type: String })
   quocGia: string;
   @ApiProperty({ description: "hinhAnh", type: String })
   hinhAnh: string | null
}

export class FileUploadDto {
   @ApiProperty({ name: 'formFile', type: 'string', format: 'binary' })
   file: any;
}