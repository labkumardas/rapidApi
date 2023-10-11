const prefix = require('../config/default.json').apiPrefix;
const matchController = require('../App/Controller/Match/matchController');
const assetsController = require('../App/Controller/Assets/assetsController');

module.exports = function (app) {
  app.get(`${prefix}/getMatches`, matchController.getMatches);
  app.get(`${prefix}/getHomeBanner`, assetsController.getHomeBanner);
};
