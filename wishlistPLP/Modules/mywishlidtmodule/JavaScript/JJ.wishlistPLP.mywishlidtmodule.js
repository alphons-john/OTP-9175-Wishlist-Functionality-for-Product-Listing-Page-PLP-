
define(
    'JJ.wishlistPLP.mywishlidtmodule'
    , [
        'JJ.wishlistPLP.mywishlidtmodule.View',

        'Facets.ItemCell.View',

        'ProductDetails.AddToProductList.View',
        'Item.Model',
        'Product.Model',
        'ProductList.ControlItem.View'

    ]
    , function (
        mywishlidtmoduleView,

        FacetsItemCellView,

        ProductDetailsAddToProductListView,
        ItemModel,
        ProductModel,
        ProductListControlItemView,


    ) {
        'use strict';

            //Extend ProductList.ControlItem.View to expose checked() method
            const ProductListControlItemViewExtension = _.extend({}, ProductListControlItemView, {
                getCheckedFunction: function () {
                    return this.checked ? this.checked.bind(this) : function () { return false; };
                }
            });

        return {
            mountToApp: function mountToApp(container) {
                // using the 'Layout' component we add a new child view inside the 'Header' existing view 
                // (there will be a DOM element with the HTML attribute data-view="Header.Logo")
                // more documentation of the Extensibility API in
                // https://system.netsuite.com/help/helpcenter/en_US/APIs/SuiteCommerce/Extensibility/Frontend/index.html

                /** @type {LayoutComponent} */
                var layout = container.getComponent('Layout');


                try {


                    _.extend(FacetsItemCellView.prototype.childViews, {
                        AddToProductList: function () {
                            const itemModel = this.model;
                            console.log('PLP itemModel:', itemModel);
                            

                            const productModel = new ProductModel({
                                item: itemModel,
                                quantity: 1
                            })
                    

                            productModel.areAttributesValid = function (attributes, validators) {
                                const current_validation = _.extend({}, this.validation);
                                console.log("current_validation", current_validation);

                                _.extend(this.validation, validators || {});
                                const result = this.isValid(attributes);

                                console.log("result", result);
                                console.log("attributes", attributes);

                                this.validation = current_validation;
                                return result;
                            };

                            productModel.isSelectionComplete = function () {
                                const options = this.get('options').where({ isMandatory: true });

                                if (!options || options.length === 0) {
                                    return true;
                                }
                                return _.all(options, function (option) {
                                    return option.isValid(true);
                                });
                            };

                            productModel.getSelectedOptions = function () {
                                const selected_options = [];

                                this.get('options').each(function (option) {
                                    if (!option.validate() && !!option.get('value')) {
                                        selected_options.push(option.get('value'));
                                    }
                                });

                                return selected_options;
                            };

                            return new ProductDetailsAddToProductListView({
                                model: productModel,
                                application: this.options.application,
                                childViews: {
                                    WishlistModuleView: function () {
                                        return new mywishlidtmoduleView({
                                            container: this.options.application,
                                            model: productModel
                                        });
                                    }
                                }
                            });
                        }
                    });

                    _.extend(FacetsItemCellView.prototype, {
                    events: _.extend({}, FacetsItemCellView.prototype.events, {
                        'mouseover [data-action="wishlist-hover"]': "showTooltip",
                    }),
                
                    render: function () {
                        const view = FacetsItemCellView.__super__.render.apply(this, arguments);
                        this.updateWishlistButtonColor(); // Run after DOM is rendered
                        return view;
                    },
                
                    updateWishlistButtonColor: function () {
                        this.$el.find("[data-item-id]").each(function () {
                        const $item = jQuery(this);
                        const $checkbox = $item.find(
                            "input.product-list-control-item-checkbox"
                        );
                        const $button = $item.find(".product-list-control-button-wishlist");
                
                        if ($checkbox.length && $button.length) {
                            if ($checkbox.is(":checked")) {
                            $button.addClass("wishlist-active");
                            } else {
                            $button.removeClass("wishlist-active");
                            }
                        }
                        });
                    },
                
                    showTooltip: function (e) {
                        if (e && e.currentTarget) {
                        const $target = jQuery(e.currentTarget);
                        const $item = $target.closest("[data-item-id]");
                        const isMatrixItem =
                            !!this.model.get("matrix_parent") ||
                            (this.model.get("matrixchilditems_detail") || []).length > 0;
                
                        const updateTooltipAndColor = function ($checkbox, $button) {
                            if ($checkbox.length && $button.length) {
                            const isChecked = $checkbox.is(":checked");
                            const tooltipMessage = isChecked
                                ? "Remove from Wishlist"
                                : "Add to Wishlist";
                            $target.removeAttr("title").attr("data-tooltip", tooltipMessage);
                
                            if (isChecked) {
                                $button.addClass("wishlist-active");
                            } else {
                                $button.removeClass("wishlist-active");
                            }
                            }
                        };
                
                        if (isMatrixItem) {
                            setTimeout(function () {
                            const $modal = jQuery(".modal-container:visible");
                            const $checkbox = $modal.find(
                                "input.product-list-control-item-checkbox"
                            );
                            const $button = $modal.find(
                                ".product-list-control-button-wishlist"
                            );
                            updateTooltipAndColor($checkbox, $button);
                            }, 500);
                        } else {
                            const $checkbox = $item.find(
                            "input.product-list-control-item-checkbox"
                            );
                            const $button = $item.find(".product-list-control-button-wishlist");
                            updateTooltipAndColor($checkbox, $button);
                        }
                        }
                    },
                    });
 
                    

                    const originalGetContext = FacetsItemCellView.prototype.getContext;

                    FacetsItemCellView.prototype.getContext = function () {
                        const context = originalGetContext.apply(this, arguments);

                        const itemModel = this.model;
                        const productModel = new ProductModel({
                            item: itemModel,
                            quantity: 1
                        });

                        const isSimpleItem = !productModel.get('options') ||
                            productModel.get('options').where({ isMandatory: true }).length === 0;

                        return _.extend(context, {
                             isSimpleItem,
                        });
                        
                    };
                    

                }
                catch (e) {
                    console.error('Error extending FacetsItemCellView:', e);
                }

            }
        };
    });



