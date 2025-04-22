import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MessageRoomNamePipe } from './pipes/message-room-name.pipe';



@NgModule({
  declarations: [
    MessageRoomNamePipe
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    MessageRoomNamePipe
  ]
})
export class CoreModule { }
