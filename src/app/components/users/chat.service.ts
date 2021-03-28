import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

const BACKEND_URL = environment.apiUrl + "/auth";
const BACKEND_USER_URL = environment.apiUrl + "/user";
const BACKEND_CHAT_URL = environment.apiUrl + "/chat";

@Injectable({ providedIn: "root" })
export class ChatService {
    constructor(
        private socket: Socket,
        private http: HttpClient,
    ) { }

    connect() {
        this.socket.connect();
    }

    sendMessage(msg: any) {
        const msg1={
            "message":"Test!!",
            "receiverId": "605e4c96dc2e14b76a93c885"
        }
        return this.http.post(BACKEND_CHAT_URL + "/send_message", msg1)
            .subscribe((response: any) => {
                console.log(response)
            })
        //  this.socket.emit("message", msg);
    }

    getMessage() {
        return this.socket.fromEvent("message")
            .pipe(map((data: any) => data));
    }
}