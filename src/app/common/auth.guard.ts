import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { CommonService } from "./common.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private common: CommonService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // 登录信息的账号码获取
    const accountCd = this.common.getAuthInfo().accountCd;

    // 获得账户代码的情况下，什么都不做
    if (accountCd !== null && accountCd !== '') {
      return true;
    }

    this.router.navigate(['/login'])
    return false;

    // // 无法取得帐户码时，送回登录画面
    // const accountKbn = localStorage.getItem('ocAccountKbnTmp');
    // if (accountKbn === '02') {
    //   // 一般向け
    // } else {
    //   // センコー向け
    //   this.router.navigate(['senko'])
    // }
  }
}
