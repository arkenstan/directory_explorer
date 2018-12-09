const { syntaxParser } = require('../../helpers');
const assert = require('assert');

const goodCommand = 'create dir test1';
const badCommand = 'dir create test1';

describe('Syntax Parser', function() {
  describe('Correct syntax test', function() {
    it(`Should return true`, function() {
      const result = syntaxParser(goodCommand);
      assert.equal(result, true);
    });
  });
  describe('In correct syntax test', function() {
    it(`Should return false`, function() {
      const result = syntaxParser(badCommand);
      assert.equal(result, false);
    });
  });
});
