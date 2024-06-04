export class CutInbentoryModel {
    /** 入库单号，入库单号
     */
    public inventory_id: string = "";
    /**
     * 商品数量，商品数量
     */
    public out_product_number: number = 0;
    /**
     * 商品编号，商品编号
     */
    public product_id: string = "";
    /**
     * 商品名称，商品名称
     */
    public product_name: string = "";
    /**
     * 商品类型，商品类型
     */
    public product_type: string = "";
    /**
     * 商品型号，商品型号
     */
    public product_version: string = "";
    /**
     * 出售数量，出售数量
     */
    public sell_number: number = 0;
    /**
     * 出售单价，出售单价
     */
    public sell_price: number = 0;
    constructor(
    ) { }
}