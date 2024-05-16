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
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WelcomeComponent,
    MainComponent,
    HomeComponent,
    UserInformationComponent,
    InventoryComponent,
    ChangeProductComponent,
    PopupComponent
  ],
  imports: [WelcomeRoutingModule,
    NzMenuModule,
    IconsProviderModule,
    NzLayoutModule,
    AgGridAngular,
    NzModalModule,
    FormsModule
  ],
  exports: [
    WelcomeComponent
  ]
})
export class WelcomeModule { }
