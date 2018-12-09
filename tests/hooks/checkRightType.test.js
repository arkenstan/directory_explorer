const { typeCheck } = require('../../hooks');
const assert = require('assert');

let structure = {
  root: { id: 'a', name: 'root', type: 'dir', components: ['apple'] },
  fruits: { id: 'a>dir1', name: 'fruits', type: 'dir', components: [] },
  apple: { id: 'a>item1', name: 'apple', type: 'item' }
};
const commandCreate = {
  type: 'create',
  option: 'item',
  optionArgs: ['testItem', 'apple'],
  cmd: 'create item chocolate'
};
const commandCreate2 = {
  type: 'create',
  option: 'item',
  optionArgs: ['testItem', 'fruits'],
  cmd: 'create item chocolate'
};

describe('Check right type hook', function() {
  describe('Create command tests', function() {
    it('should failed to create on item', function() {
      assert.throws(function() {
        typeCheck({ structure, command: commandCreate });
      }, 'Invalid operation');
    });
    it('should return successfully', function() {
      let result = typeCheck({ structure, command: commandCreate2 });
      assert.deepEqual(result, { structure, command: commandCreate2 });
    });
  });

  describe('should fail to create apple', function() {
    it(`Should throw an error`, function() {
      assert.throws(function() {
        ifExists({ structure, command: commandDelete });
      }, `Element already exists`);
    });
  });
});
