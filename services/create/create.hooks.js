const { ifExists } = require('../../hooks');
module.exports = {
  before: [ifExists],
  after: [],
  error: []
};
