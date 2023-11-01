import { ApiProperty } from '@nestjs/swagger'

export class DangKiDto {
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
}

export class DangNhapDto {
   @ApiProperty({ description: "email", type: String })
   email: string;
   @ApiProperty({ description: "password", type: String })
   password: string;
}