import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  headrname:string = "我的系统名"
  //侧边栏展开缩进
  isCollapsed = false;
  constructor() {
  }
  ngOnInit(): void {
  }

  changeheaderName(name: string){

    this.headrname = name;
  }


}
