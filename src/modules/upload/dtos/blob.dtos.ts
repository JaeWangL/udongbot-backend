import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteAttImageRequest {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly fileName: string;
}

export class DeleteAttImagesRequest {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly fileNames: string[];
}

export class DeleteProfileAvatarRequest {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly fileName: string;
}
