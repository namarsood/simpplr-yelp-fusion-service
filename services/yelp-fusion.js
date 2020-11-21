const axios = require("axios");
const CONSTANTS = require("../config/constants");

/* will return the list of available businesses in a particular location matching a particular term
 *  data {term, location, limit, offset}
 *  term(string)- Search term, for example "food" or "restaurants".
 *  location(string)- This string indicates the geographic area to be used when searching for businesses.
 *  limit- number of docs to return
 */
async function businessSearch(data) {

    const headers = { authorization: CONSTANTS.YELP_API_KEY };
    const params = {
      term: data.term,
      location: data.location,
      limit: data.limit || 10,
      sort_by: "rating"
    };

    return axios.get(`${CONSTANTS.YELP_BASE_URL}/businesses/search`, {headers, params});
}

/* will return the list of reviews of all the businessIds passed
 *  data {businessIds: [id]}
 *  id(string)- id of the business
 */
async function reviews(data){

    const headers = { authorization: CONSTANTS.YELP_API_KEY };

    const review_promises = data.businessIds.map(id=>axios.get(`${CONSTANTS.YELP_BASE_URL}/businesses/${id}/reviews`, {headers}));

    return Promise.all(review_promises);
}

module.exports = {
  businessSearch,
  reviews
};
