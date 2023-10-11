function successCode(status, message, data, paginationData) {
  if (paginationData == 'null' || paginationData == null) {
    let response = {
      status: status,
      msg: message,
      payload: { data },
    };
    return response;
  } else {
    let response = {
      status: status,
      msg: message,
      payload: { data },
      paginationData: paginationData,
    };
    return response;
  }
}
function errorCode(status, message, data) {
  let response = {
    status,
    message,
    data,
  };
  return response;
}

module.exports = { successCode, errorCode };
