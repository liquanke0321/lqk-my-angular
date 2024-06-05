import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable, Observer } from 'rxjs';
import { UserAuthInfoModel } from '../../model/user-auth-info-model';
import { CommonService } from '../../common/common.service';


@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrl: './user-information.component.css'
})
export class UserInformationComponent implements OnInit {

  validateForm: FormGroup<{
    userName: FormControl<string>;
    mobile: FormControl<number>;
    email: FormControl<string>;
    password: FormControl<string>;
    confirm: FormControl<string>;
    aliasname: FormControl<string>;
    age: FormControl<string>;
    address: FormControl<string>;
  }>;

  isDisabled: boolean = false;
  authInfo = this.common.getAuthInfo()
  username: string = this.authInfo.username
  mobile: number | null | undefined = this.authInfo.phone_number
  aliasname: string | null | undefined = this.authInfo.aliasname
  email: string | null | undefined = this.authInfo.mail
  age: number | null | undefined = this.authInfo.age
  password: string = this.authInfo.password
  address: string | null | undefined= this.authInfo.address

  
  constructor(
    private fb: NonNullableFormBuilder,
    public common: CommonService
  ) {

    const { required, maxLength, minLength, email, mobile } = MyValidators;
    this.validateForm = this.fb.group({
      userName: ['', [required, maxLength(12), minLength(6)], [this.userNameAsyncValidator]],
      mobile: [0, [required, mobile]],
      email: ['', [required, email]],
      password: ['', [required]],
      aliasname: ['', [required]],
      age: ['', [required]],
      address: ['', [required]],
      confirm: ['', [this.confirmValidator]]
    });
  }
  ngOnInit(): void {
    this.toggleDisabled()
  }
  //如果没有找到，将使用' default '再次搜索
  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '必填项'
    },
    en: {
      required: 'Input is required'
    },
    default: {
      email: '邮箱格式不正确/The input is not valid email'
    }
  };

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  userNameAsyncValidator: AsyncValidatorFn = (control: AbstractControl) =>
    new Observable((observer: Observer<MyValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          observer.next({
            duplicated: { 'zh-cn': `用户名已存在`, en: `The username is redundant!` }
          });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  confirmValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  toggleDisabled() {
    if (this.isDisabled) {
      this.validateForm.get('mobile')?.enable();
      this.validateForm.get('email')?.enable();
      this.validateForm.get('password')?.enable();
      this.validateForm.get('age')?.enable();
      this.validateForm.get('address')?.enable();
      this.validateForm.get('aliasname')?.enable();
    } else {
      this.validateForm.get('mobile')?.disable();
      this.validateForm.get('email')?.disable();
      this.validateForm.get('password')?.disable();
      this.validateForm.get('age')?.disable();
      this.validateForm.get('address')?.disable();
      this.validateForm.get('aliasname')?.disable();
    }
    this.isDisabled = !this.isDisabled;
  }
  saveChangeData(){
    console.log("userinfo Change success")
  }
}

export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<string, NzSafeAny>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

export class MyValidators extends Validators {
  static override minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return { minlength: { 'zh-cn': `最小长度为 ${minLength}`, en: `MinLength is ${minLength}` } };
    };
  }

  static override maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return { maxlength: { 'zh-cn': `最大长度为 ${maxLength}`, en: `MaxLength is ${maxLength}` } };
    };
  }

  static mobile(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isMobile(value)
      ? null
      : { mobile: { 'zh-cn': `手机号码格式不正确`, en: `Mobile phone number is not valid` } };
  }
}

function isEmptyInputValue(value: NzSafeAny): boolean {
  return value == null || value.length === 0;
}

function isMobile(value: string): boolean {
  return typeof value === 'string' && /(^1\d{10}$)/.test(value);
}

