const { ifExists, typeCheck, flagPreProcess } = require('../../hooks');
module.exports = {
  before: [ifExists, typeCheck, flagPreProcess],
  after: [],
  error: []
};
