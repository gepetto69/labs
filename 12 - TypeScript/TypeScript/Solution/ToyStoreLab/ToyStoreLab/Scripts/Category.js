System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Category, SubCategory;
    return {
        setters:[],
        execute: function() {
            Category = (function () {
                function Category(id, name, description, products) {
                    if (products === void 0) { products = []; }
                    this.id = id;
                    this.name = name;
                    this.description = description;
                    this.products = products;
                }
                return Category;
            }());
            exports_1("Category", Category);
            SubCategory = (function (_super) {
                __extends(SubCategory, _super);
                function SubCategory(id, name, description, parent, products) {
                    if (products === void 0) { products = []; }
                    _super.call(this, id, name, description, products);
                    this.parent = parent;
                }
                return SubCategory;
            }(Category));
            exports_1("SubCategory", SubCategory);
        }
    }
});
//# sourceMappingURL=Category.js.map