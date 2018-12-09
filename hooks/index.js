const ifExists = require('./checkExistence.hook');
const typeCheck = require('./checkRightType');
const flagPreProcess = require('./preprocessFlag');
const checkUnique = require('./checkUnique.hook');
module.exports = {
  ifExists,
  typeCheck,
  flagPreProcess,
  checkUnique
};
