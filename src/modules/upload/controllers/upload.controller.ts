import { Controller, Body, Delete, NotAcceptableException, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { ApiFile, ApiFiles } from '@infrastructure/decorators';
import JwtAccessGuard from '@infrastructure/guards/jwt-access.guard';
import { ConfigService, BlobService } from '@shared/services';
import { DeleteAttImageRequest, DeleteAttImagesRequest, DeleteProfileAvatarRequest } from '../dtos';

@ApiTags('Upload')
@Controller('upload')
@ApiBearerAuth()
export default class UploadController {
  constructor(private readonly blobSvc: BlobService, private readonly configSvc: ConfigService) {}

  @Delete('image')
  @UseGuards(JwtAccessGuard)
  async deleteImage(@Body() req: DeleteAttImageRequest): Promise<boolean> {
    await this.blobSvc.deleteBlobAsync(this.configSvc.get('BLOB_IMAGE_CONTAINER'), req.fileName);

    return true;
  }

  @Delete('images')
  @UseGuards(JwtAccessGuard)
  async deleteImages(@Body() req: DeleteAttImagesRequest): Promise<boolean> {
    await this.blobSvc.deleteBlobsAsync(this.configSvc.get('BLOB_IMAGE_CONTAINER'), req.fileNames);

    return true;
  }

  @Delete('avatar')
  @UseGuards(JwtAccessGuard)
  async deleteProfileAvatar(@Body() req: DeleteProfileAvatarRequest): Promise<boolean> {
    await this.blobSvc.deleteBlobAsync(this.configSvc.get('BLOB_AVATAR_CONTAINER'), req.fileName);

    return true;
  }

  @Post('image')
  @ApiConsumes('multipart/form-data')
  @ApiFile('image')
  @UseGuards(JwtAccessGuard)
  async uploadImage(@Req() req: FastifyRequest): Promise<string> {
    const uploadedImage = await req.file();
    const result = await this.blobSvc.uploadBlobAsync(this.configSvc.get('BLOB_IMAGE_CONTAINER'), uploadedImage);
    if (!result) {
      throw new NotAcceptableException('Uploading file was failed');
    }

    return result;
  }

  @Post('images')
  @ApiConsumes('multipart/form-data')
  @ApiFiles('images')
  @UseGuards(JwtAccessGuard)
  async uploadImages(@Req() req: FastifyRequest): Promise<string[]> {
    // NOTE: This is not error. this is in official docs with `fasitfy-multipart`
    const uploadedImages = await req.files();
    const results = await this.blobSvc.uploadBlobsAsync(this.configSvc.get('BLOB_IMAGE_CONTAINER'), uploadedImages);
    if (!results) {
      throw new NotAcceptableException('Uploading files was failed');
    }

    return results;
  }

  @Post('avatar')
  @ApiConsumes('multipart/form-data')
  @ApiFile('image')
  @UseGuards(JwtAccessGuard)
  async uploadProfilePhoto(@Req() req: FastifyRequest): Promise<string> {
    const uploadedImage = await req.file();
    const result = await this.blobSvc.uploadBlobAsync(this.configSvc.get('BLOB_AVATAR_CONTAINER'), uploadedImage);
    if (!result) {
      throw new NotAcceptableException('Uploading photo was failed');
    }

    return result;
  }
}
