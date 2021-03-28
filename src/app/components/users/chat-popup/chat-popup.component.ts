import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subject, Subscription } from "rxjs";
import { ChatService } from "../chat.service";
import { AuthService } from "../../../auth/auth.service";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chat-popup',
  templateUrl: './chat-popup.component.html',
  styleUrls: ['./chat-popup.component.css']
})
export class ChatPopupComponent implements OnInit {

  isLoading = true;
  data: any = [];
  userInfo: any;
  isEdit = true;
  messages: any = [];
  message: string = '';
  isLoginDialogOpen: boolean = false;

  private chatListenerSubs = new Subscription();

  constructor(
    private dialogRef: MatDialogRef<ChatPopupComponent>,
    public chatService: ChatService,
    public authService: AuthService,
    private dialog: MatDialog,
    private renderer: Renderer2,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.data = data;
  }

  ngOnInit(): void {
    this.isLoginDialogOpen = false;
    this.chatService.getMessages(this.data.receiverId).subscribe((res: any) => {
      this.messages = res.chats;
    })
    const errorField = this.renderer.selectRootElement('.content-message');
    if (!this.isLoginDialogOpen) {
      this.chatListenerSubs = this.chatService.getMessage()
        .subscribe((msg: any) => {
          // console.log("socket.io message received in pop-up!!")
          this.messages.push(msg);
          errorField.scrollIntoView();
          // this.openDialog(msg.receiverId, msg);
        });
    }
    this.authService.getUserDetails(this.data.receiverId).subscribe((res: any) => {
      this.userInfo = res.user
    })
    this.isLoading = false;
    errorField.scrollIntoView();
  }

  sendMessage(form: NgForm) {
    const chat = {
      message: form.value.message,
      receiverId: this.data.receiverId,
    }
    this.chatService.sendMessage(chat).subscribe((response: any) => {
      this.message = ""
      // console.log(response)
    })
  }

  close() {
    this.isLoginDialogOpen = false;
    this.dialogRef.close();
  }

  formateName(a: string, b?: string) {
    var l1 = a.charAt(0).toUpperCase();
    if (b) {
      var l2 = b.charAt(0).toUpperCase();
      return l1 + l2;
    }
    return l1;
  }
}
