import { ApiProperty } from '@nestjs/swagger'

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

export class NguoiDungDto {
   @ApiProperty({ description: "name", type: String })
   name: string;
   @ApiProperty({ description: "email", type: String })
   email: string;
   @ApiProperty({ description: "password", type: String })
   password: string;
   @ApiProperty({ description: "phone", type: String })
   phone: string;
   @ApiProperty({ description: "birthday", type: String })
   birthday: string;
   @ApiProperty({ description: "gender", type: Boolean })
   gender: boolean;
   @ApiProperty({ description: "role", type: String })
   role: string
}

export class FileUploadDto {
   @ApiProperty({ name: 'formFile', type: 'string', format: 'binary' })
   file: any;
}