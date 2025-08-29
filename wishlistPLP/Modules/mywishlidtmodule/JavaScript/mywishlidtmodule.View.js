// @module JJ.wishlistPLP.mywishlidtmodule
define('JJ.wishlistPLP.mywishlidtmodule.View'
,	[
	'jj_wishlistplp_mywishlidtmodule.tpl'
	
	,	'JJ.wishlistPLP.mywishlidtmodule.SS2Model'
	
	,	'Backbone'

	
	
    ]
, function (
	jj_wishlistplp_mywishlidtmodule_tpl
	
	,	mywishlidtmoduleSS2Model
	
	,	Backbone

	
)
{
    'use strict';

	// @class JJ.wishlistPLP.mywishlidtmodule.View @extends Backbone.View
	return Backbone.View.extend({

		template: jj_wishlistplp_mywishlidtmodule_tpl

	,	
	// initialize: function (options) {
	// 	// console.log("options",this.options)
	// 	// let itemid = this.options.container.layout.currentView.model.attributes.items.models
	// 	// console.log("itemd",itemid)
		
		

	// 	// 	/*  Uncomment to test backend communication with an example service
	// 	// 		(you'll need to deploy and activate the extension first)
	// 	// 	*/

	// 	// 	// this.model = new mywishlidtmoduleModel();
	// 	// 	// var self = this;
    //     //  	// this.model.fetch().done(function(result) {
	// 	// 	// 	self.message = result.message;
	// 	// 	// 	self.render();
    //   	// 	// });
	// 	 this.container = options.container;
    // this.model = options.model;
	// // console.log('Item ID:', this.model.get('internalid'));
	// console.log('Model:', this.model);

    // if (this.model) {
    //     console.log('Item ID:', this.model.get('internalid'));
    //     this.model.set('quantity', 1); // or any logic you need
    // } else {
    //     console.warn('Model not passed to mywishlidtmoduleView');
    // }
	
	// }
	initialize: function (options) {
    this.container = options.container;
    this.model = options.model;

    if (!this.model) {
        console.warn('Model not passed to mywishlidtmoduleView');
    } else {
        console.log('Model received in wishlist view:', this.model.toJSON());
    }
	let ItemModel = this.model.toJSON()
	let internalId = ItemModel.internalid
	console.log("internalId",internalId)

	this.model.set('_minimumQuantity', 2); // or any desired value
    console.log("Quantity set to:", this.model.get('_minimumQuantity'));
}


	,	events: {
		}

	,	bindings: {
		}

	, 	childViews: {

    }

		//@method getContext @return JJ.wishlistPLP.mywishlidtmodule.View.Context
	,	getContext: function getContext()
		{
			//@class JJ.wishlistPLP.mywishlidtmodule.View.Context
			this.message = this.message || 'Hello World!!'
			return {
				message: this.message
			};
		}
	});
});
