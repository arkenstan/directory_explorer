const { flagPreProcess } = require('../../hooks');
const assert = require('assert');

let structure = {
  root: { id: 'a', name: 'root', type: 'dir', components: ['apple', 'chocolate'] },
  apple: { id: 'a>item1', name: 'apple', type: 'item' },
  chocolate: { id: 'a>item2', name: 'chocolate', type: 'item' }
};
const command = {
  type: 'move',
  option: 'item',
  optionArgs: ['chocolate', 'root'],
  flag: 'before',
  flagArgs: ['apple'],
  cmd: 'move item chocolate root before apple'
};

const expected = {
  type: 'move',
  option: 'item',
  optionArgs: ['chocolate', 'root'],
  flag: 'before',
  flagArgs: ['apple'],
  flagCalc: 0,
  cmd: 'move item chocolate root before apple'
};

describe('Check preprocess hook', function() {
  describe('Check setup flagCalc index for movement', function() {
    it(`should give index before apple i.e. 0`, function() {
      let result = flagPreProcess({ structure, command });
      assert.deepEqual(result.command, expected);
    });
  });
});
