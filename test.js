'use strict';

var should   = require('should'),
    mComp    = require('./index'),
    mongoose = require('mongoose');

var objectID   = mongoose.Types.ObjectId(),
    objectID2  = mongoose.Types.ObjectId(),
    asString   = objectID.toString(),
    asString2  = objectID2.toString(),
    someObject = {
        _id: objectID
    },
    someObject2 = {
        _id: objectID2
    },
    someObject3 = {
        _id: asString2
    },
    someObject4 = {
        _id: 'adsfadssd'
    };

describe('Fallback to string', function () {

    it('Should validate ObjectIDs', function() {
        should(mComp.valid('wok express')).be.false;
        should(mComp.valid('#wok express')).be.false;
        should(mComp.valid(asString)).be.true;
        should(mComp.valid(asString2)).be.true;
        should(mongoose.Types.ObjectId.isValid('wok express')).be.false;
        should(mongoose.Types.ObjectId.isValid('#wok express')).be.true;
        should(mongoose.Types.ObjectId.isValid(asString)).be.true;
        should(mongoose.Types.ObjectId.isValid(asString2)).be.true;
    });


    it('Should understand an Object ID ', function () {
        should(mComp.str(objectID)).equal(asString);
        should(mComp.str('invalidID')).be.null;
    });

    it('Should understand a String', function () {
        should(mComp.str(asString)).equal(asString);
    });

    it('Should understand an Object', function () {
        should(mComp.str(someObject)).equal(asString);
        should(mComp.str(someObject2)).equal(asString2);
        should(mComp.str(someObject3)).equal(asString2);
        should(mComp.str({})).be.null;
        should(mComp.str(undefined)).be.null;
        should(mComp.str(null)).be.null;
        should(mComp.str(0)).be.null;
        should(mComp.str(Number(0))).be.null;
        should(mComp.str(true)).be.null;
        should(mComp.str(someObject4)).be.null;
    });

});

describe('Comparision', function () {

    it('Handle sensible compare', function () {

        should(mComp(objectID, objectID)).be.true;
        should(mComp(objectID, asString)).be.true;
        should(mComp(objectID, someObject)).be.true;

        should(mComp(asString, objectID)).be.true;
        should(mComp(someObject, objectID)).be.true;

        should(mComp(objectID, objectID2)).be.false;
        should(mComp(objectID, asString2)).be.false;
        should(mComp(objectID, someObject2)).be.false;
        should(mComp(objectID, someObject3)).be.false;
        should(mComp(objectID, someObject4)).be.false;

        // 2

        should(mComp(objectID2, objectID2)).be.true;
        should(mComp(objectID2, asString2)).be.true;
        should(mComp(objectID2, someObject2)).be.true;
        should(mComp(objectID2, someObject3)).be.true;

        should(mComp(asString2, objectID2)).be.true;
        should(mComp(someObject2, objectID2)).be.true;

        should(mComp(objectID2, objectID)).be.false;
        should(mComp(objectID2, asString)).be.false;
        should(mComp(objectID2, someObject)).be.false;

        should(mComp(objectID2, someObject4)).be.false;

    });

    it('Handle stupid compare', function() {

        [1,3.4,'sdfds',false,true,undefined,null,{},{_id:324},[]].forEach(function(stupid){
            should(mComp(objectID,stupid)).be.false;
            should(mComp(asString,stupid)).be.false;
            should(mComp(objectID2,stupid)).be.false;
            should(mComp(asString2,stupid)).be.false;
            should(mComp(someObject,stupid)).be.false;
            should(mComp(someObject2,stupid)).be.false;
            should(mComp(someObject3,stupid)).be.false;
            should(mComp(someObject4,stupid)).be.false; // for security reasons
        });
    });



});