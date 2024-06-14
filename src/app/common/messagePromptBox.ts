import { Injectable } from "@angular/core";
import { NzNotificationService } from "ng-zorro-antd/notification";



@Injectable({ providedIn: 'root' })//@Injectable用法 https://blog.csdn.net/Temo_piu/article/details/139669806?spm=1001.2014.3001.5501
export class MessagePromptBox {

    constructor(private notification: NzNotificationService) {
    }

    public createNotification(reslutType: string, reslutTitle: string, reslutMsg: string): void {
        this.notification.create(
            reslutType,
            reslutTitle,
            reslutMsg
        );
    }
}