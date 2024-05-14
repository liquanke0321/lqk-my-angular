import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // 请求路径
  preURL: string = '/api/login'
  //用户名
  username: string = ''
  // 密码
  password: string = ''
  //配置http请求
  http: HttpClient
  rotuer: Router;

  // 构造方法
  constructor(httpClient: HttpClient, private notification: NzNotificationService, router: Router) {
    this.http = httpClient;
    this.rotuer = router;
  }

  // 第三方组件  消息提示框
  reslutType: string = ''
  reslutTitle: string = ''
  reslutMsg: string = ''
  createNotification(reslutType: string, reslutTitle: string, reslutMsg: string): void {
    this.notification.create(
      reslutType,
      reslutTitle,
      reslutMsg
    );
  }

  sendUserMsg() {
    // 发送http请求
    // this.http.post(`${this.preURL}/userLogin`, { username: this.username, password: this.password }) //post的请求方式暂时还有问题
    this.http.get(`${this.preURL}/userLogin?username=${this.username}&password=${this.password}`)
      .subscribe(
        (res: any) => {
          // 判断查询状态
          if (res.reslut == "OK") {
            this.reslutType = "success";
            this.reslutTitle = res.reslutTitle;
            this.reslutMsg = res.reslutMsg;
            this.rotuer.navigate(["/welcome/"], { queryParams: { username: this.username } })
          } else {
            this.reslutType = "error";
            this.reslutTitle = res.reslutTitle;
            this.reslutMsg = res.reslutMsg;
          }
          this.createNotification(this.reslutType, this.reslutTitle, this.reslutMsg)
        })
  }
}
