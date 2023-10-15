//
const { successCode, errorCode } = require('../../const/statusCode');
const { getPagingData, getPagination } = require('../../Helper/GlobalHelper');
const Model = require('../../../db/models/dbModel');

exports.getHomeBanner = async (req, res) => {
  const attributesList = [
    'title',
    'image',
    'banner_type',
    'external_url',
    'show_pages',
    'position',
    'is_active ',
  ];
  try {
    const results = await Model.findAll(
      'rcl_app_banners',
      (attributes = attributesList),
      'id',
      'DESC'
    );
    console.log(results.length);
    return res.status(200).send(successCode(true, 'success', results, null));
  } catch (error) {
    console.log(error);
    return res.status(500).send(errorCode(true, 'error', error));
  }
};
