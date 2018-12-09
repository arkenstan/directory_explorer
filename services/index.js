const createService = require('./create/create.service');
const deleteService = require('./delete/delete.service');
const moveService = require('./move/move.service');

module.exports = {
  create: createService,
  delete: deleteService,
  move: moveService
};
