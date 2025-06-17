import { Component, Input } from '@angular/core';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {

  @Input() username?: string;
  @Input() width: string = '32px';
  @Input() height?: string;
  @Input() isOnline?: boolean;
  @Input() avatarUrl?: string;
  @Input() isAllowUpload: boolean = false;


  constructor(
    public userService: UserService,
  ) {}


  ngOnInit() {
    if(!this.height) {
      this.height = this.width;
    }
    if(!this.avatarUrl) {
      this.avatarUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s';
    }
  }


  onUploadAvatar() {
    if(!this.isAllowUpload) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();

    input.onchange = () => {
      console.log(input.files);

      const file = input.files?.item(0);

      if(!file || !this.username) return;

      const formData = new FormData();
      formData.set('file', file);
      formData.set('username', this.username);

      this.userService.uploadAvatar(formData).subscribe({
        next: (user: User) => {
          this.userService.saveToLocalStorage(user);
          this.avatarUrl = URL.createObjectURL(file);
          window.location.reload();
        }, error: (error: any) => {
          console.log(error);
        }
      });
    }
  }

}
