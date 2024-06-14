import { Component, Input, Output } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ProductModel } from '../../model/product-model';

//定义了表格中的按钮组件
@Component({
  selector: 'app-change-product',
  templateUrl: './change-product.component.html',
  styleUrl: './change-product.component.css'
})
export class ChangeProductComponent implements ICellRendererAngularComp {

  @Input('buttonFlg')
  buttonFlg: boolean = true

  @Input('product')
  product: ProductModel = new ProductModel

  params: any;
  dataRowIndex: number = 0;
  product_type: string = ""

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params
    this.dataRowIndex = params.rowIndex
    this.product.product_id = params.data.productId;
    this.product.product_name = params.data.productName;
    this.product.product_number = params.data.productNumber;
    this.product.product_price = params.data.productPrice;
    this.product_type = params.data.productType;
    this.product.product_type = params.data.productType;
    this.product.product_version = params.data.productVersion;
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true
  }

  getProduct(event: any) {
    this.product = event
  }

  getButtonFlg(event: any) {
    this.buttonFlg = event
    this.onClick();
  }
  onClick() {
    if (this.params.onClick instanceof Function) {
      const params = {
        // rowData: this.params.node.data,//可以只传有用的东西
        buttonFlg: this.buttonFlg,
        productId: this.product.product_id,
        productName: this.product.product_name,
        productNumber: this.product.product_number,
        productPrice: this.product.product_price,
        productType: this.product.product_type,
        productVersion: this.product.product_version,
        rowIndex: this.dataRowIndex
      }
      console.log("this.productName-【" + this.product.product_name)
      this.params.onClick(params);

    }


  }


}
