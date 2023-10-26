const prefix = require('../config/default.json').apiPrefix;
const matchController = require('../App/Controller/Match/matchController');
const assetsController = require('../App/Controller/Assets/assetsController');

module.exports = function (app) {
  app.get(`/`, matchController.test);

  app.get(`${prefix}/getMatches`, matchController.getMatches);
  app.get(`${prefix}/getHomeBanner`, assetsController.getHomeBanner);
  app.post(`${prefix}/getMatchInfo`, matchController.getMatchInfo);
  app.post(`${prefix}/getMatchLive`, matchController.getMatchLive);
  app.post(`${prefix}/getMatchCommentary`, matchController.getMatchCommentary);
  app.post(`${prefix}/getMatchScoreCard`, matchController.getMatchScoreCard);
};
