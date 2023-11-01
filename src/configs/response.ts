import { BadRequestException } from "@nestjs/common/exceptions"

export interface HttpResponse<T> {
   statusCode: number,
   message: string,
   content: T
}

export const successCode = (content: any): HttpResponse<any> => {
   return {
      statusCode: 200,
      message: 'Xử lý thành công!',
      content
   }
}

export const failCode = (content: any): HttpResponse<any> => {
   throw new BadRequestException({
      statusCode: 400,
      message: 'Yêu cầu không hợp lệ!',
      content
   })
}