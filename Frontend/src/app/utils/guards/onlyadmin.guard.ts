import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { ROLES } from '../role';
 
@Injectable({ providedIn: 'root' })
export class OnlyAdminGuard implements CanActivate {
 
    constructor(
        private router: Router,
    ) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (JSON.parse(localStorage.getItem('user')).role_id == '3') {
            // logged in so return true
            return true;
        }
 
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/unauthorized']);
        return false;
    }
}