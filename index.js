'use strict';

var topRequire = require('top-require'),
    mongoose   = topRequire('mongoose');

function compare(varA, varB) {
    var asStrA = compare.str(varA),
        asStrB = compare.str(varB);

    if(asStrA === null && asStrB === null ) return false; // for security reasons

    return  asStrA === asStrB;
}

compare.str = function (anyVAR) {

    if (!anyVAR) return null;

    if (typeof anyVAR === 'string') {
        if (mongoose.Types.ObjectId.isValid(anyVAR)) {
            return anyVAR;
        }
        return null;
    }

    if (anyVAR.constructor === mongoose.Types.ObjectId) {
        return anyVAR.toString();
    }

    if (typeof anyVAR === 'object' && anyVAR._id) {
        return compare.str(anyVAR._id);
    }

    return null;

};

module.exports = compare;