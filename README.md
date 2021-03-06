# joex
JavaScript Object Extensions

Selectively adds *.lt, .lte, .eq, .neq, .eeq, .neeq, .gte, .gt* to Number, String, Boolean, Array, Set, Date. Dates can be compared with precision, e.g. *.lt(date,"Y")*.

Selectively adds  *.between* and *.outside* to Number and String.

Selectively adds  *.echoes(string)* and *.soundex* to String.

Selectively adds  *.isLeapYear* and *.getLastDayOfMonth* methods to Date. Also adds data members to represent all of the parts of a Date so that they can be treated in a declarative manner, e.g. year, fullYear, month, etc.

Selectively adds  *.avg, .coincident, .crossproduct, .disjoint, .getMin, .getMax, .getAvg, .getSum, .intersection, .intersects, .max, .min, .sum* to Array and Set.

Selectively adds *.every, .find, .includes, .indexOf, .join, .map, .reduce, .some, .valueAt*, and *.toJSON* to Set. *.toJSON* results in an array like representation.

Also selectively adds arraylike function to Object.

**NEW** Extensions to Object that support similar methods to Array, e.g. *.forEach, .every, .map*. Extensions to Set so that it supports almost all the same methods as Array. Option to avoid "pollution" of built-in prototypes. There are potentially breaking changes related to *.min, .max, .sum, .avg* which hav ebeen made declaritive and replaced with equivalent *.get<prop>* methods.

[![Build Status](https://travis-ci.org/anywhichway/joex.svg)](https://travis-ci.org/anywhichway/joex)
[![Codacy Badge](https://api.codacy.com/project/badge/grade/8ff33e04aa48424c97f63740e87afd9d)](https://www.codacy.com/app/syblackwell/joex)
[![Code Climate](https://codeclimate.com/github/anywhichway/joex/badges/gpa.svg)](https://codeclimate.com/github/anywhichway/joex)
[![Test Coverage](https://codeclimate.com/github/anywhichway/joex/badges/coverage.svg)](https://codeclimate.com/github/anywhichway/joex/coverage)
[![Issue Count](https://codeclimate.com/github/anywhichway/joex/badges/issue_count.svg)](https://codeclimate.com/github/anywhichway/joex)


[![NPM](https://nodei.co/npm/joex.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/<joex>/)

### Philosophy

The design philosophy for most extensions is primarily driven be a need for additional functionality.

Note, there are risks in using polyfills as documented here: http://adamsilver.io/articles/the-disadvantages-of-javascript-polyfills/. However, we have found there are cases where facades and wrappers will not work, making polyfills or subclassing the only choice, i.e. where instanceof semantics must be preserved or major portions of existing code will have to be re-written (introducing yet another set of risks). Meanwhile, the library was designed in such a way that the programmer has the ability to select enhancing native prototypes directly or subclassing native classes in order to manage risk as the programmer deems fit.

For selectivity, extensions are only created upon request for any given class by calling */<constructor/>.extend()*.

The design philosophy for Date involves making objects more declarative than is typical with JavaScript because we find this leads to more concise and less bug prone code. It also happens to be useful when indexing objects for [JOQULAR](http://www.github.com/anywhichway/joqular) or other JSON data stores. This is accomplished through the use of Object.defineProperty on class prototypes to create virtual properties with get and set functions, e.g. 

```Object.defineProperty(Date.prototype,"fullYear",{enumerable:true,configurable:true,set:function(value) { this.setFullYear(value); },get:function() {return this.getFullYear();}).```

Since they are semantically un-necessary the *.toJSON* method for Date is not updated to add these properties and they will not be serialized. However, code that iterates over prototype properties may be impacted.

We have taken a similar approach to extending Array and Set to support *.avg, .max, .min, .sum*.


# Installation

npm install joex

The index.js and package.json files are compatible with https://github.com/anywhichway/node-require so that joex can be served directly to the browser from the node-modules/joex directory when using node Express.

To modify the global objects, set the global object to its extended equivalent, e.g. Date = Date.extend().

```
require("joex");
var Date = Date.extend()
```

## Usage

The constructors for Object, Set, Boolean, Number, String, Date remain the same as the native implementations until `<class>.extend(overwrite,subclass)` is called with `subclass==true`. If `subclass==false`, then the prototype of the native constructor is simply enhanced. `<class>.extend(overwrite,subclass)` returns either the native constructor or a subclass constructor.

For the Array constructor *.extend* only takes one argument *overwrite*. It is currently not possible to subclass Array without breaking `instanceof` checks where an array was created using the `[]` operator.

Number, String, Boolean support *.lt, .lte, .eq, .eeq, .neq, .neeq, .gte, .gt*. See Array, Set, Date documentation for their respective comparisons. The methods *.eeq* and *.neeq* do exect equal comparisons, i.e. `new Number(1).eeq(1)` will return false, whereas `var n = new Number(1); n.eeq(n);` will be true.

### Array

#### Methods

*.getAvg(all)* - Returns the avg value of numeric values or items coerceable into numerics (e.g. Date, Time) in the array. Non-numeric values are ignored unless *all* is set. If *all* is *true*, then non-numeric values increment the count by which the average is computed. If *all* is a function and returns a numeric when called with a value, the numeric is added to the values to be averaged. If it returns a non-numeric, the value is ignored and the count is not incremented.

*.getMax()* - Returns the max value in the array.

*.getMin()* - Returns the max value in the array.

*.getSum(filter)* - Returns the avg value of numeric values or items coerceable into numerics (e.g. Date, Time) in the array. Non-numeric values are ignored unless *all* is a function and returns a numeric when called with a value; in which case, the numeric is added to the sum. If the function returns a non-numeric, the value is ignored.

*.intersects(Array,...), .coincident(Array,...), .disjoint(Array,...)* - All behave as one would expect for set manipulation and returns *true* or *false*. The first argument is actually optional and if excluded will apply the method to the instance, thus *.intersects* and *.coincident* will return *true* whereas *disjoint* will return *false*.

*intersection(Array,...)* - Returns an Array that represents the intersection of the provided arguments. If no arguments are provided, the instance is intersected with itself, thus it returns its set equivalent as an Array.

*.crossproduct([Arrays],function(row))* - Returns a Cartesian cross-product of the instance and the provided array of arrays. If a function is provided as a second argument it acts as a filter for each row as it is built. If a *row* will be an Array. If it should not be added to the cross-product, the function should return *false*, otherwise return *true*.

#### Properties

*.avg, .max, .min, .sum* - Are all added as non-enumerable, read-only properties.

*.count* - Is an alias for *.length*.

### Date

#### Properties

*.year, .fullYear, .month, .dayofMonth, .hours, .minutes, .seconds, .milliseconds* are all exposed as properties that correspond to the similarly named get and set functions. Note, since *.getYear* is being deprecated from JavaScript, *.year* always corresponds to *.fullYear*.

#### Methods

Supports *.lt, .lte, .eq, .neq, .gte, .gt* with an additional *precision* argument, i.e. "Y","M","D","h","m","s","ms". For example:

```
new Date().eq(new Date(),"Y");
```

Precision operates at the least number of milliseconds required to represent a Date, i.e. "Y" is effectively represented by converting an internal value to *new Date(this.getFullYear(),0)*.

*.getLastDayOfMonth* - Returns the last day of the month for the instance.

*.isLeapYear()* - Returns *true* if the instance is a leap year.

### Number

#### Methods

*.between(a,b)* - Returns *true* if instance is between *a* and *b*, including the boundaries.

*.outside(a,b)* - Returns *true* if instance is not between *a* and *b*.

### Object

### Methods

*.forEach, .every, .some* - Behave the same as for Arrays, with the exception the callback's second argument is a key not an index.

*.findKey(function(value,key,object),thisArg), .findLastKey(function(value,key,object),thisArg)* - Returns the key with a valuse that satisfies the provided function. The provided function is called with the current object as the scope unless a *thisArg* is provided. *.object* will always be the object on which the find function is invoked.

*.keyOf(value), .lastKeyOf(value)* - Returns the key that contains the value.

*.map(function(value,key,object),thisArg)* - Returns a single object after mapping the function across all keys. If a key should be skipped then the provided function should return *undefined*. The provided function is called with the current object as the scope unless a *thisArg* is provided. *.object* will always be the object on which the find function is invoked.

*.reduce(function(previousValue,currentValue,currentKey,object),initialValue)* - Like the equivalent Array method reduces an object to a single value. *currentKey* replaces *currentIndex* from the equivalent Array method.

### Set

#### Methods

Supports the same extended summary methods as Array.

*.every, .some* - Behave the same as for Arrays, with the exception the callback's second argument is not an index. This is consistent with the native *.forEach* implementation.

*.find, .includes, .indexOf, .join, .map, .reduce* - Behave the same as for Arrays.

*.intersects, .coincident, .disjoint, .intersection* - Behave the same as for Arrays.

*.toJSON* - Returns the set as an Array.

*.valueAt* - Returns the value at the provided index, or *undefined* if not found.

#### Properties

*.avg, .max, .min, .sum* - Are all added as non-enumerable, read-only properties.

*.count* - Is an alias for *.length*.

### String

#### Methods

*.between(a,b)* - Returns *true* if instances is between *a* and *b*, including the boundaries.

*.echoes(string)* - Returns *true* if instance sounds like *string*.

*.outside(a,b)* - Returns *true* if instances is not between *a* and *b*.

*.soundex()* - Returns soundex encoding of string.

# Building & Testing

Building & testing is conducted using Travis, Mocha, Chai, and Istanbul. 

# Release History (reverse chronological order)

v0.2.0 2016-02-01 Completely eliminated built-in prototype "pollution" except at programmer request. Changed *.min, .max, .avg, .sum* to declarative accessors and added equivalent get functions. Made Set extensions independent of Array extensions. Added more array like functions to Set, e.g. *.map, .reduce*. Added extensions for typical array functions on Object, i.e. *.forEach, .every*, etc. Sum functions optimized to return immediately if sum is NaN. More memory efficient crossproduct which now also takes others arrays or sets as arguments. Fixed *String.prototype.neeq* which was not returning correct result when comparing object to itself.

v0.1.6 2016-01-22 Corrected bad reference to client file in *package.json*. 

v0.1.5 2016-01-21 Reworked module closure wrapper so it would work regardless of whether *browserify* is used. 

v0.1.4 2016-01-15 Updated Set *.every* and *.some* to avoid use of not yet generally supported *for ... of ...* construct. Added unit tests. Updated badges.

v0.1.3 2016-01-09 Updated documentation to alert users to the risks of polyfills.

v0.1.2 2016-01-07 Added *.intersection* to Array and Set. Enhanced *.intersects*,*.coincident*, and *.disjoint* to take any number of arguments, added more documentation and unit tests.

v0.1.1 2016-01-03 Added substantial amounts of documentation and unit tests. Add filter capability to *.sum* and *.avg*. Corrected a flaw in Date precision that resulted in only part of a date being considered.

v0.1.0 2015-12-31 Modified so code does not directly overload built-in objects. Started adding unit tests. This was a breaking change with respect to module loading, so semantic version was incremented.

v0.0.9 2015-12-31 Added isLeapYear and getLastDayOfMonth functions for Date. Remove dependencies on Time and TimeSpan.

v0.0.8 2015-12-13 Codacy improvements.

v0.0.7 2015-12-13 Removed data extensions to Date object.

v0.0.6 2015-12-13 Codacy improvements

v0.0.5 2015-11-29 Initial public release. No unit tests yet. Consider this an ALPHA.

# License

MIT License - see LICENSE file