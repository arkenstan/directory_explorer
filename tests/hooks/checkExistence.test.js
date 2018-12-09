const { ifExists } = require('../../hooks');
const assert = require('assert');

let structure = {
  root: { id: 'a', name: 'root', type: 'dir', components: ['apple'] },
  apple: { id: 'a>item1', name: 'apple', type: 'item' }
};
const commandCreate = {
  type: 'create',
  option: 'item',
  optionArgs: ['chocolate'],
  flag: '',
  flagArgs: [],
  cmd: 'create item chocolate'
};
const commandDelete = {
  type: 'delete',
  option: 'dir',
  optionArgs: ['mango'],
  flag: '',
  flagArgs: [],
  cmd: 'delete dir chocolate'
};

describe('Check existence hook', function() {
  describe('check for create command', function() {
    it(`should return same context back`, function() {
      const result = ifExists({ structure, command: commandCreate });
      assert.deepEqual(result, { structure, command: commandCreate });
    });
  });
  describe('check for delete command', function() {
    it(`Should throw an error`, function() {
      assert.throws(function() {
        ifExists({ structure, command: commandDelete });
      }, `Doesn't Exist`);
    });
  });
});
