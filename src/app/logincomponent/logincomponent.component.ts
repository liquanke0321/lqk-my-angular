import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-logincomponent',
  templateUrl: './logincomponent.component.html',
  styleUrl: './logincomponent.component.css'
})
export class LogincomponentComponent {

  preURL: string = '/login'

  username: string = ''
  password: string = ''
  //配置http请求
  http: HttpClient
  constructor(httpClient: HttpClient, private notification: NzNotificationService) {
    this.http = httpClient;
  }

  notificationtype:string=''
  reslutMsg :string=''
  createNotification(type: string,reslutMsg:string): void {
    this.notification.create(
      type,
      reslutMsg,
      ""
    );
  }
  
  sendUserMsg() {
    this.http.post(`${this.preURL}/userLogin`, { username: this.username, password: this.password })
      .subscribe(
        (res: any) => {
          if(res.reslut=="OK"){
            this.notificationtype="success";
            this.reslutMsg=res.reslutMsg
          }else{
            this.notificationtype="error";
            this.reslutMsg=res.reslutMsg
          }
        }


      )
  }
}
