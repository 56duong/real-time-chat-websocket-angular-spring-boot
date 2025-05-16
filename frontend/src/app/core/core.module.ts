import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MessageRoomNamePipe } from './pipes/message-room-name.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';



@NgModule({
  declarations: [
    MessageRoomNamePipe,
    TimeAgoPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    MessageRoomNamePipe,
    TimeAgoPipe
  ]
})
export class CoreModule { }
