import { Component, OnInit } from '@angular/core';
import { ColDef, ICellRendererParams, GridReadyEvent, CellValueChangedEvent } from 'ag-grid-community'; // 列定义类型接口
import { ChangeProductComponent } from '../change-product/change-product.component';
import { HttpClient } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MessagePromptBox } from '../../common/messagePromptBox';


// 定义列接口
interface IRow {
  productId: number;
  productName: string;
  productNumber: number;
  productPrice: number;
  productType: string;
  productVersion: string;
}


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})

export class InventoryComponent implements OnInit {
  //检索项目定义
  product_id_search: string | null = null;
  product_type_search: string | null = null;
  product_name_search: string | null = null;


  gridApi: any;
  agInit(params: ICellRendererParams<any, any, any>): void { }
  refresh(params: ICellRendererParams<any, any, any>): boolean { return true }

  themeClass = "ag-theme-quartz-dark";

  preURL: string = "/api/product";
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
  // 行数据在这里赋值
  rowData: IRow[] = [];
  selectData: any[] = [];

  // 第三方组件  消息提示框
  reslutType: string = ''
  reslutTitle: string = ''
  reslutMsg: string = ''

  //配置http请求
  http: HttpClient

  constructor(httpClient: HttpClient,
    public messagePromptBox: MessagePromptBox) {
    this.http = httpClient;
  }

  ngOnInit(): void {
    this.http.post(`${this.preURL}/selectType`, {})
      .subscribe(
        (res: any) => {
          for (let i = 0; i < res.length; i++) {
            this.selectData.push({
              typeId: res[i].typeId,
              typeName: res[i].typeName
            })
          }
        })

  }
  // 列定义:定义和控制网格列。对应的是html中的[columnDefs]="colDefs"这个属性
  // headerName 定义列名
  //flex 调整列的大小
  //valueFormatter 设定数据的Format
  //cellRenderer: ChangeProductComponent 引入按钮或图片
  //editable: true 属性可直接编辑
  colDefs: ColDef<IRow, any>[] = [
    { headerName: "商品编号", field: "productId", flex: 1, checkboxSelection: true },
    { headerName: "名称", field: "productName", flex: 2 },
    { headerName: "数量", field: "productNumber", flex: 1 },
    { headerName: "价格", field: "productPrice", valueFormatter: p => '￥' + p.value, flex: 1 },
    { headerName: "类型", field: "productType", flex: 1 },
    { headerName: "型号", field: "productVersion", flex: 1 },
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
  paginationPageSize = 16;//分页，一页几行
  paginationPageSizeSelector = [25, 35, 45];//可以设置一页几行

  //检索
  searchProduct() {
    // 发送http请求
    this.http.post(`${this.preURL}/select`, { productId: this.product_id_search, productName: this.product_name_search, productType: this.product_type_search })
      .subscribe(
        (res: any) => {

          this.rowData = []
          for (let i = 0; i < res.length; i++) {
            // 行数据在这里赋值
            this.rowData.push({
              productId: res[i].productId,
              productName: res[i].productName,
              productNumber: res[i].productNumber,
              productPrice: res[i].productPrice,
              productType: res[i].productType,
              productVersion: res[i].productVersion
            })
          }
          if (this.rowData !== null) { this.gridApi.setRowData(this.rowData); }
        })
  }

  comeBackPopupData(e: any) {
    var row = this.gridApi.getDisplayedRowAtIndex(e.rowIndex);//这个对象中有个data属性，需要改data中的值
    if (e.buttonFlg) {
      //按行刷新数据，只刷新单行
      // row.data = { productId: e.productId, productName: e.productName, productNumber: e.productNumber, productPrice: e.productPrice, productType: e.productType, productVersion: e.productVersion }
      this.http.post(`${this.preURL}/update`, { productId: e.productId, productName: e.productName, productNumber: e.productNumber, productPrice: e.productPrice, productType: e.productType, productVersion: e.productVersion })
        .subscribe((res: any) => {
          // 判断查询状态
          if (res.reslutStatus == "OK") {
            this.reslutType = "success";
            this.reslutTitle = res.reslutTitle;
            this.reslutMsg = res.reslutMsg;
          } else {
            this.reslutType = "error";
            this.reslutTitle = res.reslutTitle;
            this.reslutMsg = res.reslutMsg;
          }
          this.messagePromptBox.createNotification(this.reslutType, this.reslutTitle, this.reslutMsg)
          this.searchProduct()
        }

        )
    } else {
      // 发送http请求
      this.http.post(`${this.preURL}/delete`, { productId: row.data.productId })
        .subscribe(
          (res: any) => {
            // 判断查询状态
            if (res.reslutStatus == "OK") {
              this.reslutType = "success";
              this.reslutTitle = res.reslutTitle;
              this.reslutMsg = res.reslutMsg;
            } else {
              this.reslutType = "error";
              this.reslutTitle = res.reslutTitle;
              this.reslutMsg = res.reslutMsg;
            }
            this.messagePromptBox.createNotification(this.reslutType, this.reslutTitle, this.reslutMsg)
            this.searchProduct()
          })
    }
    //按行刷新数据，只刷新单行
    // row.data = { productId: e.productId, productName: e.productName, productNumber: e.productNumber, productPrice: e.productPrice, productType: e.productType, productVersion: e.productVersion }
    // console.log(e)
    // this.gridApi.redrawRows({ rowNodes: [row] });
    //按单元格刷新数据a
    // this.rowData[e.rowIndex].product=e.product;
    // this.rowData[e.rowIndex].classification=e.classification;
    // this.rowData[e.rowIndex].price=e.price;
    // this.gridApi.refreshCells();
  }



}

