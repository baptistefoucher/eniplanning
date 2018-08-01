import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

import { User } from '../models/user';
import { API } from '../api';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  user: any;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private router: Router,
  ) { }

  getUser(dataUserId: number) {
    this.http.get(API.userAPI+'/'+dataUserId, {responseType: 'json'}).subscribe(
      data => {
        this.user = data;
        this.setUser(data);
        this.loginService.changeAuthStatus(true);
        this.router.navigateByUrl('/planning');
      },
      error => {
        console.log(error);
      }
    );
  }
    
  public getUsers() {
    return this.http.get<User[]>(API.userAPI);
  }

  public createUser(user: User) {
    return this.http.post(API.userAPI, user).subscribe(
      data => {
        console.log('user created', data);
      },
      error => {
        console.log(error);
      }
    );
  }


  public updateUser(user: User) {
    return this.http.put(API.userAPI + '/' + user.id, user, this.httpOptions).subscribe(
      data=>{
        sessionStorage.setItem('user', JSON.stringify(user));
      },
      error=>{
        console.log(error);
      }
    );
  }
  
  public setUser(data) {
    sessionStorage.setItem('user', JSON.stringify(data));
  }

  public unsetUser() {
    sessionStorage.removeItem('user');
  }
}
