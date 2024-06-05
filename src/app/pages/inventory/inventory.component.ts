import { Component, OnInit } from '@angular/core';
import { ColDef, ICellRendererParams, GridReadyEvent, CellValueChangedEvent } from 'ag-grid-community'; // 列定义类型接口
import { ChangeProductComponent } from '../change-product/change-product.component';
import { HttpClient } from '@angular/common/http';


// 定义列接口
interface IRow {
  productId: number;
  productName: string;
  productNumber: number;
  productPrice: string;
  productType: string;
  productVersion: string;
  inventoryId: string;
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})

export class InventoryComponent {
  //检索项目定义
  productId_serch: string = "";


  gridApi: any;
  agInit(params: ICellRendererParams<any, any, any>): void { }
  refresh(params: ICellRendererParams<any, any, any>): boolean { return true }

  themeClass = "ag-theme-quartz-dark";

  preURL :string = "/api/product"; 
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
  indexa: number = 1
  // 行数据在这里赋值
  rowData: IRow[] = [

  ];

  //配置http请求
  http: HttpClient
  constructor(httpClient: HttpClient,) {
    this.http = httpClient;
  }
  // 列定义:定义和控制网格列。对应的是html中的[columnDefs]="colDefs"这个属性
  // headerName 定义列名
  //flex 调整列的大小
  //valueFormatter 设定数据的Format
  //cellRenderer: ChangeProductComponent 引入按钮或图片
  //editable: true 属性可直接编辑
  colDefs: ColDef<IRow, any>[] = [
    { headerName: "商品编号", field: "productId", flex: 1, editable: true, checkboxSelection: true },
    { headerName: "名称", field: "productName", flex: 2 },
    { headerName: "数量", field: "productNumber", flex: 1 },
    { headerName: "价格", field: "productPrice", valueFormatter: p => '￥' + p.value.toLocaleString(), flex: 1 },
    { headerName: "类型", field: "productType", flex: 1 },
    { headerName: "型号", field: "productVersion", flex: 1 },
    { headerName: "入库单号", field: "inventoryId", flex: 1 },
    { cellRenderer: ChangeProductComponent, cellRendererParams: { onClick: this.comeBackPopupData.bind(this) }, flex: 2 },
  ];
  onCellValueChanged = (event: CellValueChangedEvent) => {
    console.log(`New Cell Value: ${event.value}`);
  }
  defaultColDef: ColDef = {
    flex: 1,
  }

  rowSelection: "single" | "multiple" = "multiple";//设置多行选中 ，如果是mutiple则是多选，若是single则是单选
  pagination = true;//控制是否分页
  paginationPageSize = 10;//分页，一页几行
  paginationPageSizeSelector = [10, 20, 30];//可以设置一页几行

  searchProduct() {
    // 发送http请求
    this.http.post(`${this.preURL}/select`, { productId_serch: this.productId_serch, })
      .subscribe(
        (res: any) => { 
        })
  }

  comeBackPopupData(e: any) {
    var row = this.gridApi.getDisplayedRowAtIndex(e.rowIndex)!;//这个对象中有个data属性，需要改data中的值
    if (e.buttonFlg) {
      //按行刷新数据，只刷新单行
      row.data = { productId: e.productId, product: e.product, classification: e.classification, price: e.price }
      this.gridApi.redrawRows({ rowNodes: [row] });
      //在这里写更新的后台 通信逻辑
    } else {
      this.gridApi.hideOverlay()
      //在这里写删除的后台 通信逻辑
    }
    //按单元格刷新数据a
    // this.rowData[e.rowIndex].product=e.product;
    // this.rowData[e.rowIndex].classification=e.classification;
    // this.rowData[e.rowIndex].price=e.price;
    // this.gridApi.refreshCells();
  }



}

