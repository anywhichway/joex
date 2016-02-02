var expect;
if(typeof(window)==="undefined") {
	expect = require("chai").expect;
	require('../index.js');
}

Object = Object.extend(false);
Array = Array.extend(false);

describe('Object ', function() {
	it('every ', function() {
		var obj = {a:1,b:2,c:3};
		var result = obj.some(function(currentValue,currentKey,obj) {
			return currentValue>0;
		});
		expect(result).to.be.true;
	});
	it('filter ', function() {
		var obj = {a:1,b:2,c:3,d:3};
		var result = obj.filter(function(value) { return value===3; });
		expect(result.c===3 && result.d===3 && !result.a && !result.b).to.be.true;
	});
	it('find ', function() {
		var obj = {a:1,b:2,c:3,d:3};
		var result = obj.find(function(value) { return value===3; });
		expect(result).to.be.true;
	});
	it('findKey ', function() {
		var obj = {a:1,b:2,c:3,d:3};
		var result = obj.findKey(function(value) { return value===3; });
		expect(result).to.equal("c");
	});
	it('findLastKey ', function() {
		var obj = {a:1,b:2,c:3,d:3};
		var result = obj.findLastKey(function(value) { return value===3; });
		expect(result).to.equal("d");
	});
	it('forEach ', function() {
		var obj = {a:1,b:2,c:3};
		obj.forEach(function(currentValue,currentKey,object) {
			return object[currentKey]++;
		});
		expect(obj.a).to.equal(2);
		expect(obj.b).to.equal(3);
		expect(obj.c).to.equal(4);
	});
	it('includes ', function() {
		var obj = {a:1,b:2,c:3,d:3};
		var result = obj.includes(3);
		expect(result).to.be.true;
	});
	it('keyOf ', function() {
		var obj = {a:1,b:2,c:3,d:3};
		var result = obj.keyOf(3);
		expect(result).to.equal("c");
	});
	it('lastKeyOf ', function() {
		var obj = {a:1,b:2,c:3,d:3};
		var result = obj.lastKeyOf(3);
		expect(result).to.equal("d");
	});
	it('map ', function() {
		var obj = {a:1,b:2,c:3};
		var result = obj.map(function(currentValue,currentKey) {
			return this[currentKey] + 1;
		});
		expect(result.a).to.equal(2);
		expect(result.b).to.equal(3);
		expect(result.c).to.equal(4);
	});
	it('reduce ', function() {
		var obj = {a:1,b:2,c:3};
		var result = obj.reduce(function(previousValue,currentValue) { 
			return previousValue + currentValue;
		},0);
		expect(result).to.equal(6);
	});
	it('some ', function() {
		var obj = {a:1,b:2,c:3};
		var result = obj.some(function(currentValue,currentKey,obj) {
			return currentValue===3;
		});
		expect(result).to.be.true;
	});
});

describe('Array',function() {
	var now = new Date();
	var a = [1,2,3], ea1 = new Array(1,2,3), ea2 = new Array(4,5,6), ea3 = new Array(now,now,now), ea4 = new Array(now,null,now), ea5 = new Array(1,2,null);
	it('count ',function() {
		expect(ea1.count).to.equal(ea1.length);
	});
	it('isSet ',function() {
		expect(ea1.isSet()).to.be.true;
	});
	it('isSet fail ',function() {
		expect([1,1,3].isSet()).to.be.false;
	});
	it('eq ',function() {
		expect(ea1.eq(a)).to.be.true;
	});
	it('eq fail ',function() {
		expect(ea2.eq(a)).to.be.false;
	});
	it('neq ',function() {
		expect(ea1.neq(ea2)).to.be.true;
	});
	it('neq fail ',function() {
		expect(ea1.neq(ea1)).to.be.false;
	});
	it('getMin ',function() {
		expect(ea1.getMin()).to.equal(1);
	});
	it('min ',function() {
		expect(ea1.min).to.equal(1);
	});
	it('min NaN',function() {
		expect(isNaN(new Array().getMin())).to.be.true;
	});
	it('min ',function() {
		expect(new Array("c","b","a").getMin()).to.equal("a");
	});
	it('getSum ',function() {
		expect(ea1.getSum()).to.equal(6);
	});
	it('sum ',function() {
		expect(ea1.sum).to.equal(6);
	});
	it('getAvg ',function() {
		expect(ea1.getAvg()).to.equal(2);
	});
	it('avg ',function() {
		expect(ea1.avg).to.equal(2);
	});
	it('avg with null ',function() {
		expect(ea5.getAvg()).to.equal(1.5);
	});
	it('avg all ',function() {
		expect(ea5.getAvg(true)).to.equal(1);
	});
	it('avg Date ',function() {
		expect(ea3.getAvg()).to.equal(now.getTime());
	});
	it('avg Date with null ',function() {
		expect(ea3.getAvg()).to.equal(now.getTime());
	});
	it('avg NaN ',function() {
		expect(isNaN(new Array().getAvg())).to.be.true;
	});
	it('getMax ',function() {
		expect(ea1.getMax()).to.equal(3);
	});
	it('sum ',function() {
		expect(ea1.getSum()).to.equal(6);
	});
	it('sum filter',function() {
		expect(ea1.getSum(function(value) { return (value!==1 ? value : undefined); })).to.equal(5);
	});
	it('max ',function() {
		expect(ea1.max).to.equal(3);
	});
	it('max ',function() {
		expect(new Array("a","b","c").getMax()).to.equal("c");
	});
	it('max ',function() {
		expect(isNaN(new Array().getMax())).to.be.true;
	});
	it('intersection ',function() {
		var result = ea1.intersection(a);
		expect(result.length).to.equal(3);
	});
	it('intersection self depdups ',function() {
		var result = [1,1,2,3].intersection();
		expect(result.length).to.equal(3);
	});
	it('intersects self is true ',function() {
		expect(ea1.intersects()).to.be.true;
	});
	it('intersects ',function() {
		expect(ea1.intersects(a)).to.be.true;
	});
	it('intersects self ',function() {
		expect(ea1.intersects()).to.be.true;
	});
	it('intersects multiple arguments',function() {
		expect(ea1.intersects(a,a)).to.be.true;
	});
	it('coincident ',function() {
		expect(ea1.coincident(a)).to.be.true;
	});
	it('coincident self ',function() {
		expect(ea1.coincident()).to.be.true;
	});
	it('disjoint ',function() {
		expect(ea1.disjoint(ea2)).to.be.true;
	});
	it('disjoint self ',function() {
		expect(ea1.disjoint()).to.be.false;
	});
	it('includes ',function() {
		expect(ea1.includes(1)).to.be.true;
	});
	it('excludes ',function() {
		expect(ea1.excludes(-1)).to.be.true;
	});
	it('crossproduct ',function() {
		var result = [1,2].crossproduct();
		expect(result[0][0]===1 && result[0][1]===1 && result[1][0]===1 && result[1][1]===2 && result[2][0]===2 && result[2][1]===1 && result[3][0]===2 && result[3][1]===2).to.be.true;
	});
	it('crossproduct with array ',function() {
		var result = [1,2].crossproduct([[1,2]]);
		expect(result[0][0]===1 && result[0][1]===1 && result[1][0]===1 && result[1][1]===2 && result[2][0]===2 && result[2][1]===1 && result[3][0]===2 && result[3][1]===2).to.be.true;
	});
	it('crossproduct test ',function() {
		var result = [1,2].crossproduct(function(row) { return row[0]!==1; });
		expect(result[0][0]===2 && result[0][1]===1 && result[1][0]===2 && result[1][1]===2).to.be.true;
	});
	it('crossproduct test with array ',function() {
		var result = [1,2].crossproduct([[1,2]],function(row) { return row[0]!==1; });
		expect(result[0][0]===2 && result[0][1]===1 && result[1][0]===2 && result[1][1]===2).to.be.true;
	});
});

var oSet = Set;
var oBoolean = Boolean;
var oNumber = Number;
var oString = String;
var oDate = Date;
var overwrite = [true,false];
var subclass = [true,false];
var tests = [{overwrite:false,subclass:true},{overwrite:true,subclass:true},{overwrite:false,subclass:false}]
tests.forEach(function(test) {
	Set = oSet;
	Boolean = oBoolean;
	Number = oNumber;
	String = oString;
	Date = oDate;
	if(subclass) {
		Set = Set.extend(test.overwrite,test.subclass);
		Boolean = Boolean.extend(test.overwrite,test.subclass);
		Number = Number.extend(test.overwrite,test.subclass);
		String = String.extend(test.overwrite,test.subclass);
		Date = Date.extend(test.overwrite,test.subclass);
	} else {
		Set.extend(test.overwrite,test.subclass);
		Boolean.extend(test.overwrite,test.subclass);
		Number.extend(test.overwrite,test.subclass);
		String.extend(test.overwrite,test.subclass);
		Date.extend(test.overwrite,test.subclass);
	}
	describe('overwrite:' + test.overwrite + " subclass:" + test.subclass, function() {
		describe('Set',function() {
			var a = new Set([1,2,3]), sa1 = new Set([1,2,3]), sa2 = new Set([4,5,6]);
			it('count ',function() {
				expect(sa1.count).to.equal(sa1.size);
			});
			it('eq ',function() {
				expect(sa1.eq(a)).to.be.true;
			});
			it('eq should fail ',function() {
				expect(sa2.eq(a)).to.be.false;
			});
			it('neq ',function() {
				expect(sa2.neq(a)).to.be.true;
			});
			it('min ',function() {
				expect(sa1.getMin()).to.equal(1);
			});
			it('min later',function() {
				expect(new Set([3,2,1]).getMin()).to.equal(1);
			});
			it('avg ',function() {
				expect(sa1.getAvg()).to.equal(2);
			});
			it('every ', function() {
				expect(a.every(function(item) {
					return item!=0;
				})).to.be.true;
			});
			it('every false ', function() {
				expect(a.every(function(item) {
					return item!=3;
				})).to.be.false;
			});
			it('some ', function() {
				expect(a.some(function(item) {
					return item===3;
				})).to.be.true;
			});
			it('some false ', function() {
				expect(a.some(function(item) {
					return item===4;
				})).to.be.false;
			});
			it('max ',function() {
				expect(sa1.getMax()).to.equal(3);
			});
			it('sum ',function() {
				expect(sa1.getSum()).to.equal(6);
			});
			it('sum filter ',function() {
				expect(sa1.getSum(function(value) { return (value!==1 ? value : undefined); })).to.equal(5);
			});
			it('map ', function() {
				var result = a.map(function(currentValue) { 
					return currentValue+1;
				});
				expect(result.valueAt(0)).to.equal(2);
				expect(result.valueAt(1)).to.equal(3);
				expect(result.valueAt(2)).to.equal(4);
			});
			it('reduce ', function() {
				var result = a.reduce(function(previousValue,currentValue) { 
					return previousValue + currentValue;
				},0);
				expect(result).to.equal(6);
			});
			it('includes ',function() {
				expect(sa1.includes(1)).to.be.true;
			});
			it('find ',function() {
				expect(sa1.find(function(value) { return value===1; })).to.equal(0);
			});
			it('indexOf ',function() {
				expect(sa1.indexOf(3)).to.equal(2);
			});
			it('indexOf NaN',function() {
				expect(new Set([NaN]).indexOf(NaN)).to.equal(0);
			});
			it('join ',function() {
				expect(sa1.join()).to.equal("1,2,3");
			});
			it('join dot ',function() {
				expect(sa1.join(".")).to.equal("1.2.3");
			});
			it('intersects ',function() {
				expect(sa1.intersects(a)).to.be.true;
			});
			it('coincident ',function() {
				expect(sa1.coincident(a)).to.be.true;
			});
			it('disjoint ',function() {
				expect(sa1.disjoint(sa2)).to.be.true;
			});
			it('intersects Set ',function() {
				expect(sa1.intersects(new Set([1,2,3]))).to.be.true;
			});
			it('intersects Array ',function() {
				expect(sa1.intersects([1,2,3])).to.be.true;
			});
			it('coincident Set ',function() {
				expect(sa1.coincident(new Set([1,2,3]))).to.be.true;
			});
			it('coincident Array ',function() {
				expect(sa1.coincident([1,2,3])).to.be.true;
			});
			it('disjoint Set ',function() {
				expect(sa1.disjoint(new Set([4,5,6]))).to.be.true;
			});
			it('disjoint Array ',function() {
				expect(sa1.disjoint([4,5,6])).to.be.true;
			});
			it('intersection Set ',function() {
				var result = sa1.intersection(new Set([1,2]));
				expect(result.includes(1)).to.be.true;
				expect(result.includes(2)).to.be.true;
				expect(result.size).to.equal(2);
			});
			it('intersection Array ',function() {
				var result = sa1.intersection([1,2]);
				expect(result.includes(1)).to.be.true;
				expect(result.includes(2)).to.be.true;
				expect(result.size).to.equal(2);
			});
			it('toJSON ',function() {
				var result = sa1.toJSON();
				expect(result).to.be.instanceof(Array);
				expect(result.length).to.equal(3);
				expect(result[0]).to.equal(1);
				expect(result[1]).to.equal(2);
				expect(result[2]).to.equal(3);
			});
		});

		describe('Boolean',function() {
			var t = true, f = false, etrue = new Boolean(true), efalse = new Boolean(false);
			it('lt ',function() {
				expect(efalse.lt(true)).to.be.true;
			});
			it('lte ',function() {
				expect(efalse.lte(true)).to.be.true;
			});
			it('lt Object ',function() {
				expect(efalse.lt(t)).to.be.true;
			});
			it('eq false ',function() {
				expect(efalse.eq(f)).to.be.true;
			});
			it('eq true ',function() {
				expect(etrue.eq(t)).to.be.true;
			});
			it('eeq ',function() {
				expect(etrue.eeq(etrue)).to.be.true;
			});
			it('neq ',function() {
				expect(etrue.neq(f)).to.be.true;
			});
			it('neeq ',function() {
				expect(etrue.neeq(t)).to.be.true;
			});
			it('neq false ',function() {
				expect(etrue.neq(t)).to.be.false;
			});
			it('neeq false ',function() {
				expect(etrue.neeq(etrue)).to.be.false;
			});
			it('gte ',function() {
				expect(etrue.gte(false)).to.be.true;
			});
			it('gt ',function() {
				expect(etrue.gt(false)).to.be.true;
			});
			it('gt Object',function() {
				expect(etrue.gt(efalse)).to.be.true;
			});
		});


		describe('Number',function() {
			var n = 1, en = new Number(1);
			it('lt ',function() {
				expect(en.lt(2)).to.be.true;
			});
			it('lte ',function() {
				expect(en.lte(2)).to.be.true;
			});
			it('eq ',function() {
				expect(en.eq(n)).to.be.true;
			});
			it('eeq ',function() {
				expect(en.eeq(en)).to.be.true;
			});
			it('eeq false',function() {
				expect(en.eeq(1)).to.be.false;
			});
			it('neq ',function() {
				expect(en.neq(0)).to.be.true;
			});
			it('neq false',function() {
				expect(en.neq(en)).to.be.false;
			});
			it('neeq ',function() {
				expect(en.neeq(1)).to.be.true;
			});
			it('neeq false',function() {
				expect(en.neeq(en)).to.be.false;
			});
			it('eq Number',function() {
				expect(en.eq(n)).to.be.true;
			});
			it('gte ',function() {
				expect(en.gte(1)).to.be.true;
			});
			it('gt ',function() {
				expect(en.gt(0)).to.be.true;
			});
			it('between ', function() {
				expect(en.between(0,2)).to.be.true;
			});
			it('between on first boundary', function() {
				expect(en.between(1,2)).to.be.true;
			});
			it('between on second boundary', function() {
				expect(en.between(2,1)).to.be.true;
			});
			it('outside ', function() {
				expect(en.outside(3,4)).to.be.true;
			});
		});

		describe('String',function() {
			var s = new String("a string"), es = new String("a string");
			it('lt ',function() {
				expect(new String("a").lt("b")).to.be.true;
			});
			it('lte ',function() {
				expect(new String("a").lte("b")).to.be.true;
			});
			it('eq ',function() {
				expect(es.eq(s)).to.be.true;
			});
			it('eeq ',function() {
				expect(es.eeq(es)).to.be.true;
			});
			it('eeq false',function() {
				expect(es.eeq(s)).to.be.false;
			});
			it('neq false',function() {
				expect(es.neq(es)).to.be.false;
			});
			it('neeq ',function() {
				expect(es.neeq(s)).to.be.true;
			});
			it('neeq false',function() {
				expect(es.neeq(es)).to.be.false;
			});
			it('gte ',function() {
				expect(new String("b").gte("b")).to.be.true;
			});
			it('gt ',function() {
				expect(new String("b").gt("a")).to.be.true;
			});
			it('soundex ',function() {
				expect(es.echoes("a strng")).to.be.true;
			});
			it('soundex to fail',function() {
				expect(es.echoes("a nmbr")).to.be.false;
			});
			it('between ', function() {
				expect(es.between("*","b")).to.be.true;
			});
			it('between on first boundary', function() {
				expect(es.between(es,"b")).to.be.true;
			});
			it('between on second boundary', function() {
				expect(es.between("b",es)).to.be.true;
			});
			it('outside ', function() {
				expect(es.outside("b","d")).to.be.true;
			});
		});

		describe('Date',function() {
			var dt = new Date(2016,12,0,0,0,0,0), edt = new Date(2016,12,0,0,0,0,0), now = new Date();
			it('dt 1 ',function() {
				expect(new Date(2016)).to.be.instanceof(Date);
			});
			it('dt 2 ',function() {
				expect(new Date(2016,12)).to.be.instanceof(Date);
			});
			it('dt 3 ',function() {
				expect(new Date(2016,12,1)).to.be.instanceof(Date);
			});
			it('dt 4 ',function() {
				expect(new Date(2016,12,1,1)).to.be.instanceof(Date);
			});
			it('dt 5 ',function() {
				expect(new Date(2016,12,1,1,30)).to.be.instanceof(Date);
			});
			it('dt 6 ',function() {
				expect(new Date(2016,12,1,1,30,30)).to.be.instanceof(Date);
			});	
			it('dt 7 ',function() {
				expect(new Date(2016,12,1,1,30,30,500)).to.be.instanceof(Date);
			});	
			it('lt ',function() {
				expect(now.lt(new Date(now.getTime()+10000))).to.be.true;
			});
			it('lte ',function() {
				expect(now.lte(new Date(now.getTime()+10000))).to.be.true;
			});
			it('eq ',function() {
				expect(edt.eq(dt)).to.be.true;
			});
			it('eq Y ',function() {
				expect(edt.eq(dt,"Y")).to.be.true;
			});
			it('eq M ',function() {
				expect(edt.eq(dt,"M")).to.be.true;
			});
			it('eq D ',function() {
				expect(edt.eq(dt,"D")).to.be.true;
			});
			it('eq h ',function() {
				expect(edt.eq(dt,"h")).to.be.true;
			});
			it('eq m ',function() {
				expect(edt.eq(dt,"m")).to.be.true;
			});
			it('eq s ',function() {
				expect(edt.eq(dt,"s")).to.be.true;
			});
			it('eq ms ',function() {
				expect(edt.eq(dt,"ms")).to.be.true;
			});
			it('eeq ',function() {
				expect(dt.eeq(dt)).to.be.true;
			});
			it('neq ',function() {
				expect(dt.neq(now)).to.be.true;
			});
			it('neeq ',function() {
				expect(dt.neeq(edt)).to.be.true;
			});
			it('neq fail',function() {
				expect(dt.neq(edt)).to.be.false;
			});
			it('neeq fail',function() {
				expect(dt.neeq(dt)).to.be.false;
			});
			it('gte ',function() {
				expect(new Date(now.getTime()+10000).gte(now)).to.be.true;
			});
			it('gt ',function() {
				expect(new Date(now.getTime()+10000).gt(now)).to.be.true;
			});
			it('getLastDayOfMonth ',function() {
				expect(edt.getLastDayOfMonth()).to.equal(31);
			});
			it('2016 isLeapYear ',function() {
				expect(edt.isLeapYear()).to.be.true
			});
			it('time ',function() {
				edt.time = edt.getTime();
				expect(edt.time).to.equal(edt.getTime());
			});
			it('year ',function() {
				edt.year = 17;
				expect(edt.year).to.equal(17);
			});
			it('fullYear ',function() {
				edt.fullYear = 2017;
				expect(edt.fullYear).to.equal(2017);
			});
			it('month ',function() {
				edt.month = 0;
				expect(edt.month).to.equal(0);
			});
			it('dayOfMonth ',function() {
				edt.dayOfMonth = 15;
				expect(edt.dayOfMonth).to.equal(15);
			});
			it('hours ',function() {
				edt.hours = 12;
				expect(edt.hours).to.equal(12);
			});
			it('minutes ',function() {
				edt.minutes = 12;
				expect(edt.minutes).to.equal(12);
			});
			it('seconds ',function() {
				edt.seconds = 12;
				expect(edt.seconds).to.equal(12);
			});
			it('milliseconds ',function() {
				edt.milliseconds = 12;
				expect(edt.milliseconds).to.equal(12);
			});
		});
	});
});
		
