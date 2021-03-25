import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from "../angular-material.module";
import { ComponentsComponent } from './components.component';
import { ChatComponent } from './chat/chat.component';


@NgModule({
  declarations: [ComponentsComponent, ChatComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class ComponentsModule { }
