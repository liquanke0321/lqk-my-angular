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

  @Input('productID')
  productID: number= 0;
  @Input('product')
  product: string = '';
  @Input('classification')
  classification: string = '';
  @Input('price')
  price: number = 0;
  @Input('columnName')
  columnName = new Map([
    ["商品ID", "value1"],
    ["商品名称", "product"],
    ["分类", "classification"],
    ["价格", "price"]
]); 

  nameForUpdate: string = '更新';
  nameForDelete: string = '删除';
  params: any;
  dataRowIndex:number=0;

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params
    this.dataRowIndex = params.rowIndex
    this.productID = params.data.product;
    this.product = params.data.product;
    this.classification = params.data.classification;
    this.price = params.data.price;
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true
  }

  getProductID(event: any) {
    this.productID = event
  }
  getProduct(event: any) {
    this.product = event
  }
  getClassification(event: any) {
    this.classification = event
  }
  getPrice(event: any) {
    this.price = event
    this.onClick();
  }
  onClick() {

    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        // rowData: this.params.node.data,//可以只穿有用的东西
        productID: this.productID,
        product: this.product,
        classification: this.classification,
        price: this.price,
        rowIndex:this.dataRowIndex
      }
      this.params.onClick(params);

    }


  }


}
