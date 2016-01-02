# joex
Javascript Object Extensions

Adds lt, lte, eq, neq, gte, gt to Number, String, Boolean, Date

Adds between and outside to Number and String

Adds soundex to String

Adds before, adjacentOrBefore, afterAdjacentorAfter to Date

Adds intersects, disjoint, coincident, crossproduct, min, max, avg to Array and Set

Adds some, every, and toJSON to Set. toJSON results in an array like representation.

# Installation

npm install joex

The package is dependent on about-time for its adjacency extensions to Date.

[![Codacy Badge](https://api.codacy.com/project/badge/grade/8ff33e04aa48424c97f63740e87afd9d)](https://www.codacy.com/app/syblackwell/joex)

This package has a low score as a result of its primary intent, to extend built-in Javascript objects with some useful functions. As a result we expect some flack, particularly based on the name "joex", pronounced like "jokes". Oh well, we find the package very useful.


# Release History (reverse chronological order)

v0.0.10 2015-12-31 Modified so code does not directly overload built-in objects. First step to making built-in override developer selectable. Started adding unit tests.

v0.0.9 2015-12-31 Added isLeapYear and getLastDayOfMonth functions for Date. Remove dependencies on Time and TimeSpan.

v0.0.8 2015-12-13 Codacy improvements.

v0.0.7 2015-12-13 Removed data extensions to Date object.

v0.0.6 2015-12-13 Codacy improvements

v0.0.5 2015-11-29 Initial public release. No unit tests yet. Consider this an ALPHA.

# License

MIT License - see LICENSE file