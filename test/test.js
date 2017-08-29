'use strict';

const chai = require('chai');
const expect = chai.expect;

const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const fulect = require('../index');

describe('allSettled', function () {

    it('should wait for all promises', () => {

        const p1 = Promise.resolve(1);
        const p2 = sleepf(10);
        const p3 = Promise.resolve(3);

        return expect(fulect.allSettled([p1, p2, p3])).to.be.fulfilled.and.to.eventually.deep.equal([
            fulfilled(1), fulfilled('done'), fulfilled(3)
        ]);
    });

    it('should wait for all rejected promises', () => {

        const p1 = Promise.reject(1);
        const p2 = sleepf(10);
        const p3 = Promise.reject(3);

        return expect(fulect.allSettled([p1, p2, p3])).to.be.fulfilled.and.to.eventually.deep.equal([
            rejected(1), fulfilled('done'), rejected(3)
        ]);
    });

    it('should wait for all (fulfilled and rejected) promises', () => {

        const p1 = Promise.resolve(1);
        const p2 = sleepf(10);
        const p3 = Promise.reject(3);
        const p4 = Promise.resolve(4);

        return expect(fulect.allSettled([p1, p2, p3, p4])).to.be.fulfilled.and.to.eventually.deep.equal([
            fulfilled(1), fulfilled('done'), rejected(3), fulfilled(4)
        ]);
    });

});

describe('allFulfilled', function () {

    it('should wait for all fulfilled promises', () => {

        const p1 = Promise.resolve(1);
        const p2 = sleepf(10);
        const p3 = Promise.resolve(3);

        return expect(fulect.allFulfilled([p1, p2, p3])).to.be.fulfilled.and.to.eventually.deep.equal([
            1, 'done', 3
        ]);
    });

    it('should get empty result value', () => {

        const p1 = Promise.reject(1);
        const p2 = sleepr(10);
        const p3 = Promise.reject(3);

        return expect(fulect.allFulfilled([p1, p2, p3])).to.be.fulfilled.and.to.eventually.deep.equal([]);
    });

    it('should return fulfilled promises only', () => {

        const p1 = Promise.resolve(1);
        const p2 = sleepf(10);
        const p3 = Promise.reject(3);
        const p4 = Promise.resolve(4);

        return expect(fulect.allFulfilled([p1, p2, p3, p4])).to.be.fulfilled.and.to.eventually.deep.equal([
            1, 'done', 4
        ]);
    });

});

describe('allRejected', function () {

    it('should wait for all rejected promises', () => {

        const p1 = Promise.reject(1);
        const p2 = sleepr(10);
        const p3 = Promise.reject(3);

        return expect(fulect.allRejected([p1, p2, p3])).to.be.fulfilled.and.to.eventually.deep.equal([
            1, 'done', 3
        ]);
    });

    it('should get empty result value', () => {

        const p1 = Promise.resolve(1);
        const p2 = sleepf(10);
        const p3 = Promise.resolve(3);

        return expect(fulect.allRejected([p1, p2, p3])).to.be.fulfilled.and.to.eventually.deep.equal([]);
    });

    it('should return rejected promises only', () => {

        const p1 = Promise.resolve(1);
        const p2 = sleepr(10);
        const p3 = Promise.reject(3);
        const p4 = Promise.resolve(4);

        return expect(fulect.allRejected([p1, p2, p3, p4])).to.be.fulfilled.and.to.eventually.deep.equal([
            'done', 3
        ]);
    });

});

function fulfilled(value) {
    return {
        state: fulect.fulfilled(),
        value: value
    }
}

function rejected(reason) {
    return {
        state: fulect.rejected(),
        reason: reason
    }
}

function sleepf(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve('done'), timeout)
    });
}

function sleepr(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(reject('done'), timeout)
    });
}
