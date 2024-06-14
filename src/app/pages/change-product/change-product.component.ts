import { Component, Input, Output } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

//定义了表格中的按钮组件
@Component({
  selector: 'app-change-product',
  templateUrl: './change-product.component.html',
  styleUrl: './change-product.component.css'
})
export class ChangeProductComponent implements ICellRendererAngularComp {

  @Input('productId')
  productId: number = 0;
  @Input('productName')
  productName: string = '';
  @Input('productNumber')
  productNumber: string = '';
  @Input('productPrice')
  productPrice: number = 0;
  @Input('productType')
  productType: number = 0;
  @Input('productVersion')
  productVersion: number = 0;
  @Input('buttonFlg')
  buttonFlg: boolean = true

  params: any;
  dataRowIndex: number = 0;

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params
    this.dataRowIndex = params.rowIndex
    this.productId = params.data.productId;
    this.productName = params.data.productName;
    this.productNumber = params.data.productNumber;
    this.productPrice = params.data.productPrice;
    this.productType = params.data.productType;
    this.productVersion = params.data.productVersion;
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true
  }

  getProductId(event: any) {
    this.productId = event
  }
  getProductName(event: any) {
    this.productName = event
  }
  getProductNumber(event: any) {
    this.productNumber = event
  }
  getProductPrice(event: any) {
    this.productPrice = event
  }
  getProductType(event: any) {
    this.productType = event
  }
  getProductVersion(event: any) {
    this.productVersion = event
  }
  getButtonFlg(event: any) {
    this.buttonFlg = event
    this.onClick();
  }
  onClick() {
    if (this.params.onClick instanceof Function) {

      // put anything into params u want pass into parents component
      console.log("this.productName-【"+this.productName)
      const params = {
        // rowData: this.params.node.data,//可以只传有用的东西
        buttonFlg: this.buttonFlg,
        productId: this.productId,
        productName: this.productName,
        productNumber: this.productNumber,
        productPrice: this.productPrice,
        productType: this.productType,
        productVersion: this.productVersion,
        rowIndex: this.dataRowIndex
      }
      
      this.params.onClick(params);

    }


  }


}
