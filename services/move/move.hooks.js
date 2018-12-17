const { ifExists, typeCheck, flagPreProcess, checkIfParent } = require('../../hooks');
module.exports = {
  before: [ifExists, typeCheck, flagPreProcess, checkIfParent],
  after: []
};
