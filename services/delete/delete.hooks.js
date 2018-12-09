const { ifExists, typeCheck } = require('../../hooks');
module.exports = {
  before: [ifExists],
  after: []
};
