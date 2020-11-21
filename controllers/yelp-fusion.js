const universalFunctions = require("../universal-functions");
const service = require("../services/yelp-fusion");


// will return the top ten icecream joints in Redwood city sorted by ratings 
async function businessSearch(req, res) {
  try {

    // get top 10 business list
    let result = await service.businessSearch({
      term: "ice cream",
      location: "Redwood City",
      limit: 10
    });

    let businesses = (result && result.data && result.data.businesses) || [];

    // project name and location
    businesses = businesses.map((obj) => {
      return { id: obj.id, name: obj.name, location: obj.location };
    });

    // due to 429 error(to many requests), limitingthe number of businessIds
    const businessIds = businesses.map((obj) => obj.id).slice(0, 5);

    // get reviews for the passed busineess id using yesp api
    result = await service.reviews({ businessIds });

    // project name, text, rating of the review
    const reviews = result.map((obj) => {
      return {
        name: obj.data.reviews[0].user.name,
        text: obj.data.reviews[0].text,
        rating: obj.data.reviews[0].rating
      };
    });

    // merge businesses with the reviews
    businesses.forEach(function (obj, index) {
      obj.review = reviews[index];
    });

    universalFunctions.sendSuccess(res, businesses);
  } catch (error) {
    console.log(
      "---------------ERROR----------------",
      JSON.stringify(error, [
        "message",
        "arguments",
        "type",
        "name",
        "constraint",
      ])
    );
    universalFunctions.sendError(res, error);
  }
}

module.exports = {
  businessSearch,
};
