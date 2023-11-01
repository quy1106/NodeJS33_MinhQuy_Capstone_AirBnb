import { ApiProperty } from "@nestjs/swagger";

export class DatPhongDto {
   @ApiProperty({ description: "maPhong", type: Number })
   maPhong: number;
   @ApiProperty({ description: "maPhong", type: Number })
   maNguoiDung: number;
   @ApiProperty({ description: "maPhong", type: String })
   ngayDen: string;
   @ApiProperty({ description: "maPhong", type: String })
   ngayDi: string;
   @ApiProperty({ description: "maPhong", type: Number })
   soLuongKhach: number;
}