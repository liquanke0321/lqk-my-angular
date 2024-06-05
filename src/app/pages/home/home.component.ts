import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../common/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {



  aliasname: string | undefined = ''

  constructor(private route: ActivatedRoute,
    public common: CommonService
  ) {
  }

  isCollapsed = false;

  ngOnInit(): void {
    this.aliasname = this.common.getAuthInfo().aliasname
  }

}
