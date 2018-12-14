System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var OrderDetail;
    return {
        setters:[],
        execute: function() {
            OrderDetail = (function () {
                function OrderDetail(product, quantity) {
                    this.product = product;
                    this.quantity = quantity;
                }
                return OrderDetail;
            }());
            exports_1("OrderDetail", OrderDetail);
        }
    }
});
//# sourceMappingURL=OrderDetail.js.map