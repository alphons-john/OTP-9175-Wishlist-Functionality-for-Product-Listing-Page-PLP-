// Model.js
// -----------------------
// @module Case
define("JJ.wishlistPLP.mywishlidtmodule.SS2Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "Modules/mywishlidtmodule/SuiteScript2/mywishlidtmodule.Service.ss"
            ),
            true
        )
});
});
