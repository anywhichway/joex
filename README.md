# joex
Javascript Object Extensions

Adds lt, lte, eq, neq, gte, gt to Number, String, Boolean, Date. Dates can be compared with precision, e.g. *.lt(date,"Y")*.

Adds between and outside to Number and String.

Adds soundex to String.

Adds isLeapYear and getLastDayOfMonth methods to Date as well as properties for year, fullYear, month, etc.

Adds intersects, disjoint, coincident, crossproduct, min, max, avg to Array and Set.

Adds some, every, and toJSON to Set. toJSON results in an array like representation.

[![Codacy Badge](https://api.codacy.com/project/badge/grade/8ff33e04aa48424c97f63740e87afd9d)](https://www.codacy.com/app/syblackwell/joex)

### Philosophy

The design philosophy for Date involves making objects more declarative than is typical with Javascript because we find this leads to more concise and less bug prone code. It also happens to be useful when indexing objects for [JOQULAR](http://www.github.com/anywhichway/joqular) or other JSON data stores. This is accomplished through the use of Object.defineProperty on class prototypes to create virtual properties with get and set functions hidden from the application implementor, e.g. 

```Object.defineProperty(Date.prototype,"fullYear",{enumerable:true,configurable:true,set:function(value) { this.setFullYear(value); },get:function() {return this.getFullYear();}).```

The design philosophy for the other extensions is primarily driven be a need for additional functionality.

# Installation

npm install joex

The index.js and package.json files are compatible with node-require so that joex can be served directly to the browser from the node-modules/joex directory when using node Express.

To modify the global objects a web browser set the global object to its extended equivalent, e.g. Date = Date.extend() To access them in node.js use the normal require syntax, e.g.

```
var Date = require("joex").Date.extend()
```

# Release History (reverse chronological order)

v0.1.0 2015-12-31 Modified so code does not directly overload built-in objects. Started adding unit tests. This was a breaking change with respect to module loading, so semantic version was incremented.

v0.0.9 2015-12-31 Added isLeapYear and getLastDayOfMonth functions for Date. Remove dependencies on Time and TimeSpan.

v0.0.8 2015-12-13 Codacy improvements.

v0.0.7 2015-12-13 Removed data extensions to Date object.

v0.0.6 2015-12-13 Codacy improvements

v0.0.5 2015-11-29 Initial public release. No unit tests yet. Consider this an ALPHA.

# License

MIT License - see LICENSE file