import { Component, OnInit } from '@angular/core';
import { ColDef, ICellRendererParams } from 'ag-grid-community'; // 列定义类型接口
import { ChangeProductComponent } from '../change-product/change-product.component';


// 定义列接口
interface IRow {
  product: string;
  classification: string;
  price: number;
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})

export class InventoryComponent {
  agInit(params: ICellRendererParams<any, any, any>): void { }
  refresh(params: ICellRendererParams<any, any, any>): boolean { return true }

  myMap = new Map([
    // ["product", product],
    // ["classification", "2"],
    // ["price", "4545"],
    // ["comment", "a"],
    // ["updateData", "true"],
  ]);

  arr_names: any[] = ['1Tesla', '2classification', 64950, 'a', true]

  themeClass = "ag-theme-quartz-dark";

  // 行数据在这里赋值
  rowData: IRow[] = [
    { product: "Tesla", classification: "classification Y", price: 64950},
    { product: "Ford", classification: "F-Series", price: 33850},
    { product: "Toyota", classification: "Corolla", price: 29600},
    { product: 'Mercedes', classification: 'EQA', price: 48890},
    { product: 'Fiat', classification: '500', price: 15774},
    { product: 'Nissan', classification: 'Juke', price: 20675},
    { product: 'Nissan', classification: 'Juke', price: 20675},
    { product: 'Nissan', classification: 'Juke', price: 20675},
    { product: 'Nissan', classification: 'Juke', price: 20675},
    { product: 'Nissan', classification: 'Juke', price: 20675},
    { product: 'Nissan', classification: 'Juke', price: 20675},
    { product: 'Nissan', classification: 'Juke', price: 20675},
    { product: 'Nissan', classification: 'Juke', price: 20675},
    { product: 'Nissan', classification: 'Juke', price: 20675},
    { product: 'Nissan', classification: 'Juke', price: 20675},
    { product: 'Nissan', classification: 'Juke', price: 20675},
  ];

  // 列定义:定义和控制网格列。对应的是html中的[columnDefs]="colDefs"这个属性
  // headerName 定义列名
  //flex 调整列的大小
  //valueFormatter 设定数据的Format
  //cellRenderer: ChangeProductComponent 引入按钮或图片
  //editable: true 属性可直接编辑
  colDefs: ColDef<IRow,any>[] = [
    { headerName: "商品名称", field: "product", flex: 2, editable: true, checkboxSelection: true },
    { headerName: "分类", field: "classification", flex: 1 },
    { headerName: "价格", field: "price", valueFormatter: p => '￥' + p.value.toLocaleString(), flex: 1 },
    { cellRenderer: ChangeProductComponent,  cellRendererParams: { onClick: this.comeBackPopupData.bind(this)},flex: 2 },

  ];

  defaultColDef: ColDef = {
    flex: 1,
  }
  comeBackPopupData(e:any){
    this.rowData[e.rowIndex]={product:e.product, classification:e.classification, price:e.price}
    alert(JSON.stringify(e.product)+"aaaaaaaaaaaa")
    alert(JSON.stringify(e.classification)+"aaaaaaaaaaaa")
    alert(JSON.stringify(e.price)+"aaaaaaaaaaaa")
    alert(JSON.stringify(e.rowIndex)+"aaaaaaaaaaaa")
 console.log(e.rowData+"aaaaaaaaaaaa")
  }

  rowSelection = 'single';//设置多行选中 ，如果是mutiple则是多选，若是single则是单选
  pagination = false;
  paginationPageSize = 10;
  paginationPageSizeSelector = [10, 20, 30];
  
  }