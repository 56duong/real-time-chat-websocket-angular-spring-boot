import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-select-users-dialog',
  templateUrl: './select-users-dialog.component.html',
  styleUrls: ['./select-users-dialog.component.scss']
})
export class SelectUsersDialogComponent {

  @Input() visible: boolean = false;
  @Input() currentUsername: string | undefined = '';

  @Output() onHideEvent = new EventEmitter();
  @Output() onSubmitEvent = new EventEmitter();

  selectedUsers: User[] = [];
  searchedUsers: User[] = [];



  constructor(
    private userService: UserService,
  ) {}



  onSearch(event: any) {
    this.userService.searchUsersByUsername(event.query).subscribe({
      next: (users) => {
        const selectedUsername = this.selectedUsers.map(u => u.username);
        this.searchedUsers = users.filter(u => {
          return !selectedUsername.includes(u.username);
        });
      },
      error: (error) => {
        console.log(error);
      }
    })
  }



  onHide() {
    this.onHideEvent.emit();
  }



  onSubmit() {
    this.onSubmitEvent.emit(this.selectedUsers);
    this.selectedUsers = [];
  }

}
