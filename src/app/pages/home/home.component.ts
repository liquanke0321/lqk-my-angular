import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  

  aliasname: string = ''

  constructor(private route: ActivatedRoute) {
  }

  isCollapsed = false;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
      (res: any) => {
        this.aliasname = res.get("aliasname")
      }
    )
  }
  
}
