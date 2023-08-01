/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
const functions = {
  patch(data, obj) {
    Object.keys(data).forEach(async (column) => {
      if (data[column]) {
        obj[column] = data[column];
      }
    });
  },
};

module.exports = functions;
