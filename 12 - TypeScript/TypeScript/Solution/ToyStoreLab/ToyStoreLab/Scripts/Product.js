System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Product;
    return {
        setters:[],
        execute: function() {
            Product = (function () {
                function Product(id, name, price, description) {
                    this.id = id;
                    this.name = name;
                    this.price = price;
                    this.description = description;
                }
                Object.defineProperty(Product.prototype, "priceInclVAT", {
                    get: function () {
                        return this.price * 1.21;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Product;
            }());
            exports_1("Product", Product);
        }
    }
});
//# sourceMappingURL=Product.js.map