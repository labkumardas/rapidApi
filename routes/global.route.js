const prefix = require('../config/default.json').apiPrefix;
const matchController = require('../App/Controller/Match/matchController');
const assetsController = require('../App/Controller/Assets/assetsController');

module.exports = function (app) {
  app.get(`/`, matchController.test);
  app.post(`${prefix}/getMatchCommentary`, matchController.getMatchCommentary);

  app.get(`${prefix}/getHomeBanner`, assetsController.getHomeBanner);
  app.post(`${prefix}/getMatches`, matchController.getMatches);
  app.post(`${prefix}/getMatchInfo`, matchController.getMatchInfo);
  app.post(`${prefix}/getMatchLive`, matchController.getMatchLive);
  app.post(`${prefix}/getMatchScoreCard`, matchController.getMatchScoreCard);
  app.post(`${prefix}/getSeriesList`, matchController.getSeriesList);
  app.post(`${prefix}/getMatchesBySeries`, matchController.getMatchesBySeries);
};
