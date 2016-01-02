var expect, Validator;
if(typeof(window)==="undefined") {
	expect = require("chai").expect;
	require('../index.js');
}

describe('Date',function() {
	var dt1 = new Date(2016,1,0,0,0,0,0);
	it('2016 isLeapYear',function() {
		expect(dt1.isLeapYear()).to.be.true
	});
});