import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { MainComponent } from '../main/main.component';
import { HomeComponent } from '../home/home.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { IconsProviderModule } from '../../icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { UserInformationComponent } from '../user-information/user-information.component';
import { InventoryComponent } from '../inventory/inventory.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ChangeProductComponent } from '../change-product/change-product.component';
import { PopupComponent } from '../popup/popup.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { AddInbentoryComponent } from '../inbentory-in/add-inbentory/add-inbentory.component';
import { CutInbentoryComponent } from '../inbentory-out/cut-inbentory/cut-inbentory.component';


@NgModule({
  declarations: [
    WelcomeComponent,
    MainComponent,
    HomeComponent,
    UserInformationComponent,
    InventoryComponent,
    ChangeProductComponent,
    PopupComponent,
    AddInbentoryComponent,
    CutInbentoryComponent
  ],
  imports: [WelcomeRoutingModule,
    NzMenuModule,
    IconsProviderModule,
    NzLayoutModule,
    AgGridAngular,
    NzModalModule,
    FormsModule,
    KeyValuePipe,
    CommonModule,//使用内置指令的时候必须要引入
    NzLayoutModule,
    NzFormModule,
    ReactiveFormsModule

  ],
  exports: [
    WelcomeComponent
  ]
})
export class WelcomeModule { }
