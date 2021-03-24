import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CommunityRepository, MemberRepository } from '@modules/community/repositories';
import { NotFoundException } from '@nestjs/common';
import { CommChatConnectionData, CommChatMessageData } from './interfaces';

@WebSocketGateway(1080)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  connectedUserIds: string[] = [];

  constructor(private readonly commRepo: CommunityRepository, private readonly memberRepo: MemberRepository) {}

  async handleConnection(client: Socket): Promise<void> {
    const { userId } = client.handshake.query;
    if (!userId) {
      return;
    }

    client.join(userId);
    this.connectedUserIds = [...this.connectedUserIds, userId];
  }

  async handleDisconnect(client: Socket): Promise<void> {
    const { userId } = client.handshake.query;
    if (!userId) {
      return;
    }
    const userPos = this.connectedUserIds.indexOf(userId);
    if (userPos > -1) {
      this.connectedUserIds = [...this.connectedUserIds.slice(0, userPos), ...this.connectedUserIds.slice(userPos + 1)];
    }
  }

  @SubscribeMessage('commChatConnection')
  async commChatConnection(client: Socket, data: CommChatConnectionData): Promise<void> {
    const { communityId, memberId } = data;
    const community = await this.commRepo.findByIdAsync(communityId);
    if (!community) {
      throw new NotFoundException('ChatGateway.commChatConnection: Community not founded');
    }
    const member = await this.memberRepo.findByIdAsync(memberId);
    if (!member) {
      throw new NotFoundException('ChatGateway.commChatConnection: Community not founded');
    }

    member.setOnline(true);
    await this.memberRepo.updateAsync(member);

    client.join(member.userId.toString());
    this.server.to(member.userId.toString()).emit('commChatConnectiont', member.userName);
  }

  // 发送群聊消息
  @SubscribeMessage('commChatMessage')
  async commChatMessage(client: Socket, data: CommChatMessageData): Promise<void> {
    const { memberId, message, userId } = data;

    this.server.to(userId.toString()).emit('commChatMessag', message);
  }
}
