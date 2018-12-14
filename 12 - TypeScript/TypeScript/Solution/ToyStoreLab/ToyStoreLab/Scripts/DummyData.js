System.register(['./Category', './Product'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Category_1, Product_1;
    var DummyData;
    return {
        setters:[
            function (Category_1_1) {
                Category_1 = Category_1_1;
            },
            function (Product_1_1) {
                Product_1 = Product_1_1;
            }],
        execute: function() {
            (function (DummyData) {
                DummyData.categories = [
                    new Category_1.Category(1, 'Sports', 'Everything a kid needs to play outside'),
                    new Category_1.Category(2, 'Boardgames & Puzzles', 'Everything a kid needs to play inside'),
                    new Category_1.Category(3, 'Dolls', 'Everything a kid needs to play anywhere')
                ];
                DummyData.categories[0].products = [
                    new Product_1.Product(1, "Skateboard", 49.95, "it's a skateboard"),
                    new Product_1.Product(2, "Waveboard", 69.95, "it's a waveboard"),
                    new Product_1.Product(3, "Longboard", 119.95, "it's a longboard")
                ];
                DummyData.categories[1].products = [
                    new Product_1.Product(1, "checkers", 49.95, "it's a checkersboard"),
                    new Product_1.Product(2, "taj mahal, 1000 pieces", 69.95, "it's a puzzle")
                ];
                DummyData.categories[2].products = [
                    new Product_1.Product(1, "Barbie", 49.95, "it's Barbie!"),
                    new Product_1.Product(2, "Kenn", 69.95, "it's Kenn!"),
                    new Product_1.Product(3, "Furby", 119.95, "it's Furby!")
                ];
            })(DummyData = DummyData || (DummyData = {}));
            exports_1("DummyData", DummyData);
        }
    }
});
//# sourceMappingURL=DummyData.js.map