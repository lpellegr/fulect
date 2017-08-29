# fulect
Simple utility functions to wait for all promises, all fulfilled promises or all rejected promises.

## Installation

```
npm install @noticeable/fulect
```

## Usage

Given the following context:

```javascript
const fulect = require('@noticeable/fulect');

const p1 = Promise.resolve(1);
const p2 = Promise.reject(2);
const p3 = Promise.reject(3);
const p4 = Promise.resolve(4);
```

You can return a promise that is fulfilled with an array of promises, but only after all the original promises have settled, i.e. become either fulfilled or rejected:

```javascript
fulect.allSettled([p1, p2, p3, p4])
    .then(value => {
        // value is [
        //     {state: fulect.fulfilled(), value: 1},
        //     {state: fulect.rejected(), reason: 2},
        //     {state: fulect.rejected(), reason: 3},
        //     {state: fulect.fulfilled(), value: 4},
        // ]
    })
```

or, return a promise that is fulfilled with an array of promises, but only after all the original promises that should fulfill are fulfilled (rejected promise reasons are discarded):

```javascript
fulect.allFulfilled([p1, p2, p3, p4])
    .then(value => {
        // value is [1,4]
    })
```

or, return a promise that is fulfilled with an array of promises, but only after all the original promises that should reject are rejected (fulfilled promise values are discarded):

```javascript
fulect.allRejected([p1, p2, p3, p4])
    .then(value => {
        // value is [2,3]
    })
```

## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.
