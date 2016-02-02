(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//     joex
//
//     Copyright (c) 2015, 2016 Simon Y. Blackwell, AnyWhichWay
//     MIT License - http://opensource.org/licenses/mit-license.php
(function() {
	"use strict";

	function eq(a,b) {
		return a==b;
	}
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
				return intersection(array,array);
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
	
	function crossproduct(arrays,test) {
		  var result = [],
		      indices = Array(arrays.length);
		  (function backtracking(index) {
		    if(index === arrays.length) {
		    	var row = arrays.map(function(array,index) {
		            return array[indices[index]];
		        });
		    	if(!test) {
		    		return result.push(row);
		    	} else if(test(row)) {
		    		result.push(row);
		    	}
		    	return result.length;
		    }
		    for(var i=0; i<arrays[index].length; ++i) {
		      indices[index] = i;
		      backtracking(index+1);
		    }
		  })(0);
		  return result;
		}
	Object.extend = function(overwrite) {
		var ExtendedObject = Object;
		if(overwrite || !ExtendedObject.prototype.filter) {
			ExtendedObject.prototype.filter = function(callback,thisarg) {
				var me = this, result = {};
				me.forEach(function(value,key) {
					if(callback.call(thisarg,value,key,me)) {
						result[key] = value;
					};
				});
				return result;
			}
		}
		if(overwrite || !ExtendedObject.prototype.find) {
			ExtendedObject.prototype.find = function(callback,thisarg) {
				var me = this;
				return me.some(function(value,key) {
					if(callback.call(thisarg,value,key,me)) {
						return true;
					};
				});
			}
		}
		if(overwrite || !ExtendedObject.prototype.findKey) {
			ExtendedObject.prototype.findKey = function(callback,thisarg) {
				var me = this, result;
				me.some(function(value,key) {
					if(callback.call(thisarg,value,key,me)) {
						result = key;
						return true;
					};
				});
				return result;
			}
		}
		if(overwrite || !ExtendedObject.prototype.findLastKey) {
			ExtendedObject.prototype.findLastKey = function(callback,thisarg) {
				var me = this, result;
				me.forEach(function(value,key) {
					if(callback.call(thisarg,value,key,me)) {
						result = key;
					};
				});
				return result;
			}
		}
		if(overwrite || !ExtendedObject.prototype.keyOf) {
			ExtendedObject.prototype.keyOf = function(searchElement) {
				var me = this, result;
				me.some(function(value,key) {
					if(value===searchElement) {
						result = key;
						return true;
					};
				});
				return result;
			}
		}
		if(overwrite || !ExtendedObject.prototype.lastKeyOf) {
			ExtendedObject.prototype.lastKeyOf = function(searchElement) {
				var me = this, result;
				me.forEach(function(value,key) {
					if(value===searchElement) {
						result = key;
					};
				});
				return result;
			}
		}
		if(overwrite || !ExtendedObject.prototype.includes) {
			ExtendedObject.prototype.includes = function(searchElement) {
				var me = this;
				return me.some(function(value,key) {
					return value===searchElement;
				});
			}
		}
		if(overwrite || !ExtendedObject.prototype.forEach) {
			ExtendedObject.prototype.forEach = function(callback,thisArg) {
				var me = this;
				return Object.keys(me).forEach(function(key) {
					callback.call(thisArg,me[key],key,me);
				});
			}
		}
		if(overwrite || !ExtendedObject.prototype.every) {
			ExtendedObject.prototype.every = function(callback,thisArg) {
				var me = this;
				return Object.keys(me).every(function(key) {
					return callback.call(thisArg,me[key],key,me);
				});
			}
		}
		if(overwrite || !ExtendedObject.prototype.some) {
			ExtendedObject.prototype.some = function(callback,thisArg) {
				var me = this;
				return Object.keys(me).some(function(key) {
					return callback.call(thisArg,me[key],key,me);
				});
			}
		}
		if(overwrite || !ExtendedObject.prototype.map) {
			ExtendedObject.prototype.map = function(callback, thisArg) {
				  var me = this, thisArg = (thisArg ? thisArg : me);
				  return Object.keys(this)
				    .reduce(function(result, key) {
				      result[key] = callback.call(thisArg, me[key], key, me);
				      return result;
				    }, {});
			}
		}
		if(overwrite || !ExtendedObject.prototype.reduce) {
			ExtendedObject.prototype.reduce = function(callback, initialValue) {
				var me = this;
				return Object.keys(this)
				    .reduce(function(previousValue, currentKey) {
				      return callback(previousValue, me[currentKey], currentKey, me);
				    }, initialValue);
			}
		}
		return ExtendedObject;
	}
	Array.extend = function(overwrite) {
		var ExtendedArray = Array;
		if(overwrite || !ExtendedArray.prototype.intersection) {
			ExtendedArray.prototype.intersection = function() {
				if(arguments.length>0) {
					var args = [].concat([this].concat(Array.prototype.slice.call(arguments)));
					return intersection.apply(null,args);
				}
				return intersection(this);
			}
		}
		if(overwrite || !ExtendedArray.prototype.isSet) {
			ExtendedArray.prototype.isSet = function() {
				return intersection(this).length === this.length;
			}
		}
		if(overwrite || !ExtendedArray.prototype.intersects) {
			ExtendedArray.prototype.intersects = function() {
				if(arguments.length>0) {
					var args = [].concat([this].concat(Array.prototype.slice.call(arguments)));
					return intersection.apply(null,args).length>0;
				}
				return intersection(this).length>0;
			}
		}
		if(overwrite || !ExtendedArray.prototype.disjoint) {
			ExtendedArray.prototype.disjoint = function() {
				if(arguments.length>0) {
					var args = [].concat([this].concat(Array.prototype.slice.call(arguments)));
					return intersection.apply(null,args).length===0;
				}
				return intersection(this).length===0;
			}
		}
		if(overwrite || !ExtendedArray.prototype.coincident) {
			ExtendedArray.prototype.coincident = function() {
				if(arguments.length>0) {
					var args = [].concat([this].concat(Array.prototype.slice.call(arguments)));
					return intersection.apply(null,args).length===this.length;
				}
				return intersection(this).length===this.length;
			}
		}
		if(overwrite || !ExtendedArray.prototype.crossproduct) {
			ExtendedArray.prototype.crossproduct = function(arrays,test) {
				var args = [this];
				if(Array.isArray(arrays)) {
					arrays.forEach(function(array) { args.push(array); });
				} else {
					test = (typeof(arrays)==="function" ? arrays : test);
					args.push(this);
				}
				return crossproduct(args,test);
			}
		}
		if(overwrite || !ExtendedArray.prototype.includes) {
			if(!ExtendedArray.prototype.includes) {
				ExtendedArray.prototype.includes = function(item) { return this.indexOf(item)>=0; }
			}
		}
		if(overwrite || !ExtendedArray.prototype.excludes) {
			ExtendedArray.prototype.excludes = function(item) {
				return !this.includes(item);
			}
		}
		if(overwrite || !ExtendedArray.prototype.eq) {
			ExtendedArray.prototype.eq = function(array) {
				return Array.isArray(array) && this.length===array.length && this.every(function(item,i) { return eq(item,array[i]);});
			}
		}
		if(overwrite || !ExtendedArray.prototype.neq) {
			ExtendedArray.prototype.neq = function(array) {
				return !Array.isArray(array) || this.length!==array.length || this.some(function(item,i) { return !eq(item,array[i]);});
			}
		}
		if(overwrite || !ExtendedArray.prototype.getMin) {
			ExtendedArray.prototype.getMin = function() {
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
		}
		if(overwrite || !ExtendedArray.prototype.getMax) {
			ExtendedArray.prototype.getMax = function() {
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
		}
		if(overwrite || !ExtendedArray.prototype.getSum) {
			ExtendedArray.prototype.getSum = function(filter) {
				var sum = 0;
				filter = (filter ? filter : function(item) { return (item!=null ? item.valueOf() : undefined); });
				this.every(function(item) {
					var value = filter(item)
					if(typeof(value)==="number") {
						sum += value;
					}
					return !isNaN(sum);
				});
				return sum;
			}
		}
		if(overwrite || !ExtendedArray.prototype.getAvg) {
			ExtendedArray.prototype.getAvg = function(all) {
				var sum, count = 0, f = (all ? (typeof(all)==="function" ? all : all) : function(item) { return (item!=null ? item.valueOf() : undefined); } )
				this.forEach(function(item) {
					var value = (typeof(f)==="function" ? f(item) : (item!=null ? item.valueOf() : undefined));
					if(typeof(value)==="number") {
						count ++;
						if(sum===undefined) {
							sum = value;
						} else {
							sum += value;
						}
					} else if(all===true) {
						count++;
					}
				});
				return (sum===undefined ? NaN : sum / count);
			}
		}
		if(overwrite || !ExtendedArray.prototype.count) {
			Object.defineProperty(ExtendedArray.prototype,"count",{enumerable:true,configurable:true,get:function() { return this.length; },set:function() {}});
		}
		// possibly expensive, so don't make enumerable
		if(overwrite || !ExtendedArray.prototype.min) {
			Object.defineProperty(ExtendedArray.prototype,"min",{enumerable:false,configurable:true,get:ExtendedArray.prototype.getMin,set:function() {}});
		}
		if(overwrite || !ExtendedArray.prototype.max) {
			Object.defineProperty(ExtendedArray.prototype,"max",{enumerable:false,configurable:true,get:ExtendedArray.prototype.getMax,set:function() {}});
		}
		if(overwrite || !ExtendedArray.prototype.avg) {
			Object.defineProperty(ExtendedArray.prototype,"avg",{enumerable:false,configurable:true,get:ExtendedArray.prototype.getAvg,set:function() {}});
		}
		if(overwrite || !ExtendedArray.prototype.sum) {
			Object.defineProperty(ExtendedArray.prototype,"sum",{enumerable:false,configurable:true,get:ExtendedArray.prototype.getSum,set:function() {}});
		}
		return ExtendedArray;
	}
	function toArray(object) {
		var array = [];
		object.forEach(function(value) {
			array.push(value);
		});
		return array;
	}

	Set.extend = function(overwrite,subclass) {
		var ExtendedSet = Set;
		if(subclass) {
			var S = Set;
			var ExtendedSet = Function("S","return function Set(iterable) { var me = (this instanceof Set ? this : Object.create(Set.prototype)); Object.defineProperty(me,'[[SetValue]]',{enumerable:false,writable:false,configurable:false,value:new S(iterable)}); return me; }")(S);
			Object.getOwnPropertyNames(S).forEach(function(key) {
				try {
					ExtendedSet[key] = S[key];
				} catch(e) {
					// can't do anything about properties that are read-only, just ignore
				}
			});
			ExtendedSet.prototype = Object.create(S.prototype);
			Object.getOwnPropertyNames(S.prototype).forEach(function(key) {
				if(key!=="size" && typeof(S.prototype[key])==="function") {
					var f = S.prototype[key];
					ExtendedSet.prototype[key] = function() { return f.apply(this['[[SetValue]]'],arguments); }
				}
			});
			Object.defineProperty(ExtendedSet.prototype,"size",{enumerable:false,configurable:false,get:function() { return this['[[SetValue]]'].size; },set:function() { }});
			Object.defineProperty(ExtendedSet.prototype,"count",{enumerable:true,configurable:true,get:function() { return this.size; },set:function() { }});
			ExtendedSet.constructor = ExtendedSet;
		} else {
			//class _ExtendedSet extends Set {};
			//ExtendedSet = _ExtendedSet;
			if(overwrite || !Object.getOwnPropertyDescriptor(ExtendedSet.prototype,"count")) {
				Object.defineProperty(ExtendedSet.prototype,"count",{configurable:true,enumerable:true,get:function() { 
					return this.size; },set:function() { }});
			}
		}
		if(overwrite || !Object.getOwnPropertyDescriptor(ExtendedSet.prototype,"every")) {
			ExtendedSet.prototype.every = function(f,thisArg) {
				var me = (thisArg ? thisArg : this),items = me.values(), item;
				while((item=items.next()) && item && !item.done) {
					if(!f(item.value,item.value,me)) {
						return false;
					}
				}
				return true;
			}
		}
		if(overwrite || !Object.getOwnPropertyDescriptor(ExtendedSet.prototype,"find")) {
			ExtendedSet.prototype.find = function(callback,thisArg) {
				var result, index = 0;
				this.forEach(function(value,value1,set) {
					if(callback.call(thisArg,value,value1,set)) {
						result = index;
					}
					index++;
				});
				return result;
			}
		}
		if(overwrite || !Object.getOwnPropertyDescriptor(ExtendedSet.prototype,"includes")) {
			ExtendedSet.prototype.includes = function(value) {
				return this.has(value)
			}
		}
		if(overwrite || !Object.getOwnPropertyDescriptor(ExtendedSet.prototype,"indexOf")) {
			ExtendedSet.prototype.indexOf = function(value) {
				var result = -1, index = 0;
				this.some(function(setvalue) {
					if(value===setvalue || (value+""==="NaN" && setvalue+""==="NaN")) {
						result = index;
					};
					index++;
					return result !==-1;
				});
				return result;
			}
		}
		if(overwrite || !Object.getOwnPropertyDescriptor(ExtendedSet.prototype,"join")) {
			ExtendedSet.prototype.join = function(separator) {
				var separator = (separator ? separator : ","), result = "", index = 0;
				this.forEach(function(value) {
					if(index===0) {
						result += value;
					} else {
						result += separator + value;
					}
					index++;
				});
				return result;
			}
		}
		if(overwrite || !Object.getOwnPropertyDescriptor(ExtendedSet.prototype,"map")) {
			ExtendedSet.prototype.map = function(callback, thisArg) {
				  var me = this,array = toArray(me),result = new Set();
				  array
				    .map(function(currentValue, index) {
				      result.add(callback.call(thisArg, currentValue, index, me));
				      return result;
				    },thisArg);
				  return result;
			}
		}
		if(overwrite || !Object.getOwnPropertyDescriptor(ExtendedSet.prototype,"reduce")) {
			ExtendedSet.prototype.reduce = function(callback, initialValue) {
				var me = this, array = toArray(me);
				return array
				    .reduce(function(previousValue, currentValue, currentIndex) {
				      return callback(previousValue, currentValue, currentIndex, me);
				    }, initialValue);
			}
		}
		if(overwrite || !Object.getOwnPropertyDescriptor(ExtendedSet.prototype,"some")) {
			ExtendedSet.prototype.some = function(f,thisArg) {
				var me = (thisArg ? thisArg : this),items = me.values(), item;
				while((item=items.next()) && item && !item.done) {
					if(f(item.value,item.value)) {
						return true;
					}
				}
				return false;
			}
		}
		if(overwrite || !Object.getOwnPropertyDescriptor(ExtendedSet.prototype,"valueAt")) {
			ExtendedSet.prototype.valueAt = function(index) {
				var result, i = 0;
				this.some(function(value) {
					if(i===index) {
						result = value;
						return true;
					}
					i++;
				});
				return result;
			}
		}
		if(overwrite || !Object.getOwnPropertyDescriptor(ExtendedSet.prototype,"intersection")) {
			ExtendedSet.prototype.intersection = function(iterable) {
				var array = (iterable instanceof Array ? iterable : toArray(iterable));
				return new Set(intersection(toArray(this),array));
			}
		}
		if(overwrite || !Object.getOwnPropertyDescriptor(ExtendedSet.prototype,"intersects")) {
			ExtendedSet.prototype.intersects = function(iterable) {
				var array = (iterable instanceof Array ? iterable : toArray(iterable));
				return intersection(toArray(this),array).length>0;
			}
		}
		if(overwrite || !Object.getOwnPropertyDescriptor(ExtendedSet.prototype,"disjoint")) {
			ExtendedSet.prototype.disjoint = function(iterable) {
				var array = (iterable instanceof Array ? iterable : toArray(iterable));
				return intersection(toArray(this),array).length===0;
			}
		}
		if(overwrite || !Object.getOwnPropertyDescriptor(ExtendedSet.prototype,"coincident")) {
			ExtendedSet.prototype.coincident = function(iterable) {
				var array = (iterable instanceof Array ? iterable : toArray(iterable));
				return array.length===this.size && intersection(toArray(this),array).length===this.size;
			}
		}
		if(overwrite || !Object.getOwnPropertyDescriptor(ExtendedSet.prototype,"crossproduct")) {
			ExtendedSet.prototype.crossproduct = function(iterable,test) {
				var set = new Set();
				var cp = crossproduct(toArray(this),test);
				cp.forEach(function(row) {
					set.add(new Set(row));
				});
				return set;
			}
		}
		if(overwrite || !Object.getOwnPropertyDescriptor(ExtendedSet.prototype,"eq")) {
			ExtendedSet.prototype.eq = function(set) {
				return set instanceof Set && this.size===set.size && this.coincident(set);
			}
		}
		if(overwrite || !Object.getOwnPropertyDescriptor(ExtendedSet.prototype,"neq")) {
			ExtendedSet.prototype.neq = function(set) {
				return !(set instanceof Set) || this.size!==set.size || !this.coincident(set);
			}
		}
		if(overwrite || !Object.getOwnPropertyDescriptor(ExtendedSet.prototype,"getMin")) {
			ExtendedSet.prototype.getMin = function() {
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
		}
		if(overwrite || !Object.getOwnPropertyDescriptor(ExtendedSet.prototype,"getMax")) {
			ExtendedSet.prototype.getMax = function() {
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
		}
		if(overwrite || !Object.getOwnPropertyDescriptor(ExtendedSet.prototype,"getSum")) {
			ExtendedSet.prototype.getSum = function(filter) {
				var sum = 0;
				filter = (filter ? filter : function(item) { return (item!=null ? item.valueOf() : undefined); });
				this.every(function(item) {
					var value = filter(item)
					if(typeof(value)==="number") {
						sum += value;
					}
					return !isNaN(sum);
				});
				return sum;
			}
		}
		if(overwrite || !Object.getOwnPropertyDescriptor(ExtendedSet.prototype,"getAvg")) {
			ExtendedSet.prototype.getAvg = function(all) {
				var sum, count = 0, f = (all ? (typeof(all)==="function" ? all : all) : function(item) { return (item!=null ? item.valueOf() : undefined); } )
				this.forEach(function(item) {
					var value = (typeof(f)==="function" ? f(item) : (item!=null ? item.valueOf() : undefined));
					if(typeof(value)==="number") {
						count ++;
						if(sum===undefined) {
							sum = value;
						} else {
							sum += value;
						}
					} else if(all===true) {
						count++;
					}
				});
				return (sum===undefined ? NaN : sum / count);
			}
		}
		ExtendedSet.prototype.toJSON = function() {
			return toArray(this);
		}
		// possibly expensive, so don't make enumerable
		if(overwrite || !Object.getOwnPropertyDescriptor(ExtendedSet.prototype,"min")) {
			Object.defineProperty(ExtendedSet.prototype,"min",{enumerable:false,configurable:true,get:ExtendedSet.prototype.getMin,set:function() {}});
		}
		if(overwrite || !Object.getOwnPropertyDescriptor(ExtendedSet.prototype,"max")) {
			Object.defineProperty(ExtendedSet.prototype,"max",{enumerable:false,configurable:true,get:ExtendedSet.prototype.getMax,set:function() {}});
		}
		if(overwrite || !Object.getOwnPropertyDescriptor(ExtendedSet.prototype,"avg")) {
			Object.defineProperty(ExtendedSet.prototype,"avg",{enumerable:false,configurable:true,get:ExtendedSet.prototype.getAvg,set:function() {}});
		}
		if(overwrite || !Object.getOwnPropertyDescriptor(ExtendedSet.prototype,"sum")) {
			Object.defineProperty(ExtendedSet.prototype,"sum",{enumerable:false,configurable:true,get:ExtendedSet.prototype.getSum,set:function() {}});
		}
		if(subclass) {
			return ExtendedSet;
		} else {
			return Set;
		}
	}
	
	Boolean.extend = function(overwrite,subclass) {
		var ExtendedBoolean;
		if(subclass) {
			var B = Boolean;
			var ExtendedBoolean = Function("return function Boolean(value) { var me = (this instanceof Boolean ? this : Object.create(Boolean.prototype)); Object.defineProperty(me,'[[PrimitiveValue]]',{enumerable:false,writable:false,configurable:false,value:value}); return me; }")();
			Object.getOwnPropertyNames(B).forEach(function(key) {
				try {
					ExtendedBoolean[key] = B[key];
				} catch(e) {
					// can't do anything about properties that are read-only, just ignore
				}
			});
			ExtendedBoolean.prototype = Object.create(B.prototype);
			Object.getOwnPropertyNames(B.prototype).forEach(function(key) {
				if(typeof(B.prototype[key])==="function") {
					var f = B.prototype[key];
					ExtendedBoolean.prototype[key] = function() { return f.apply(this['[[PrimitiveValue]]'],arguments); }
				}
			});
			ExtendedBoolean.constructor = ExtendedBoolean;
		} else {
			ExtendedBoolean = Boolean;
		}
		if(overwrite || !ExtendedBoolean.prototype.lt) {
			ExtendedBoolean.prototype.lt = function(value) {
				return this.valueOf() < value;
			};
		}
		if(overwrite || !ExtendedBoolean.prototype.lte) {
			ExtendedBoolean.prototype.lte = function(value) {
				return this.valueOf() <= value;
			};
		}
		if(overwrite || !ExtendedBoolean.prototype.eq) {
			ExtendedBoolean.prototype.eq = function(value) {
				return eq(this.valueOf(),value);
			};
		}
		if(overwrite || !ExtendedBoolean.prototype.eeq) {
			ExtendedBoolean.prototype.eeq = function(value) {
				return this === value;
			};
		}
		if(overwrite || !ExtendedBoolean.prototype.neq) {
			ExtendedBoolean.prototype.neq = function(value) {
				return !eq(this.valueOf(),value);
			};
		}
		if(overwrite || !ExtendedBoolean.prototype.neeq) {
			ExtendedBoolean.prototype.neeq = function(value) {
				return this !== value;
			};
		}
		if(overwrite || !ExtendedBoolean.prototype.gte) {
			ExtendedBoolean.prototype.gte = function(value) {
				return this.valueOf() >= value;
			};
		}
		if(overwrite || !ExtendedBoolean.prototype.gt) {
			ExtendedBoolean.prototype.gt = function(value) {
				return this.valueOf() > value;
			};
		}
		return ExtendedBoolean;
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
	
	String.extend = function(overwrite,subclass) {
		var ExtendedString;
		if(subclass) {
			var S = String;
			var ExtendedString = Function("return function String(value) { var me = (this instanceof String ? this : Object.create(String.prototype)); Object.defineProperty(me,'[[PrimitiveValue]]',{enumerable:false,writable:false,configurable:false,value:value}); return me; }")();
			Object.getOwnPropertyNames(S).forEach(function(key) {
				try {
					ExtendedString[key] = S[key];
				} catch(e) {
					// can't do anything about properties that are read-only, just ignore
				}
			});
			ExtendedString.prototype = Object.create(S.prototype);
			Object.getOwnPropertyNames(S.prototype).forEach(function(key) {
				if(typeof(S.prototype[key])==="function") {
					var f = S.prototype[key];
					ExtendedString.prototype[key] = function() { return f.apply(this['[[PrimitiveValue]]'],arguments); }
				}
			});
			ExtendedString.constructor = ExtendedString;
		} else {
			ExtendedString = String;
		}
		if(overwrite || !ExtendedString.prototype.soundex) {
			ExtendedString.prototype.soundex = function() {
				return soundex(this.valueOf());
			};
		}
		if(overwrite || !ExtendedString.prototype.echoes) {
			ExtendedString.prototype.echoes = function(string) {
				return soundex(this.valueOf())===soundex(string);
			};
		}
		if(overwrite || !ExtendedString.prototype.lt) {
			ExtendedString.prototype.lt = function(value) {
				return this.valueOf() < value;
			};
		}
		if(overwrite || !ExtendedString.prototype.lte) {
			ExtendedString.prototype.lte = function(value) {
				return this.valueOf() <= value;
			};
		}
		if(overwrite || !ExtendedString.prototype.eq) {
			ExtendedString.prototype.eq = function(value) {
				return eq(this.valueOf(),value);
			};
		}
		if(overwrite || !ExtendedString.prototype.eeq) {
			ExtendedString.prototype.eeq = function(value) {
				return this === value;
			};
		}
		if(overwrite || !ExtendedString.prototype.neq) {
			ExtendedString.prototype.neq = function(value) {
				return !eq(this.valueOf(),value);
			};
		}
		if(overwrite || !ExtendedString.prototype.neeq) {
			ExtendedString.prototype.neeq = function(value) {
				return this !== value;
			};
		}
		if(overwrite || !ExtendedString.prototype.gte) {
			ExtendedString.prototype.gte = function(value) {
				return this.valueOf() >= value;
			};
		}
		if(overwrite || !ExtendedString.prototype.gt) {
			ExtendedString.prototype.gt = function(value) {
				return this.valueOf() > value;
			};
		}
		if(overwrite || !ExtendedString.prototype.between) {
			ExtendedString.prototype.between = function(a,b) {
				var value = this.valueOf();
				return (value >= a && value <= b) || (value >= b && value <= a);
			};
		}
		if(overwrite || !ExtendedString.prototype.outside) {
			ExtendedString.prototype.outside = function(a,b) {
				return !this.between(a,b);
			};
		}
		return ExtendedString;
	}
	
	Number.extend = function(overwrite,subclass) {
		var ExtendedNumber;
		if(subclass) {
			var N = Number;
			var ExtendedNumber = Function("return function Number(value) { var me = (this instanceof Number ? this : Object.create(Number.prototype)); Object.defineProperty(me,'[[PrimitiveValue]]',{enumerable:false,writable:false,configurable:false,value:value}); return me; }")();
			Object.getOwnPropertyNames(N).forEach(function(key) {
				try {
					ExtendedNumber[key] = N[key];
				} catch(e) {
					// can't do anything about properties that are read-only, just ignore
				}
			});
			ExtendedNumber.prototype = Object.create(N.prototype);
			Object.getOwnPropertyNames(N.prototype).forEach(function(key) {
				if(typeof(N.prototype[key])==="function") {
					var f = N.prototype[key];
					ExtendedNumber.prototype[key] = function() { return f.apply(this['[[PrimitiveValue]]'],arguments); }
				}
			});
			ExtendedNumber.constructor = ExtendedNumber;
		} else {
			ExtendedNumber = Number;
		}
		if(overwrite || !ExtendedNumber.prototype.lt) {
			ExtendedNumber.prototype.lt = function(value) {
				return this.valueOf() < value;
			};
		}
		if(overwrite || !ExtendedNumber.prototype.lte) {
			ExtendedNumber.prototype.lte = function(value) {
				return this.valueOf() <= value;
			};
		}
		if(overwrite || !ExtendedNumber.prototype.eq) {
			ExtendedNumber.prototype.eq = function(value) {
				return eq(this.valueOf(),value);
			};
		}
		if(overwrite || !ExtendedNumber.prototype.eeq) {
			ExtendedNumber.prototype.eeq = function(value) {
				return this === value;
			};
		}
		if(overwrite || !ExtendedNumber.prototype.neq) {
			ExtendedNumber.prototype.neq = function(value) {
				return !eq(this.valueOf(),value);
			};
		}
		if(overwrite || !ExtendedNumber.prototype.neeq) {
			ExtendedNumber.prototype.neeq = function(value) {
				return this !== value;
			};
		}
		if(overwrite || !ExtendedNumber.prototype.gte) {
			ExtendedNumber.prototype.gte = function(value) {
				return this.valueOf() >= value;
			};
		}
		if(overwrite || !ExtendedNumber.prototype.gt) {
			ExtendedNumber.prototype.gt = function(value) {
				return this.valueOf() > value;
			};
		}
		if(overwrite || !ExtendedNumber.prototype.between) {
			ExtendedNumber.prototype.between = function(a,b) {
				var value = this.valueOf();
				return (value >= a && value <= b) || (value >= b && value <= a);
			};
		}
		if(overwrite || !ExtendedNumber.prototype.outside) {
			ExtendedNumber.prototype.outside = function(a,b) {
				return !this.between(a,b);
			};
		}
		return ExtendedNumber;
	}
	
	function toPrecision(milliseconds,precision) {
		var dt = new Date(milliseconds), yr = dt.getFullYear();
		var M1, D1, h1, m1, s1, ms1;
		if(!precision) {
			return dt.getTime();
		}
		M1 = (["M","D","h","m","s","ms"].indexOf(precision)>=0 ? dt.getMonth() : 0);
		D1 = (["D","h","m","s","ms"].indexOf(precision)>=0 ? dt.getDate() : 1);
		h1 = (["h","m","s","ms"].indexOf(precision)>=0 ? dt.getHours() : 0);
		m1 = (["m","s","ms"].indexOf(precision)>=0 ? dt.getMinutes() : 0);
		s1 = (["s","ms"].indexOf(precision)>=0 ? dt.getSeconds() : 0);
		ms1 = (["ms"].indexOf(precision)>=0 ? dt.getMilliseconds() : 0);
		dt = new Date(yr,0);
		dt.setMonth(M1);
		dt.setDate(D1);
		dt.setHours(h1);
		dt.setMinutes(m1);
		dt.setSeconds(s1);
		dt.setMilliseconds(ms1);
		return dt.getTime();
	}
	Date.extend = function(overwrite,subclass) {
		var ExtendedDate;
		if(subclass) {
			var D = Date;
			function datecons() {
				if(arguments.length===0) {
					return new D();
				} else if(arguments.length===1) {
					return new D(arguments[0]);
				} else if(arguments.length===2) {
					return new D(arguments[0],arguments[1]);
				} else if(arguments.length===3) {
					return new D(arguments[0],arguments[1],arguments[2]);
				} else if(arguments.length===4) {
					return new D(arguments[0],arguments[1],arguments[2],arguments[3]);
				} else if(arguments.length===5) {
					return new D(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);
				} else if(arguments.length===6) {
					return new D(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);
				} else {
					return new D(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6]);
				}
			}
			var ExtendedDate = Function("cons","return function Date(value) { var me = (this instanceof Date ? this : Object.create(Date.prototype)); Object.defineProperty(me,'[[DateValue]]',{enumerable:false,writable:true,configurable:false,value:cons.apply(null,arguments).valueOf()}); return me; }")(datecons);
			Object.getOwnPropertyNames(D).forEach(function(key) {
				try {
					ExtendedDate[key] = D[key];
				} catch(e) {
					// can't do anything about properties that are read-only, just ignore
				}
			});
			ExtendedDate.prototype = Object.create(D.prototype);
			Object.getOwnPropertyNames(D.prototype).forEach(function(key) {
				if(typeof(D.prototype[key])==="function" && key!=="getLastDayOfMonth" && key!=="isLeapYear") {
					var f = D.prototype[key];
					ExtendedDate.prototype[key] = function() {
						if(key.indexOf("set")===0) {
							var dt = new D(this['[[DateValue]]']);
							f.apply(dt,arguments);
							this['[[DateValue]]'] = dt.valueOf();
						} else {
							return f.apply(new D(this['[[DateValue]]']),arguments); 
						}
					}
				}
			});
			ExtendedDate.constructor = ExtendedDate;
		} else {
			ExtendedDate = Date;
		}
		Object.defineProperty(ExtendedDate.prototype,"time",{enumerable:true,configurable:true,set:function(value) {  this.setTime(value);},get:function() { return this.getTime(); }});
		Object.defineProperty(ExtendedDate.prototype,"year",{enumerable:true,configurable:true,set:function(value) {  return this.setYear(value);},get:function() { return this.getYear(); }});
		Object.defineProperty(ExtendedDate.prototype,"fullYear",{enumerable:true,configurable:true,set:function(value) {  return this.setFullYear(value);},get:function() { return this.getFullYear(); }});
		Object.defineProperty(ExtendedDate.prototype,"month",{enumerable:true,configurable:true,set:function(value) {  this.setMonth(value);},get:function() { return this.getMonth(); }});
		Object.defineProperty(ExtendedDate.prototype,"dayOfMonth",{enumerable:true,configurable:true,set:function(value) {  this.setDate(value);},get:function() { return this.getDate(); }});
		Object.defineProperty(ExtendedDate.prototype,"hours",{enumerable:true,configurable:true,set:function(value) {  this.setHours(value);},get:function() { return this.getHours(); }});
		Object.defineProperty(ExtendedDate.prototype,"minutes",{enumerable:true,configurable:true,set:function(value) {  this.setMinutes(value);},get:function() { return this.getMinutes(); }});
		Object.defineProperty(ExtendedDate.prototype,"seconds",{enumerable:true,configurable:true,set:function(value) {  this.setSeconds(value);},get:function() { return this.getSeconds(); }});
		Object.defineProperty(ExtendedDate.prototype,"milliseconds",{enumerable:true,configurable:true,set:function(value) {  this.setMilliseconds(value);},get:function() { return this.getMilliseconds(); }});
		if(overwrite || !ExtendedDate.prototype.lt) {
			ExtendedDate.prototype.lt = function(value,precision) {
				return toPrecision(this.getTime(),precision) < toPrecision(value,precision);
			};
		}
		if(overwrite || !ExtendedDate.prototype.lte) {
			ExtendedDate.prototype.lte = function(value,precision) {
				return toPrecision(this.getTime(),precision) <= toPrecision(value,precision);
			};
		}
		if(overwrite || !ExtendedDate.prototype.eq) {
			ExtendedDate.prototype.eq = function(value,precision) {
				return toPrecision(this.getTime(),precision) === toPrecision(value,precision);
			};
		}
		if(overwrite || !ExtendedDate.prototype.eeq) {
			ExtendedDate.prototype.eeq = function(value) {
				return this===value;
			};
		}
		if(overwrite || !ExtendedDate.prototype.neq) {
			ExtendedDate.prototype.neq = function(value,precision) {
				return toPrecision(this.getTime(),precision) !== toPrecision(value,precision);
			};
		}
		if(overwrite || !ExtendedDate.prototype.neeq) {
			ExtendedDate.prototype.neeq = function(value) {
				return this!==value;
			};
		}
		if(overwrite || !ExtendedDate.prototype.gte) {
			ExtendedDate.prototype.gte = function(value,precision) {
				return toPrecision(this.getTime(),precision) >= toPrecision(value,precision);
			};
		}
		if(overwrite || !ExtendedDate.prototype.gt) {
			ExtendedDate.prototype.gt = function(value,precision) {
				return toPrecision(this.getTime(),precision) > toPrecision(value,precision);
			};
		}
		// http://www.pilcrow.nl/2012/09/javascript-date-isleapyear-and-getlastdayofmonth
		//ExtendedDate functions. (Caveat: months start at 0!)
		if(overwrite || !ExtendedDate.isLeapYear) {
			ExtendedDate.isLeapYear = function (iYear)
			{
				return new ExtendedDate(iYear, 1, 29).getDate() === 29;
			};
		}
		if(overwrite || !ExtendedDate.prototype.isLeapYear) {
			ExtendedDate.prototype.isLeapYear = function ()
			{
				return ExtendedDate.isLeapYear(this.getFullYear());
			};
		}
		if(overwrite || !ExtendedDate.getLastDayOfMOnth) {
			ExtendedDate.getLastDayOfMonth = function (iMonth, iYear)
			{
				if (/^([024679]|11)$/.test(iMonth)) {
					return 31;
				}
				if (/^[358]$/.test(iMonth)) {
					return 30;
				}
				return ExtendedDate.isLeapYear(iYear) ? 29 : 28;
			};
		}
		if(overwrite || !ExtendedDate.prototype.getLastDayOfMonth) {
			ExtendedDate.prototype.getLastDayOfMonth = function ()
			{
				return ExtendedDate.getLastDayOfMonth(this.getMonth(), this.getFullYear());
			};
		}
		return ExtendedDate;
	}
	
}).call((typeof(window)!=='undefined' ? window : (typeof(module)!=='undefined' ? module : null)));
},{}]},{},[1]);
