'use strict';

module.exports = {

    fulfilled() {
        return 0;
    },

    rejected() {
        return 1;
    },

    allSettled(promises) {
        const wrappedPromises =
            promises
                .map(p => Promise.resolve(p)
                    .then(
                        value => ({state: this.fulfilled(), value: value}),
                        reason => ({state: this.rejected(), reason: reason})));

        return Promise.all(wrappedPromises);
    },

    allFulfilled(promises) {
        return this.allSettled(promises)
            .then(value =>
                Promise.resolve(
                    value.filter(v => v.state === this.fulfilled())
                        .map(v => v.value)
                ));
    },

    allRejected(promises) {
        return this.allSettled(promises)
            .then(value =>
                Promise.resolve(
                    value.filter(v => v.state === this.rejected())
                        .map(v => v.reason)
                ));
    }

};
