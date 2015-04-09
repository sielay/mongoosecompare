'use strict';

var topRequire = require('top-require'),
    mongoose   = topRequire('mongoose'),
    validRegexp = /^[0-9a-fA-F]{24}$/;

function compare(varA, varB) {
    var asStrA = compare.str(varA),
        asStrB = compare.str(varB);

    if(asStrA === null && asStrB === null ) return false; // for security reasons

    return  asStrA === asStrB;
}

compare.str = function (anyVAR) {

    if (!anyVAR) return null;

    if (typeof anyVAR === 'string') {
        if (compare.valid(anyVAR)) {
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

compare.valid= function(string) {
    return validRegexp.test(string);
};

module.exports = compare;