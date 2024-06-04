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
  @Input('product')
  product: string = '';
  @Input('classification')
  classification: string = '';
  @Input('price')
  price: number = 0;
  @Input('buttonFlg')
  buttonFlg: boolean = true

  params: any;
  dataRowIndex: number = 0;

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params
    this.dataRowIndex = params.rowIndex
    this.productId = params.data.productId;
    this.product = params.data.product;
    this.classification = params.data.classification;
    this.price = params.data.price;
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true
  }

  getProductId(event: any) {
    this.productId = event
  }
  getProduct(event: any) {
    this.product = event
  }
  getClassification(event: any) {
    this.classification = event
  }
  getPrice(event: any) {
    this.price = event
  }
  getButtonFlg(event: any) {
    this.buttonFlg = event
    this.onClick();
  }
  onClick() {
    if (this.params.onClick instanceof Function) {

      // put anything into params u want pass into parents component
      const params = {
        // rowData: this.params.node.data,//可以只传有用的东西
        buttonFlg: this.buttonFlg,
        productId: this.productId,
        product: this.product,
        classification: this.classification,
        price: this.price,
        rowIndex: this.dataRowIndex
      }
      
      this.params.onClick(params);

    }


  }


}
