(function() {
	"use strict";
	var _global = this;
	/*
	 * https://github.com/Benvie
	 * improvements 2015 by AnyWhichWay
	 */
	function intersection(array) {
			var arrays = arguments.length;
			// fast path when we have nothing to intersect
			if (arrays === 0) {
				return [];
			}
			if (arrays === 1) {
				return array.slice();
			}
			 
			var arg   = 0, // current arg index
					bits  = 0, // bits to compare at the end
					count = 0, // unique item count
					items = [], // unique items
					match = [], // item bits
					seen  = new Map(); // item -> index map
			 
			do {
				var arr = arguments[arg],
						len = arr.length,
						bit = 1 << arg, // each array is assigned a bit
						i   = 0;
			 
				if (!len) {
					return []; // bail out if empty array
				}
			 
				bits |= bit; // add the bit to the collected bits
				do {
					var value = arr[i],
							index = seen.get(value); // find existing item index
			 
					if (index === undefined) { // new item
						count++;
						index = match.length;
						seen.set(value, index);
						items[index] = value;
						match[index] = bit;
					} else { // update existing item
						match[index] |= bit;
					}
				} while (++i < len);
			} while (++arg < arrays);
			 
				var result = [],
				i = 0;
			 
			do { // filter out items that don't have the full bitfield
				if (match[i] === bits) {
					result[result.length] = items[i];
				}
			} while (++i < count);
			 
				return result;
	}
	
	function crossproduct(array,test) {
	  var end  = array.length - 1;
	  var result = []
	  function addTo(curr, start) {
	    var first = array[start], last  = (start === end)
	    for (var i = 0; i < first.length; ++i) {
	      var copy = curr.slice();
	      copy.push(first[i])
	      if (last) {
	    	  if(!test || test(copy,result.length)) {
	        	result.push(copy);
	    	  }
	      } else {
	        addTo(copy, start + 1)
	      }
	    }
	  }
	  if (array.length) {
	    addTo([], 0)
	  } else {
	    result.push([])
	  }
	  return result
	}
	function ExtendedArray() {
		var instance;
		if(arguments.length===1 && typeof(arguments[0])==="number") {
			instance = new Array(aguments[0])
		} else {
			instance = new Array().concat(Array.prototype.slice.call(arguments));
		}
		Object.setPrototypeOf(instance,ExtendedArray.prototype);
		return instance;
	}
	ExtendedArray.prototype = Object.create(Array.prototype);
	ExtendedArray.prototype.constructor = Array;
	ExtendedArray.prototype.intersects = function(array) {
		return intersection(this,array).length>0;
	}
	ExtendedArray.prototype.disjoint = function(array) {
		return intersection(this,array).length===0;
	}
	ExtendedArray.prototype.coincident = function(array) {
		return intersection(this,array).length===this.length;
	}
	ExtendedArray.prototype.crossproduct = function(test) {
		return crossproduct(this,test);
	}
	if(!ExtendedArray.prototype.includes) {
		ExtendedArray.prototype.includes = function(item) { return this.indexOf(item)>=0; }
	}
	ExtendedArray.prototype.excludes = function(item) {
		return !this.includes(item);
	}
	ExtendedArray.prototype.eq = function(array) {
		return array instanceof Array && this.length===array.length && this.every(function(item,i) { return item==array[i];});
	}
	ExtendedArray.prototype.neq = function(array) {
		return !(array instanceof Array) || this.length!==array.length && this.some(function(item,i) { return item!=array[i];});
	}
	ExtendedArray.prototype.min = function() {
		var min;
		this.forEach(function(item) {
			if(min===undefined) {
				min = item;
			} else if(item < min) {
				min = item;
			}
		});
		return min;
	}
	ExtendedArray.prototype.max = function() {
		var max;
		this.forEach(function(item) {
			if(max===undefined) {
				max = item;
			} else if(item > max) {
				max = item;
			}
		});
		return max;
	}
	ExtendedArray.prototype.sum = function() {
		var sum;
		this.forEach(function(item) {
			if(typeof(item)==="number") {
				if(sum===undefined) {
					sum = item;
				} else {
					sum += item;
				}
			}
		});
		return (sum===undefined ? NaN : sum);
	}
	ExtendedArray.prototype.avg = function() {
		var sum, count = 0;
		this.forEach(function(item) {
			if(typeof(item)==="number") {
				count ++;
				if(sum===undefined) {
					sum = item;
				} else {
					sum += item;
				}
			}
		});
		return (sum===undefined ? NaN : sum / count);
	}
	Object.defineProperty(ExtendedArray.prototype,"count",{enumerable:true,get:function() { return this.length; },set:function() {}});
	
	function toArray(object) {
		var array = [], values = object.values(), data = values.next();
		while (!data.done) {
			array.push(data.value);
			data = values.next();
		} 
		return array;
	}
	function ExtendedSet(items) {
		var instance = new Set(items);
		Object.setPrototypeOf(instance,ExtendedSet.prototype);
		return instance;
	}
	ExtendedSet.prototype = Object.create(Set.prototype);
	ExtendedSet.prototype.constructor = Set;
	ExtendedSet.prototype.every = function(f,thisarg) {
		var me = (thisarg ? thisarg : this), i = 0;
		for(var item of me) {
			if(!f(item,i)) {
				return false;
			}
			i++;
		}
		return true;
	}
	ExtendedSet.prototype.some = function(f,thisarg) {
		var me = (thisarg ? thisarg : this), i = 0;
		for(var item of me) {
			if(f(item,i)) {
				return true;
			}
			i++;
		}
		return false;
	}
	ExtendedSet.prototype.intersects = function(iterable) {
		var array = (iterable instanceof Array ? iterable : toArray(iterable));
		return intersection(toArray(this),array).length>0;
	}
	ExtendedSet.prototype.disjoint = function(iterable) {
		var array = (iterable instanceof Array ? iterable : toArray(iterable));
		return intersection(toArray(this),array).length===0;
	}
	ExtendedSet.prototype.coincident = function(iterable) {
		var array = (iterable instanceof Array ? iterable : toArray(iterable));
		return array.length===this.size && intersection(toArray(this),array).length===this.size;
	}
	ExtendedSet.prototype.crossproduct = function(iterable,test) {
		return crossproduct(toArray(this),test);
	}
	ExtendedSet.prototype.eq = function(set) {
		return set instanceof Set && this.size===set.size && this.coincident(set);
	}
	ExtendedSet.prototype.neq = function(set) {
		return !(set instanceof Set) || this.size!==set.size || !this.coincident(set);
	}
	ExtendedSet.prototype.min = function() {
		return toArray(this).min();
	}
	ExtendedSet.prototype.max = function() {
		return toArray(this).max();
	}
	ExtendedSet.prototype.sum = function() {
		return toArray(this).sum();
	}
	ExtendedSet.prototype.avg= function() {
		return toArray(this).avg();
	}
	ExtendedSet.prototype.toJSON = function() {
		return toArray(this);
	}
	Object.defineProperty(ExtendedSet.prototype,"count",{enumerable:true,get:function() { return this.size; },set:function() { }});
	
	function ExtendedBoolean(bool) {
		var instance = new Boolean(bool);
		Object.setPrototypeOf(instance,ExtendedBoolean.prototype);
		return instance;
	}
	ExtendedBoolean.prototype = Object.create(Boolean.prototype);
	ExtendedBoolean.prototype.constructor = Boolean;
	ExtendedBoolean.prototype.lt = function(value) {
		return this.valueOf() < value;
	}
	ExtendedBoolean.prototype.lte = function(value) {
		return this.valueOf() <= value;
	}
	ExtendedBoolean.prototype.eq = function(value) {
		return this.valueOf() == value;
	}
	ExtendedBoolean.prototype.eeq = function(value) {
		return this.valueOf() == value;
	}
	ExtendedBoolean.prototype.neq = function(value) {
		return this.valueOf() != value;
	}
	ExtendedBoolean.prototype.neeq = function(value) {
		return this.valueOf() !== value;
	}
	ExtendedBoolean.prototype.gte = function(value) {
		return this.valueOf() >= value;
	}
	ExtendedBoolean.prototype.gt = function(value) {
		return this.valueOf() > value;
	}
	
	// soundex from https://gist.github.com/shawndumas/1262659
	function soundex(s) {
	    var a = s.toLowerCase().split(''),
	    f = a.shift(),
	    r = '',
	    codes = {
	        a: '', e: '', i: '', o: '', u: '',
	        b: 1, f: 1, p: 1, v: 1,
	        c: 2, g: 2, j: 2, k: 2, q: 2, s: 2, x: 2, z: 2,
	        d: 3, t: 3,
	        l: 4,
	        m: 5, n: 5,
	        r: 6
	    };
	
		r = f +
		    a
		    .map(function (v) { return codes[v] })
		    .filter(function (v, i, a) {
		        return ((i === 0) ? v !== codes[f] : v !== a[i - 1]);
		    })
		    .join('');
		
		return (r + '000').slice(0, 4).toUpperCase();
	}
	function ExtendedString(str) {
		var instance = new String(str);
		Object.setPrototypeOf(instance,ExtendedString.prototype);
		return instance;
	}
	ExtendedString.prototype = Object.create(String.prototype);
	ExtendedString.prototype.constructor = String;
	ExtendedString.prototype.soundex = function() {
		return soundex(this.valueOf());
	}
	ExtendedString.prototype.echoes = function(string) {
		return soundex(this.valueOf())===soundex(string);
	}
	ExtendedString.prototype.lt = function(value) {
		return this.valueOf() < value;
	}
	ExtendedString.prototype.lte = function(value) {
		return this.valueOf() <= value;
	}
	ExtendedString.prototype.eq = function(value) {
		return this.valueOf() == value;
	}
	ExtendedString.prototype.eeq = function(value) {
		return this.valueOf() === value;
	}
	ExtendedString.prototype.neq = function(value) {
		return this.valueOf() != value;
	}
	ExtendedString.prototype.neeq = function(value) {
		return this.valueOf() !== value;
	}
	ExtendedString.prototype.gte = function(value) {
		return this.valueOf() >= value;
	}
	ExtendedString.prototype.gt = function(value) {
		return this.valueOf() > value;
	}
	ExtendedString.prototype.between = function(a,b) {
		var value = this.valueOf();
		return (value >= a && value <= b) || (value >= b && value <= a);
	}
	ExtendedString.prototype.outside = function(a,b) {
		return !this.between(a,b);
	}
	
	function ExtendedNumber(num) {
		var instance = new Number(num);
		Object.setPrototypeOf(instance,ExtendedNumber.prototype);
		return instance;
	}
	ExtendedNumber.prototype = Object.create(Number.prototype);
	ExtendedNumber.prototype.constructor = Number;
	ExtendedNumber.prototype.lt = function(value) {
		return this.valueOf() < value;
	}
	ExtendedNumber.prototype.lte = function(value) {
		return this.valueOf() <= value;
	}
	ExtendedNumber.prototype.eq = function(value) {
		return this.valueOf() == value;
	}
	ExtendedNumber.prototype.eeq = function(value) {
		return this.valueOf() === value;
	}
	ExtendedNumber.prototype.neq = function(value) {
		return this.valueOf() != value;
	}
	ExtendedNumber.prototype.neeq = function(value) {
		return this.valueOf() !== value;
	}
	ExtendedNumber.prototype.gte = function(value) {
		return this.valueOf() >= value;
	}
	ExtendedNumber.prototype.gt = function(value) {
		return this.valueOf() > value;
	}
	ExtendedNumber.prototype.between = function(a,b) {
		var value = this.valueOf();
		return (value >= a && value <= b) || (value >= b && value <= a);
	}
	ExtendedNumber.prototype.outside = function(a,b) {
		return !this.between(a,b);
	}
	
	function ExtendedDate() {
		var str = "return new Date(" + (typeof(arguments[0])==="string" || arguments[0] instanceof Date ? "'"+arguments[0]+"'" : Array.prototype.slice.call(arguments).join(",")) + ")";
		var instance = Function(str)();
		Object.setPrototypeOf(instance,ExtendedDate.prototype);
		return instance;
	}
	ExtendedDate.prototype = Object.create(Date.prototype);
	ExtendedDate.prototype.constructor = Date;
	ExtendedDate.prototype.lt = function(value) {
		return this.getTime() < (new ExtendedDate(value)).getTime();
	}
	ExtendedDate.prototype.lte = function(value) {
		return this.getTime() <= (new ExtendedDate(value)).getTime();
	}
	ExtendedDate.prototype.eq = function(value) {
		return this.getTime() === (new ExtendedDate(value)).getTime();
	}
	ExtendedDate.prototype.eeq = function(value) {
		return this===value;
	}
	ExtendedDate.prototype.neq = function(value) {
		return this.getTime() !== (new ExtendedDate(value)).getTime();
	}
	ExtendedDate.prototype.neeq = function(value) {
		return this!==value;
	}
	ExtendedDate.prototype.gte = function(value) {
		return this.getTime() >= (new ExtendedDate(value)).getTime();
	}
	ExtendedDate.prototype.gt = function(value) {
		return this.getTime() > (new ExtendedDate(value)).getTime();
	}
	// http://www.pilcrow.nl/2012/09/javascript-date-isleapyear-and-getlastdayofmonth
	//ExtendedDate functions. (Caveat: months start at 0!)
	ExtendedDate.isLeapYear = function (iYear)
	{
		return new ExtendedDate(iYear, 1, 29).getDate() === 29;
	};
	ExtendedDate.prototype.isLeapYear = function ()
	{
		return ExtendedDate.isLeapYear(this.getFullYear());
	}
	ExtendedDate.getLastDayOfMonth = function (iMonth, iYear)
	{
		if (/^([024679]|11)$/.test(iMonth)) {
			return 31;
		}
		if (/^[358]$/.test(iMonth)) {
			return 30;
		}
		return ExtendedDate.isLeapYear(iYear) ? 29 : 28;
	}
	ExtendedDate.prototype.getLastDayOfMonth = function ()
	{
		return ExtendedDate.getLastDayOfMonth(this.getMonth(), this.getFullYear());
	}

	
	if (typeof(module) !== 'undefined' && module.exports) {
		module.exports.ExtendedArray = ExtendedArray;
		module.exports.ExtendedSet = ExtendedSet;
		module.exports.ExtendedBoolean = ExtendedBoolean;
		module.exports.ExtendedNumber = ExtendedNumber;
		module.exports.ExtendedString = ExtendedString;
		module.exports.ExtendedDate = ExtendedDate;
	} else if (typeof define === 'function' && define.amd) {
		// Publish as AMD module
		define(function() {return {ExtendedArray:ExtendedArray,ExtendedSet:ExtendedSet,ExtendedBoolean:ExtendedBoolean,ExtendedNumber:ExtendedNumber,ExtendedString:ExtendedString,ExtendedDate:ExtendedDate};});
	} else {
		_global.ExtendedArray = ExtendedArray;
		_global.ExtendedSet = ExtendedSet;
		_global.ExtendedBoolean = ExtendedBoolean;
		_global.ExtendedNumber = ExtendedNumber;
		_global.ExtendedString = ExtendedString;
		_global.ExtendedDate = ExtendedDate;
	}
}).call(this);