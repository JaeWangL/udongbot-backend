import { Module } from '@nestjs/common';
import CommunityModule from '@modules/community/community.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [CommunityModule],
  providers: [ChatGateway],
})
export class ChatModule {}
