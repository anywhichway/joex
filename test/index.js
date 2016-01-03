var expect;
if(typeof(window)==="undefined") {
	expect = require("chai").expect;
	Array = require('../index.js').Array.extend();
	Set = require('../index.js').Set.extend();
	Boolean = require('../index.js').Boolean.extend();
	Number = require('../index.js').Number.extend();
	String = require('../index.js').String.extend();
	Date = require('../index.js').Date.extend();
}

describe('Array',function() {
	var a = [1,2,3], ea = new Array(1,2,3);
	it('eq ',function() {
		expect(ea.eq(a)).to.be.true;
	})
});
describe('Set',function() {
	var a = new Set([1,2,3]), ea1 = new Set([1,2,3]), ea2 = new Set([2,3]);
	it('eq ',function() {
		expect(ea1.eq(a)).to.be.true;
	});
	it('eq should fail ',function() {
		expect(ea2.eq(a)).to.be.false;
	});
	it('neq ',function() {
		expect(ea2.neq(a)).to.be.true;
	})
});

describe('Boolean',function() {
	var b = true, eb = new Boolean(true);
	it('eq ',function() {
		expect(eb.eq(b)).to.be.true;
	})
});


describe('Number',function() {
	var n = 1, en = new Number(1);
	it('eq ',function() {
		expect(en.eq(n)).to.be.true;
	})
	it('between ', function() {
		expect(en.between(0,2)).to.be.true;
	})
});

describe('String',function() {
	var s = new String("a string"), es = new String("a string");
	it('eq ',function() {
		expect(es.eq(s)).to.be.true;
	})
});

describe('Date',function() {
	var dt = new Date(2016,1,0,0,0,0,0), edt = new Date(2016,1,0,0,0,0,0);
	it('eq ',function() {
		expect(edt.eq(dt)).to.be.true;
	})
	it('2016 isLeapYear ',function() {
		expect(edt.isLeapYear()).to.be.true
	});
});