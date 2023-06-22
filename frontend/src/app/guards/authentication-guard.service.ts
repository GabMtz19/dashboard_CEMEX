import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CmxAppStore } from '../states/app.store';
import { UserStore } from '../states/user.store';

@Injectable({
  providedIn: "root",
})
export class AuthenticationGuardService implements CanActivate {
  constructor(
    private router: Router,
    private userStore: UserStore,
    private appStore: CmxAppStore
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    /*
    ToDo: Maybe create an isolated service in order to call user State.
    */
    if (this.userStore.getValue().isLogged) {
      return true;
    }
    this.router.navigate(["/login"]);
    return false;
  }
}
