import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../utils/services/user.service';
import { LoginService } from '../../utils/services/login.service';
import { TokenService } from '../../utils/services/token.service';

@Component({
  selector: 'planning-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedIn: boolean;
  username: string;
  

  constructor(
    private login: LoginService,
    private router: Router,
    private userService: UserService,
    private token: TokenService,
  ) {   }

  ngOnInit() {
    this.loggedIn = this.login.getStatus() ? true : false;
    this.username = localStorage.getItem('username');
    // console.log("this.loggedIn = "+this.loggedIn);
    console.log("this.username = "+this.username);
  }
    
    
  logout(eventLogout: MouseEvent) {
    event.preventDefault();
    this.login.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
    this.userService.unsetUser();
    this.token.remove();
  }

  redirectToMonCompte(eventCompte: MouseEvent) {
    this.router.navigateByUrl('/mon-compte');
  }
}
