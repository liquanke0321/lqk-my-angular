import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserAuthInfoModel } from '../model/user-auth-info-model';
import { CommonService } from '../common/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  // 请求路径
  preURL: string = '/api/login'
  //用户名
  username: string = ''
  // 密码
  password: string = ''
  //配置http请求
  http: HttpClient
  rotuer: Router;
  common: CommonService = new CommonService;

  // 构造方法
  constructor(httpClient: HttpClient, private notification: NzNotificationService, router: Router) {

    this.http = httpClient;
    this.rotuer = router;
  }
  ngOnInit(): void {
    let authInfo: UserAuthInfoModel = new UserAuthInfoModel;
    this.common.setAuthInfo(authInfo);
  }

  // 第三方组件  消息提示框
  reslutType: string = ''
  reslutTitle: string = ''
  reslutMsg: string = ''
  userContentVo: UserData[] = []
  createNotification(reslutType: string, reslutTitle: string, reslutMsg: string): void {
    this.notification.create(
      reslutType,
      reslutTitle,
      reslutMsg
    );
  }

  sendUserMsg() {
    // 发送http请求
    this.http.post(`${this.preURL}/userLogin`, { username: this.username, password: this.password })
      // this.http.get(`${this.preURL}/userLogin?username=${this.username}&password=${this.password}`)
      .subscribe(
        (res: any) => {
          // 判断查询状态
          if (res.reslutStatus == "OK") {
            this.reslutType = "success";
            this.reslutTitle = res.reslutTitle;
            this.reslutMsg = res.reslutMsg;
            this.userContentVo = res.userContentVo
            this.rotuer.navigate(["/welcome/home"], { queryParams: { aliasname: res.userContentVo.aliasname } })

            //设定登录信息
            let authInfo: UserAuthInfoModel = new UserAuthInfoModel;
            this.common.setAuthInfo(authInfo);
          } else {
            this.reslutType = "error";
            this.reslutTitle = res.reslutTitle;
            this.reslutMsg = res.reslutMsg;
          }
          this.createNotification(this.reslutType, this.reslutTitle, this.reslutMsg)
        })
  }

}
interface UserData {
  address: string;
  age: number;
  aliasname: string;
  mail: string;
  password: string;
  phonenumber: number;
  userid: number;
  username: string;
}