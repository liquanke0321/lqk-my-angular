import { UserAuthInfoModel } from "../model/user-auth-info-model";

export class CommonService {
    
  private authInfo: UserAuthInfoModel = new UserAuthInfoModel;

  public getAuthInfo(): UserAuthInfoModel {
    return this.authInfo;
  }
  public setAuthInfo(info: UserAuthInfoModel): void {
    this.authInfo = info;
  }
  public logout(): void {
    this.authInfo = new UserAuthInfoModel();
  }
}