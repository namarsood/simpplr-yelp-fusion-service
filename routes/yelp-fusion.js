module.exports = function (app) {
    const CONSTANTS = require('../config/constants');
    const API_VERSIONS = CONSTANTS.API_VERSIONS;
    const APIS = CONSTANTS.APIS;
    const controller = require('../controllers/yelp-fusion');

  /**
   * @swagger
   * /v1/top-10-icecream-shops:
   *  get:
   *     tags:
   *       - search
   *     description: get top 10 icream shops in Redwood City
   *     produces:
   *       - application/json
   *     responses:
   *      '200':
   *       description: A successful response
   */

app.get(
      `/${API_VERSIONS.V1}/${APIS.TOP_10_ICECREAM_SHOPS}`,
      controller.businessSearch
  );
};

