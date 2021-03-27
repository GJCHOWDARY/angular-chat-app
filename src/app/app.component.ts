import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { Subject, Subscription } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  IsAuthenticated: boolean = false;
  title = 'doodleblue';
  userData: any = [];
  private authListenerSubs= new Subscription();

  constructor(public authService: AuthService,
  ) {
    this.authService.autoAuthUser();
  }

  ngOnInit(): void {
    this.IsAuthenticated = this.authService.getIsAuth();
    this.userData = this.authService.getUserData();
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userData = this.authService.getUserData();
        this.IsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy(): void {
    /** Unsubscribe all subscriptions to avoid memory leak */
  }
}
