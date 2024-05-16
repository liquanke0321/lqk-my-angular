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

  @Input('product')
  product: string = '';
  @Input('classification')
  classification: string = '';
  @Input('price')
  price: number = 0;

  nameForUpdate: string = '更新';
  nameForDelete: string = '删除';
  params: any;
  dataRowIndex:number=0;

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params
    this.dataRowIndex = params.rowIndex
    this.product = params.data.product;
    this.classification = params.data.classification;
    this.price = params.data.price;
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true
  }

  getProduct(event: any) {
    this.product = event
  }
  getClassification(event: any) {
    this.classification = event
  }
  getPrice(event: any) {
    this.price = event
    this.onClick(event);
  }
  onClick(event: any) {

    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: event,
        rowData: this.params.node.data,
        product: this.product,
        classification: this.classification,
        price: this.price,
        rowIndex:this.dataRowIndex
      }
      alert("rowData" + JSON.stringify(params.rowData))
      this.params.onClick(params);

    }


  }


}
