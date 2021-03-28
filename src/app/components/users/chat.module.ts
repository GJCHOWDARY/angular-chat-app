import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from "../../angular-material.module";
import { ChatComponent } from './chat/chat.component';
import { ChatRoutingModule } from './chat-routing.module'
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatPopupComponent } from './chat-popup/chat-popup.component';

@NgModule({
  declarations: [ChatComponent,DashboardComponent, ChatPopupComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    ChatRoutingModule
  ]
})
export class ChatsModule { }
