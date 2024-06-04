import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { MainComponent } from '../main/main.component';
import { HomeComponent } from '../home/home.component';
import { UserInformationComponent } from '../user-information/user-information.component';
import { InventoryComponent } from '../inventory/inventory.component';
import { AuthGuard } from '../../common/auth.guard';
import { AddInbentoryComponent } from '../inbentory-in/add-inbentory/add-inbentory.component';
import { CutInbentoryComponent } from '../inbentory-out/cut-inbentory/cut-inbentory.component';

const routes: Routes = [

  {
    path: '', component: WelcomeComponent,
    children: [
      { path: '', component: HomeComponent },//,  canActivate: [AuthGuard]
      { path: 'main', component: MainComponent },//,  canActivate: [AuthGuard]
      { path: 'home', component: HomeComponent },//,  canActivate: [AuthGuard]
      { path: 'inventory', component: InventoryComponent },//,  canActivate: [AuthGuard]
      { path: 'userInformation', component: UserInformationComponent },//,  canActivate: [AuthGuard]
      { path: 'addInbentory', component: AddInbentoryComponent },//,  canActivate: [AuthGuard]
      { path: 'cutInbentory', component: CutInbentoryComponent },//,  canActivate: [AuthGuard]
      // { path: '**', component: MainComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
