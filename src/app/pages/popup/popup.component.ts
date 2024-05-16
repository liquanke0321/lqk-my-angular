import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {

  @Input('buttonName')
  buttonName:string=''

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
    alert(this.product +"+"+this.classification+"+"+this.price)
    this.getProduct.emit(this.product)
    this.getClassification.emit(this.classification)
    this.getPrice.emit(this.price)
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
