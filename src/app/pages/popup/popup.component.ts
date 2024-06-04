import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {

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

  @Input('product')
  product: string = ''
  @Output()
  getProduct = new EventEmitter();

  @Input('classification')
  classification: string = ''
  @Output()
  getClassification = new EventEmitter();

  @Input('price')
  price: number = 0
  @Output()
  getPrice = new EventEmitter();

  constructor() {
  }

  isVisible = false;
  isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    if (this.buttonflg) {
      this.isOkLoading = true;
      this.getButtonFlg.emit(this.buttonflg)
      this.getProductId.emit(this.productId)
      this.getProduct.emit(this.product)
      this.getClassification.emit(this.classification)
      this.getPrice.emit(this.price)
      setTimeout(() => {
        this.isVisible = false;
        this.isOkLoading = false;
      }, 1000);
    }else{
      this.isOkLoading = true;
      this.getButtonFlg.emit(this.buttonflg)
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
