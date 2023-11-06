//
const { successCode, errorCode } = require('../../const/statusCode');
const { getPagingData, getPagination } = require('../../Helper/GlobalHelper');
const Model = require('../../../db/models/dbModel');

exports.test = async (req, res) => {
  try {
    return res.status(200).send({ response: 'welcome to rapidcricketAPI' });
  } catch (error) {
    return res.status(500).send({ response: error });
  }
};
//
exports.getMatches = async (req, res) => {
  let responseData = {};
  const { page, size } = req.body;
  const { limit, offset } = await getPagination(page, size);

  const attributesList = [
    'api_id',
    'id',
    'title',
    'short_title',
    'date_start',
    'status',
    'team_a',
    'team_b',
  ];

  try {
    const results = await Model.findAndCount(
      req,
      'rcl_api_matches',
      (attributes = null),
      'id',
      'DESC',
      offset
    );

    responseData = getPagingData(results, page);
    console.log(responseData);
    responseData.page = page;
    responseData.size = size;

    return res
      .status(200)
      .send(successCode(true, 'success', results, responseData));
  } catch (error) {
    console.log(error);
    return res.status(500).send(errorCode(true, 'error', error.message));
  }
};

exports.getMatchInfo = async (req, res) => {
  let responseData = {};

  const id = req.body.id;
  if (!id) {
    return res.status(403).send(errorCode(true, 'error', 'id is required!'));
  }
  const attributesList = [
    'api_id',
    'id',
    'status_str',
    'title',
    'short_title',
    'date_start',
    'status',
    'team_a',
    'team_b',
  ];
  const status_str = 'all';
  try {
    const results = await Model.findByMatchID(
      'rcl_api_matches',
      (attributes = null),
      id
    );

    return res.status(200).send(successCode(true, 'success', results, null));
  } catch (error) {
    console.log(error);
    return res.status(500).send(errorCode(true, 'error', error));
  }
};

//

exports.getMatchLive = async (req, res) => {
  let responseData = {};

  const id = req.body.id;
  if (!id) {
    return res.status(403).send(errorCode(true, 'error', 'id is required!'));
  }
  const attributesList = [
    'api_id',
    'id',
    'status_str',
    'title',
    'short_title',
    'date_start',
    'status',
    'team_a',
    'team_b',
  ];
  const status_str = 'live';
  try {
    const results = await Model.findByMatchID(
      'rcl_api_matches',
      (attributes = attributesList),
      id,
      status_str
    );

    return res.status(200).send(successCode(true, 'success', results, null));
  } catch (error) {
    console.log(error);
    return res.status(500).send(errorCode(true, 'error', error));
  }
};

exports.getMatchCommentary = async (req, res) => {};

///
exports.getMatchScoreCard = async (req, res) => {
  let responseData = {};

  const id = req.body.id;
  if (!id) {
    return res.status(403).send(errorCode(true, 'error', 'id is required!'));
  }
  const attributesList = [
    'match_id ',
    'live',
    'commentary',
    'wagon',
    'scorecard',
    'live_odds',
    'session_odds',
  ];
  const status_str = 'all';
  try {
    const results = await Model.findMatchIDFromChieldTable(
      'rcl_api_matches_stats',
      (attributes = null),
      id
    );

    return res.status(200).send(successCode(true, 'success', results, null));
  } catch (error) {
    console.log(error);
    return res.status(500).send(errorCode(true, 'error', error));
  }
};

exports.getSeriesList = async (req, res) => {
  let responseData = {};

  const id = req.body.id;
  if (!id) {
    return res.status(403).send(errorCode(true, 'error', 'id is required!'));
  }

  try {
    const results = await Model.findAll(
      'rcl_api_competitions',
      (attributes = null),
      'id',
      'DESC'
    );

    return res.status(200).send(successCode(true, 'success', results, null));
  } catch (error) {
    console.log(error);
    return res.status(500).send(errorCode(true, 'error', error));
  }
};

exports.getMatchesBySeries = async (req, res) => {
  let responseData = {};

  const id = req.body.id;
  if (!id) {
    return res.status(403).send(errorCode(true, 'error', 'id is required!'));
  }

  try {
    const results = await Model.findMatchBySeries(
      'rcl_api_matches',
      (attributes = null),
      id
    );

    return res.status(200).send(successCode(true, 'success', results, null));
  } catch (error) {
    console.log(error);
    return res.status(500).send(errorCode(true, 'error', error));
  }
};
