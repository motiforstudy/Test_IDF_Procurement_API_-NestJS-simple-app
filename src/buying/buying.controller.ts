import { Controller, Post, Body, ValidationPipe, UseInterceptors, UploadedFile, ParseFilePipeBuilder } from '@nestjs/common';
import { BuyingService } from './buying.service';
import { CreateBuyingDto } from './dto/create-buying.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class BuyingController {
  constructor(private readonly buyingService: BuyingService) {}

  @Post("transactions/purchase")
  buyWepon(@Body(ValidationPipe) createBuyingDto: CreateBuyingDto) {
    return this.buyingService.buyWepon(createBuyingDto);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post("/images/check/:itemId")
  uploadFileAndFailValidation(
    @Body() body: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'PNG',
        })
        .addMaxSizeValidator({
          maxSize: 2500
        })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    return {
      itemId: "id",
      isValid: true,
      reason: null
    };
  }

}
