import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageRoom } from '../interfaces/message-room';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageRoomService {

  private apiUrl = environment.apiUrl + environment.apiVersion + 'messagerooms';



  constructor(
    private http: HttpClient,
  ) { }



  findMessageRoomByMembers(members: string[]): Observable<MessageRoom> {
    const url = this.apiUrl + '/find-chat-room';
    const params = {
      members: members
    };
    return this.http.get<MessageRoom>(url, { params });
  }



  createChatRoom(currentUsername: string, members: string[]): Observable<MessageRoom> {
    const url = this.apiUrl + '/create-chat-room';
    const params = new HttpParams()
                        .set('username', currentUsername)
                        .set('members', members.join(','));
    return this.http.post(url, null, { params })
  }



  
  findMessageRoomAtLeastOneContent(username: string): Observable<MessageRoom[]> {
    const url = this.apiUrl + '/find-chat-room-at-least-one-content/' + username;
    return this.http.get<MessageRoom[]>(url);
  }



  
  findById(roomId?: string): Observable<MessageRoom> {
    const url = this.apiUrl + '/' + roomId;
    return this.http.get<MessageRoom>(url);
  }

}
