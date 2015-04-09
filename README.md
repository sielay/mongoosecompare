MongooseCompare
===============

Reason of using that is simple. Mongoose gives you great power of populating sub documents referred by MongoID. Sometimes
in my code I had to create condition that might find populated or non-populated data. Sometimes also it would compare data
that was actually Mongoose model or cleaned plain JSON object. Despite where I used some bits of logic, I wanted to keep
all simple. It will add of course some overhead, but helps to maintain clean code.

Installation
------------

```
npm install mongoosecompare --save
```

Simple as that

Usage
-----

```

var comp = require('mongoosecompare'),

(...)

var varA = mongoose.Types.ObjectId();
var varB = '55149130c26e4eba0e32a273';

(...)

if(comp(varA, varB)) {
  ...
}

```

or see tests.

Other features
--------------

 * Fallback any model or object ID to string ObjectId
 * ObjectId validation more strict that mongoose.Types.ObjectId.isValid

Dependecies
-----------

This lib uses only `mongoose` and `top-require`. Top Require allows me to import the same copy of mongoose you have installed
in your app. So, if you modify anything it will be taken in account.

Licence
-------

Copyright (c) 2015 Łukasz Marek Sielski

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.