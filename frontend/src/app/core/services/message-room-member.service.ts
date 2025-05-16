import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MessageRoomMember } from '../interfaces/message-room-member';

@Injectable({
  providedIn: 'root'
})
export class MessageRoomMemberService {

  private apiUrl = environment.apiUrl + environment.apiVersion + 'messageroommember';



  constructor(
    private http: HttpClient,
  ) { }


  
  updateLastSeen(roomId?: string, username?: string): Observable<MessageRoomMember> {
    const url = this.apiUrl + '/update-last-seen/' + roomId + '/' + username;
    return this.http.post<MessageRoomMember>(url, {});
  }

}
