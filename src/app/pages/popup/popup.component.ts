import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {

  @Input('buttonName')
  buttonName:string=''
  @Input('columnName')
  columnName=new Map([["1","2"]]);

  @Input('productID')
  productID: number=0
  @Output()
  getProductID = new EventEmitter();
  @Input('product')
  product: string=''
  @Output()
 getProduct = new EventEmitter();

  @Input('classification')
  classification: string=''
  @Output()
  getClassification = new EventEmitter();
  
  @Input('price')
  price: number=0
  @Output()
  getPrice = new EventEmitter();
  

  
  isVisible = false;
  isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    this.getProduct.emit(this.product)
    this.getClassification.emit(this.classification)
    this.getPrice.emit(this.price)
    this.getProductID.emit(this.productID)
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 1000);
    console.log(this.columnName)
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
