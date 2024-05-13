import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { UserContractComponent } from './user-contract/user-contract.component';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { MainComponent } from './main/main.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { IconsProviderModule } from './icons-provider.module';
import { HomeComponent } from './home/home.component';
import { UserInformationComponent } from './user-information/user-information.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    UserContractComponent,
    RegisterComponent,
    LoginComponent,
    ErrorComponent,
    MainComponent,
    HomeComponent,
    UserInformationComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NzNotificationModule,
    FormsModule,
    NzMenuModule,
    IconsProviderModule,
    NzLayoutModule
  ],
  providers: [
    provideClientHydration(),
    { provide: NZ_I18N, useValue: zh_CN },
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
