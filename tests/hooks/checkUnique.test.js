const { ifExists } = require('../../hooks');
const assert = require('assert');

let structure = {
  root: { id: 'a', name: 'root', type: 'dir', components: ['apple'] },
  apple: { id: 'a>item1', name: 'apple', type: 'item' }
};
const commandCreate = {
  type: 'create',
  option: 'item',
  optionArgs: ['apple'],
  flag: '',
  flagArgs: [],
  cmd: 'create item chocolate'
};

describe('Check unique hook', function() {
  describe('should fail to create apple', function() {
    it(`Should throw an error`, function() {
      assert.throws(function() {
        ifExists({ structure, command: commandDelete });
      }, `Element already exists`);
    });
  });
});
