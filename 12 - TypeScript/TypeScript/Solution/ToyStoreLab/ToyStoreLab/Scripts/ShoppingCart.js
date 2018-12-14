System.register(['./OrderDetail'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var OrderDetail_1;
    var ToyStore;
    return {
        setters:[
            function (OrderDetail_1_1) {
                OrderDetail_1 = OrderDetail_1_1;
            }],
        execute: function() {
            (function (ToyStore) {
                var ShoppingCart = (function () {
                    function ShoppingCart(items) {
                        if (items === void 0) { items = []; }
                        this.items = items;
                    }
                    ShoppingCart.prototype.addItem = function (itemOrProduct, quantity) {
                        var item;
                        if (itemOrProduct instanceof OrderDetail_1.OrderDetail) {
                            item = itemOrProduct;
                        }
                        else {
                            item = new OrderDetail_1.OrderDetail(itemOrProduct, quantity);
                        }
                        return this.items.push(item);
                    };
                    return ShoppingCart;
                }());
                ToyStore.ShoppingCart = ShoppingCart;
            })(ToyStore = ToyStore || (ToyStore = {}));
            exports_1("ToyStore", ToyStore);
        }
    }
});
//# sourceMappingURL=ShoppingCart.js.map