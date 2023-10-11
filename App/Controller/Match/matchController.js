//
const { successCode, errorCode } = require('../../const/statusCode');
const { getPagingData, getPagination } = require('../../Helper/GlobalHelper');
const Model = require('../../../db/models/dbModel');

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
      'rcl_api_matches',
      (attributes = attributesList),
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
    return res.status(500).send(errorCode(true, 'error', error));
  }
};
