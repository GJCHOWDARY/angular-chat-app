import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { environment } from "../../environments/environment";
import { AuthData } from "./auth-data.model";
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
const BACKEND_URL = environment.apiUrl + "/auth";
const BACKEND_USER_URL = environment.apiUrl + "/user";

@Injectable({ providedIn: "root" })
export class AuthService {
  sankBardata: any = {};
  private isAuthenticated = false;
  private token: string = '';
  private email: string = '';
  private name: string = '';
  private tokenTimer: any;
  private userId: string = '';
  private authStatusListener = new Subject<boolean>();

  horizontalPos: MatSnackBarHorizontalPosition = 'right';
  verticalPos: MatSnackBarVerticalPosition = 'top';

  constructor(
    private http: HttpClient, private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getUserEmail() {
    return this.email;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  login(email: string, password: string) {
    localStorage.clear();
    const authData: AuthData = { email: email, password: password };
    return this.http
      .post<{ token: string; expiresIn: number; userId: string; password_update: number; email: string, name: string }>(
        BACKEND_URL + "/login",
        authData
      )
  }

  createUser(email: string, password: string, name: string) {
    localStorage.clear();
    const newUser: any = { email, password, name };
    console.log(newUser,":00000000")
    return this.http.post(BACKEND_URL + "/signup",newUser)
  }

  saveLoginInfo(response: any) {
    const token = response.token;
    if (token) {
      this.token = token;
      const expiresInDuration = response.expiresIn;
      this.setAuthTimer(expiresInDuration);
      this.isAuthenticated = true;
      this.userId = response.userId;
      this.email = response.email;
      this.name = response.name;
      this.authStatusListener.next(true);
      const now = new Date();
      const expirationDate = new Date(
        now.getTime() + expiresInDuration * 1000
      );
      this.saveAuthData(token, expirationDate, this.userId, response.email, response.name);
    }
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = String(authInformation.userId);
      this.email = String(authInformation.email);
      this.name = String(authInformation.name);
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    return this.http.post(BACKEND_URL + "/logout", { userId: this.userId })
      .subscribe((response: any) => {
        this.token = '';
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.clearAuthData();
        localStorage.clear();
        this.userId = '';
        clearTimeout(this.tokenTimer);
        this.router.navigate(['/auth/login']);
      })
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, email: string, name: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
    localStorage.setItem("email", email);
    localStorage.setItem("name", String(name));
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      email: email,
      name: name
    };
  }

  getUserData() {
    return {
      token: this.token,
      userId: this.userId,
      name: this.name,
      email: this.email,
    };
  }

  getUserDetails() {
    return this.http.get(BACKEND_USER_URL + `/get_user_detials/` + this.userId)
  }

  openSnakBar() {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPos;
    config.horizontalPosition = this.horizontalPos;
    config.duration = 8000;
    this._snackBar.open(this.sankBardata.message, 'Ok', config);
  }
}
