const { ifExists, typeCheck, checkUnique } = require('../../hooks');
module.exports = {
  before: [ifExists, typeCheck, checkUnique],
  after: []
};
