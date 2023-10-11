const { RefreshToken, User } = require('../../db/models');

const moment = require('moment');

exports.RefreshToken = async (userId, req) => {
  const refreshToken = await RefreshToken.create({
    user_id: userId,
    token: this.RandomString(120),
    expires: 60 * 60 * 24 * 7 * 1000,
    created: moment(),
    createdByIp: req.ip,
  });
  return refreshToken.token;
};

exports.VerifyRefreshToken = async (token, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const usid = await User.findOne({
        where: { external_id: userId },
        raw: true,
        nest: true,
      });

      RefreshToken.findOne({
        where: {
          token: token,
          user_id: usid.id,
        },
      })
        .then((data) => {
          resolve(data);
        })
        .catch(() => {
          reject(false);
        });
    } catch (e) {
      reject(false);
    }
  });
};

exports.RandomString = (length) => {
  var result = '';
  var characters =
    '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%^&*@abcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

exports.getRandomInt = async (length) => {
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
  );
};
