export class InbentoryModel {
    /**
       * 入库单号，入库单号
       */
    public inventory_id: string = "";
    /**
     * 商品编号，商品编号
     */
    public product_id: string = "";
    /**
     * 商品名称，商品名称
     */
    public product_name: string = "";
    /**
     * 商品数量，商品总共的数量
     */
    public product_number: number = 0;
    /**
     * 商品进价，商品进价
     */
    public product_price: number = 0;
    /**
     * 商品类型，商品类型
     */
    public product_type: string = "";
    /**
     * 商品型号，商品型号
     */
    public product_version: string = "";
    constructor() { }
}