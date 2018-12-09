const { parser } = require('../../helpers');
const assert = require('assert');

const testCommand = 'create dir test1';
const expectedOutput = {
  type: 'create',
  option: 'dir',
  optionArgs: ['test1'],
  flag: '',
  flagArgs: [],
  cmd: 'create dir test1'
};

describe('Command Parser', function() {
  describe('check command parsed successfully', function() {
    it(`Should return expected object`, function() {
      const result = parser(testCommand);
      assert.deepEqual(result, expectedOutput);
    });
  });
});
