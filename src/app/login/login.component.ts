import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
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
name: any;

  // 构造方法
  constructor(httpClient: HttpClient, private notification: NzNotificationService) {
    this.http = httpClient;
  }

  // 第三方组件  消息提示框     （暂时有问题，渲染不出来）
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
    // this.http.post(`${this.preURL}/userLogin`, { username: this.username, password: this.password }) post的请求方式暂时还有问题
    this.http.get(`${this.preURL}/userLogin?username=${this.username}&password=${this.password}`)
      .subscribe(
        (res: any) => {
          // 判断查询状态
          if (res.reslut == "OK") {
            this.reslutType = "success";
            this.reslutTitle = res.reslutTitle;
            this.reslutMsg = res.reslutMsg;
          } else {
            this.reslutType = "error";
            this.reslutTitle = res.reslutTitle;
            this.reslutMsg = res.reslutMsg;
          }
          this.createNotification(this.reslutType, this.reslutTitle, this.reslutMsg)
        })
  }
}
