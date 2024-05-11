import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  preURL: string = '/api/login'

  registerFrom:FormGroup;

  //配置http请求
  http: HttpClient
  constructor(httpClient: HttpClient, private notification: NzNotificationService) {
    this.http = httpClient;
    this.registerFrom = new FormGroup({
      username:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required),
      repassword:new FormControl('',Validators.required),
      email:new FormControl('',Validators.email),
      tel:new FormControl('',Validators.minLength(11))
    })
  }

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

  sendUserRegisterMsg() {
    // this.http.post(`${this.preURL}/userRegister`, { username: this.username, password: this.password })
      this.http.get(`${this.preURL}/userRegister?username=${this.registerFrom.get('username')}&password=${this.registerFrom.get('password')}`)
      .subscribe(
        (res: any) => {
          alert("返回回来了")
          if (res.reslut == "OK") {
            alert("是OK" + res.reslut)
            this.reslutType = "success";
            this.reslutTitle = res.reslutTitle;
            this.reslutMsg = res.reslutMsg;
          } else {
            alert("是OK以外")
            this.reslutType = "error";
            this.reslutTitle = res.reslutTitle;
            this.reslutMsg = res.reslutMsg;
          }
          this.createNotification(this.reslutType, this.reslutTitle, this.reslutMsg)
        })
  }

}
