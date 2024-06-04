export class InbentoryModel {
    public url: string = '';
    /**
        * 经办人员编码，经办人员编码
        */
    public handling_personnel_code: string = '';
    /**
     * 入库时间，入库时间
     */
    public inventory_date: Date = new Date('2020/09/06 05:30:00');
    /**
     * 入库单号，入库单号
     */
    public inventory_id: string = '';
    /**
     * 订单金额，订单金额
     */
    public payment: number = 0;
    /**
     * 供货单位编码，供货单位编码
     */
    public supplier_code?: string;

    constructor() { }
}