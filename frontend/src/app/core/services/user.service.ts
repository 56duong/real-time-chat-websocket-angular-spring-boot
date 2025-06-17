import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CompatClient, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { MessageRoomMember } from '../interfaces/message-room-member';
import { MessageRoom } from '../interfaces/message-room';
import { TimeAgoPipe } from '../pipes/time-ago.pipe';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl + environment.apiVersion + 'users';
  private webSocketUrl = environment.apiUrl + environment.webSocketUrl;
  private stompClient: CompatClient = {} as CompatClient;
  private subscriptionActiveUsers: any;
  private activeUsersSubject = new Subject<User>();
  activeUsers: {
    [key: string]: string;
  } = {
    ONLINE: 'ONLINE',
    OFFLINE: 'OFFLINE'
  }


  constructor(
    private http: HttpClient,
    private timeAgoPipe: TimeAgoPipe,
  ) { }


  login(user: User): Observable<User> {
    return this.http.post(this.apiUrl, user);
  }


  saveToLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify({
      username: user.username,
      avatarUrl: user.avatarUrl
    }));
  }


  getFromLocalStorage(): User {
    return JSON.parse(localStorage.getItem('user') ?? '{}');
  }



  removeFromLocalStorage() {
    localStorage.removeItem('user');
  }



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
    this.subscribeActive();
    this.sendConnect(user);
  }


  private subscribeActive() {
    this.subscriptionActiveUsers = this.stompClient.subscribe('/topic/active', (message: any) => {
      const user = JSON.parse(message.body);
      console.log(user);
      this.activeUsersSubject.next(user);
    });
  }


  sendConnect(user: User) {
    this.stompClient.send(
      '/app/user/connect',
      {},
      JSON.stringify(user)
    );
  }


  disconnect(user: User) {
    this.sendDisconnect(user);
    this.stompClient.disconnect(() => {
      console.log('disconnect');
    });
    this.subscriptionActiveUsers?.unsubscribe();
  }



  sendDisconnect(user: User) {
    this.stompClient.send(
      '/app/user/disconnect',
      {},
      JSON.stringify(user)
    );
  }


  subscribeActiveUsers(): Observable<User> {
    return this.activeUsersSubject.asObservable();
  }



  getOnlineUsers(): Observable<User[]> {
    const url = this.apiUrl + '/online';
    return this.http.get<User[]>(url);
  }



  getUserStatus(username?: string): boolean {
    if(!username) return false;
    return this.activeUsers[username] === 'ONLINE';
  }



  searchUsersByUsername(username: string): Observable<User[]> {
    const url = this.apiUrl + '/search/' + username;
    return this.http.get<User[]>(url);
  }



  getRoomStatus(room: MessageRoom): string {
    const members = room?.members?.filter(m => m.username != this.getFromLocalStorage().username);
    const membersOnline = members?.filter(m => this.getUserStatus(m.username));

    if(membersOnline && membersOnline.length > 0) {
      return 'Online';
    }

    if(room.isGroup) {
      return 'Offline';
    }
    else {
      return this.timeAgoPipe.transform(members?.[0]?.lastLogin) ?? '';
    }
  }



  uploadAvatar(formData: FormData): Observable<User> {
    const url = this.apiUrl + '/avatar';
    return this.http.post<User>(url, formData);
  }

}
