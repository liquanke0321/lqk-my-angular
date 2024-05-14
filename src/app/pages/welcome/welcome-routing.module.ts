import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { MainComponent } from '../main/main.component';
import { HomeComponent } from '../home/home.component';
import { UserInformationComponent } from '../user-information/user-information.component';
import { InventoryComponent } from '../inventory/inventory.component';

const routes: Routes = [

  {
    path: '', component: WelcomeComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'main', component: MainComponent },
      { path: 'home', component: HomeComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'userInformation', component: UserInformationComponent },
      // { path: '**', component: MainComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
