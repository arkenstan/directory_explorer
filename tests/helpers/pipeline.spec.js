const { pipe } = require('../../helpers');
const assert = require('assert');

const square = num => num * num;
const increment = num => ++num;

const testInput = 1;
const expectedOutput = 4;

describe('Pipeline', function() {
  describe('Functions (sync)', function() {
    it(`${testInput} should be turned into ${expectedOutput}`, function() {
      const result = pipe(
        testInput,
        increment,
        square
      );
      assert.equal(result, expectedOutput);
    });
  });
});
