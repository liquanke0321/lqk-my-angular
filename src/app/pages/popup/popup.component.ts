import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  @Input('productId')
  productId: number = 0
  @Output()
  getProductId = new EventEmitter();

  @Input('productName')
  productName: string = ''
  @Output()
  getProductName = new EventEmitter();

  @Input('productNumber')
  productNumber: string = ''
  @Output()
  getProductNumber = new EventEmitter();

  @Input('productPrice')
  productPrice: number = 0
  @Output()
  getProductPrice = new EventEmitter();

  @Input('productType')
  productType: number = 0
  @Output()
  getProductType = new EventEmitter();

  @Input('productVersion')
  productVersion: number = 0
  @Output()
  getProductVersion = new EventEmitter();

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
      console.log("this.productId"+this.productId+"this.productName---"+this.productName)
      this.isOkLoading = true;
      this.getButtonFlg.emit(this.buttonflg);
      this.getProductId.emit(this.productId);
      this.getProductName.emit(this.productName);
      this.getProductNumber.emit(this.productNumber);
      this.getProductPrice.emit(this.productPrice);
      this.getProductType.emit(this.productType);
      this.getProductVersion.emit(this.productVersion);
      setTimeout(() => {
        this.isVisible = false;
        this.isOkLoading = false;
      }, 1000);
    }else{
      this.isOkLoading = true;
      this.getButtonFlg.emit(this.buttonflg);
      setTimeout(() => {
        this.isVisible = false;
        this.isOkLoading = false;
      }, 1000);
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
