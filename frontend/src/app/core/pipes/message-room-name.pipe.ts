import { Pipe, PipeTransform } from '@angular/core';
import { MessageRoom } from '../interfaces/message-room';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';

@Pipe({
  name: 'messageRoomName'
})
export class MessageRoomNamePipe implements PipeTransform {

  currentUser: User = this.userService.getFromLocalStorage();


  constructor(
    private userService: UserService,
  ) {}

  transform(room?: MessageRoom): string | undefined {
    if(!room) return '';

    if(room.name) {
      return room.name;
    }
    else {
      return room.members?.filter(m => {
        if(room.isGroup || m.username !== this.currentUser.username) {
          return m;
        }
        return null;
      })
      .map(u => u.username)
      .join(', ');
    }
  }

}

// duong
// an duong dung
// an duong dung


// last message
// room name


// 3 truong hop
// 1. nhom - room da co ten => hien ten
// 2. nhom - chua co ten => danh sach member phan tach boi dau , 
// 3. chi co 2 nguoi => hien thi ten cua nguoi con lai

// ====> string
