import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { CommonService } from "./common.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    public common: CommonService
  ) { }

  canActivate() {

    const accountCd = this.common.getAuthInfo().accountCd;

    console.log("aaaaaaaaaaaaaaaa+" + JSON.stringify(this.common.getAuthInfo()))

    if (accountCd !== null && accountCd !== '') {
      return true;
    }
    this.router.navigate(['/login'])
    return false;

    // const accountKbn = localStorage.getItem('AccountKbnTmp');

  }
}
