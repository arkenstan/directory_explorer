const ifExists = require('./checkExistence.hook');
const typeCheck = require('./checkRightType');
const flagPreProcess = require('./preprocessFlag');
const checkUnique = require('./checkUnique.hook');
const checkIfParent = require('./checkIfParent.hook');
module.exports = {
  ifExists,
  typeCheck,
  flagPreProcess,
  checkUnique,
  checkIfParent
};
