const pipeline = require('../../helpers/pipeline');
const hooks = require('./create.hooks');

function serviceLogic(context) {
  const { data } = context;
  return context;
}

let service = context => {
  pipeline(context, ...hooks.before, serviceLogic, ...hooks.after, ...hooks.error);
};

module.exports = serviceLogic;
