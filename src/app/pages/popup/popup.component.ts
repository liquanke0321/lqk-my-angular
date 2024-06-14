import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductModel } from '../../model/product-model';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnInit{

  
  @Input('buttonName')
  buttonName: string = ''

  @Input('buttonFlg')
  buttonflg: boolean = true
  @Output()
  getButtonFlg = new EventEmitter();

  @Input('product')
  product: ProductModel = new ProductModel
  
  product_type:string=this.product.product_type
  @Output()
  getProduct = new EventEmitter();
  
   //配置http请求
   http: HttpClient
  constructor(httpClient: HttpClient) {
    this.http = httpClient
  }
  selectData:any[]=[]
  preURL: string = "/api/product";
  ngOnInit(): void {
    this.http.post(`${this.preURL}/selectType`, {})
      .subscribe(
        (res: any) => {
          for (let i = 0; i < res.length; i++) {
            this.selectData.push({
              typeId:res[i].typeId,
              typeName:res[i].typeName
            })
          }
        })

  }

  isVisible = false;
  isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    if (this.buttonflg) {
      this.isOkLoading = true;
      this.getButtonFlg.emit(this.buttonflg);
      this.getProduct.emit(this.product);

  
    }else{
      this.isOkLoading = true;
      this.getButtonFlg.emit(this.buttonflg);
      setTimeout(() => {
        this.isVisible = false;
        this.isOkLoading = false;
      }, 1);
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
