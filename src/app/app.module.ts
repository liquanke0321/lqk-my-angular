import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// 中文
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
// 英文
import { en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';


import { WelcomeModule } from './pages/welcome/welcome.module';
import { AuthGuard } from './common/auth.guard';
import { CommonService } from './common/common.service';

// 浏览器设定的语言
let lang = (localStorage.getItem('currentLanguage') 
  || window.navigator.language || '').includes('zh') ? 'zh' : 'en';

// 切换语言
let useLang: any = zh_CN;
switch(lang) {
  case 'zh': registerLocaleData(zh); useLang = zh_CN; break;
  default: registerLocaleData(en); useLang = en_US; break;
}

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ErrorComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NzNotificationModule,
    FormsModule,
    NzMenuModule,
    IconsProviderModule,
    NzLayoutModule,
    WelcomeModule
  ],
  providers: [
    provideClientHydration(),
    { provide: NZ_I18N, useValue: useLang },
    provideAnimationsAsync(),
    provideHttpClient(),
    AuthGuard,
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
