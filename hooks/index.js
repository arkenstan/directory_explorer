const ifExists = require('./checkExistence.hook');
const typeCheck = require('./checkRightType');
const flagPreProcess = require('./preprocessFlag');
module.exports = {
  ifExists,
  typeCheck,
  flagPreProcess
};
