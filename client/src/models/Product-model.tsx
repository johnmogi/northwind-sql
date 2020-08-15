
export class ProductModel { 
    public constructor(
        public ProductID?: number,
        public ProductName?: string,
        public SupplierID?: number,
        public CategoryID?: number,
        public QuantityPerUnit?: string,
        public UnitPrice?: number,
        public UnitsOnOrder?: number
        ) {} }
