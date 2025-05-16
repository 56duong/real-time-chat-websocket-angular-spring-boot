import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import * as SockJS from 'sockjs-client';
import { MessageContent } from '../interfaces/message-content';

@Injectable({
  providedIn: 'root'
})
export class MessageContentService {
  private apiUrl = environment.apiUrl + environment.apiVersion + 'messagecontents';

  private webSocketUrl = environment.apiUrl + environment.webSocketUrl;
  private stompClient: CompatClient = {} as CompatClient;
  private subscriptionMessages: any;
  private messagesSubject = new Subject<MessageContent>();


  constructor(
    private http: HttpClient,
  ) { }



  connect(user: User) {
    const socket = new SockJS(this.webSocketUrl);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect(
      {},
      () => this.onConnect(user),
      (error: any) => console.log(error)
    );
  }


  private onConnect(user: User) {
    this.subscribeMessages(user);
  }


  private subscribeMessages(user: User) {
    this.subscriptionMessages = this.stompClient.subscribe(`/user/${user.username}/queue/messages`, (message: any) => {
      const user = JSON.parse(message.body);
      this.messagesSubject.next(user);
    });
  }


  sendMessage(messageContent: MessageContent) {
    this.stompClient.send(
      '/app/send-message',
      {},
      JSON.stringify(messageContent)
    );
  }


  disconnect() {
    this.stompClient.disconnect(() => {
      console.log('disconnect');
    });
    this.subscriptionMessages?.unsubscribe();
  }


  subscribeMessagesObservable(): Observable<MessageContent> {
    return this.messagesSubject.asObservable();
  }



  getMessagesByRoomId(roomId?: string): Observable<MessageContent[]> {
    const url = this.apiUrl + '/' + roomId;
    return this.http.get<MessageContent[]>(url);
  }

}
