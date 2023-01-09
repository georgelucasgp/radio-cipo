import { CACHE_MANAGER, Inject } from "@nestjs/common"
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets"
// import { Server } from "http"
import { Cache } from "cache-manager"
import { Server, Socket } from 'socket.io'
import * as fs from 'fs'

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class RadioGateway
  implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache
  ) { }

  @WebSocketServer()
  server: Server

  @SubscribeMessage('radio')
  handleMessage(client: Socket, payload: any): void {
    // const track = fs.readdirSync('media/convert')


    // client.broadcast.emit('radio', blob)
  }

  handleDisconnect(client: Socket) {
    console.log(`Uma conexão foi desconectada: ${client.id}`)
    this.cache.del(client.id)
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Uma nova conexão está ativa: ${client.id}`)
    this.cache.set(client.id, { name: ` teste ${Math.floor(Math.random() * 100)} ` })
  }

  // afterInit(server: any) {
  //   console.log('não sei o que acontece', server)
  // }
}