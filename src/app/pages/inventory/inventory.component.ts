import { Component, OnInit } from '@angular/core';
import { ColDef, ICellRendererParams, GridReadyEvent, CellValueChangedEvent } from 'ag-grid-community'; // 列定义类型接口
import { ChangeProductComponent } from '../change-product/change-product.component';


// 定义列接口
interface IRow {
  productId:number;
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

  // componentDidMount() {
  //   this.forceUpdate();
  // }
  //加载数据时给gridApi赋值，为了后面取行数据时用
  gridApi: any;
  agInit(params: ICellRendererParams<any, any, any>): void { }
  refresh(params: ICellRendererParams<any, any, any>): boolean { return true }

  themeClass = "ag-theme-quartz-dark";

  // gridColumnApi: any;
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
  indexa:number=1
  // 行数据在这里赋值
  rowData: IRow[] = [
    { productId: 10000101, product: "Tesla", classification: "classification Y", price: 64950 },
    { productId: 10000102, product: "Ford", classification: "F-Series", price: 33850 },
    { productId: 10000103, product: "Toyota", classification: "Corolla", price: 29600 },
    { productId: 10000104, product: 'Mercedes', classification: 'EQA', price: 48890 },
    { productId: 10000105, product: 'Fiat', classification: '500', price: 10000105774 },
    { productId: 10000106, product: 'Nissan', classification: 'Juke', price: 20675 },
    { productId: 10000107, product: 'Nissan', classification: 'Juke', price: 20675 },
    { productId: 10000108, product: 'Nissan', classification: 'Juke', price: 20675 },
    { productId: 10000109, product: 'Nissan', classification: 'Juke', price: 20675 },
    { productId: 10000110, product: 'Nissan', classification: 'Juke', price: 20675 },
    { productId: 10000111, product: 'Nissan', classification: 'Juke', price: 20675 },
    { productId: 10000112, product: 'Nissan', classification: 'Juke', price: 20675 },
    { productId: 10000113, product: 'Nissan', classification: 'Juke', price: 20675 },
    { productId: 10000114, product: 'Nissan', classification: 'Juke', price: 20675 },
    { productId: 10000115, product: 'Nissan', classification: 'Juke', price: 20675 },
    { productId: 10000116, product: 'Nissan', classification: 'Juke', price: 20675 },
  ];

  // 列定义:定义和控制网格列。对应的是html中的[columnDefs]="colDefs"这个属性
  // headerName 定义列名
  //flex 调整列的大小
  //valueFormatter 设定数据的Format
  //cellRenderer: ChangeProductComponent 引入按钮或图片
  //editable: true 属性可直接编辑
  colDefs: ColDef<IRow, any>[] = [
    { headerName: "商品ID", field: "productId", flex: 1, editable: true, checkboxSelection: true },
    { headerName: "商品名称", field: "product", flex: 2 },
    { headerName: "分类", field: "classification", flex: 1 },
    { headerName: "价格", field: "price", valueFormatter: p => '￥' + p.value.toLocaleString(), flex: 1 },
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

  comeBackPopupData(e: any) {
    //按行刷新数据，只刷新单行
    var row = this.gridApi.getDisplayedRowAtIndex(e.rowIndex)!;//这个对象中有个data属性，需要改data中的值
    row.data = { productID:e.productID, product: e.product, classification: e.classification, price: e.price }
    this.gridApi.redrawRows({ rowNodes: [row] });

    //按单元格刷新数据a
    // this.rowData[e.rowIndex].product=e.product;
    // this.rowData[e.rowIndex].classification=e.classification;
    // this.rowData[e.rowIndex].price=e.price;
    // this.gridApi.refreshCells();
  }



}

