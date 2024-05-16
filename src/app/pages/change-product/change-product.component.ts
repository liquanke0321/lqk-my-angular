import { Component, Input, Output } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { EventEmitter } from 'stream';

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

  agInit(params: ICellRendererParams<any, any, any>): void {
    console.log(params.data.product);
    this.product = params.data.product;
    this.classification = params.data.classification;
    this.price = params.data.price;
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true
  }

getProduct(){
  
}





}
