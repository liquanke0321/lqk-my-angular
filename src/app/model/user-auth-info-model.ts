export class UserAuthInfoModel {


  // アカウントコード
  public accountCd: string = '';
  /**
      * 店铺地址，店铺地址
      */
  public address?: null | string;
  /**
   * 店铺年龄，店铺年龄
   */
  public age?: number | null;
  /**
   * 昵称，界面显示的名字
   */
  public aliasname?: string;
  /**
   * 邮箱，店铺关联邮箱
   */
  public mail?: null | string;
  /**
   * 密码，登录用的密码
   */
  public password: string = '';
  /**
   * 电话号码，店铺电话号码
   */
  public phone_number?: number | null;
  /**
   * 用户ID，用户唯一ID
   */
  public userid: number = 0;
  /**
   * 用户名，登录用的用户名
   */
  public username: string = '';

  constructor() { }
}
