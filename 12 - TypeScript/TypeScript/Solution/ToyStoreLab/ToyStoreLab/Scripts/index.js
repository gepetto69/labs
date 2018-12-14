System.register(['./ShoppingCart', './DummyData', 'jquery'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ShoppingCart_1, DummyData_1, jquery_1;
    return {
        setters:[
            function (ShoppingCart_1_1) {
                ShoppingCart_1 = ShoppingCart_1_1;
            },
            function (DummyData_1_1) {
                DummyData_1 = DummyData_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            }],
        execute: function() {
            jquery_1.default(function () {
                var cart;
                var selectedCategory;
                var selectedProduct;
                function init() {
                    var i;
                    var categories = DummyData_1.DummyData.categories;
                    var catSelect = jquery_1.default("#categories");
                    for (i = 0; i < categories.length; i += 1) {
                        jquery_1.default("<option>").text(categories[i].name)
                            .val(categories[i].id.toString())
                            .appendTo(catSelect);
                    }
                    cart = new ShoppingCart_1.ToyStore.ShoppingCart();
                }
                function renderCart() {
                    var i, tr$, td1$, td2$, tbody$;
                    tbody$ = jquery_1.default("#cartTable tbody");
                    tbody$.empty();
                    for (i = 0; i < cart.items.length; i += 1) {
                        td1$ = jquery_1.default("<td>").text(cart.items[i].product.name);
                        td2$ = jquery_1.default("<td>").text(cart.items[i].quantity);
                        tr$ = jquery_1.default("<tr>").append(td1$).append(td2$);
                        tbody$.append(tr$);
                    }
                }
                jquery_1.default('#categories').change(function () {
                    var i, products, prodSelect = jquery_1.default("#products"), catIndex = jquery_1.default("#categories").val();
                    selectedCategory = DummyData_1.DummyData.categories.filter(function (cat) { return cat.id == catIndex; })[0];
                    products = selectedCategory.products;
                    prodSelect.empty();
                    for (i = 0; i < products.length; i += 1) {
                        jquery_1.default("<option>").text(products[i].name)
                            .val(products[i].id.toString())
                            .appendTo(prodSelect);
                    }
                });
                jquery_1.default("#add").click(function () {
                    var quantity, prodIndex;
                    quantity = jquery_1.default("#quantity").val();
                    prodIndex = jquery_1.default("#products").val();
                    selectedProduct = selectedCategory.products.filter(function (prod) { return prod.id == prodIndex; })[0];
                    cart.addItem(selectedProduct, quantity);
                    renderCart();
                });
                init();
            });
        }
    }
});
//# sourceMappingURL=index.js.map