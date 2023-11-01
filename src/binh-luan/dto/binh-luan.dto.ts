import { ApiProperty } from "@nestjs/swagger";

export class BinhLuanDto {
   @ApiProperty({ description: "maPhong", type: Number })
   maPhong: number;
   @ApiProperty({ description: "maNguoiBinhLuan", type: Number })
   maNguoiBinhLuan: number;
   @ApiProperty({ description: "ngayBinhLuan", type: String })
   ngayBinhLuan: string;
   @ApiProperty({ description: "noiDung", type: String })
   noiDung: string;
   @ApiProperty({ description: "saoBinhLuan", type: Number })
   saoBinhLuan: number;
}