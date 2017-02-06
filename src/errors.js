'use strict';

module.exports = {
  CameraNotFound: function (text) {
    return {
      statusCode: 404,
      message: text
    };
  }
};
