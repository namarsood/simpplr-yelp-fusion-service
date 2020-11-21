const ERROR_MESSAGES = require("../config/error-messages");
const universalFunctions = require("../universal-functions");
const service = require('../services/yelp-fusion');

async function businessSearch(req, res) {
    try {

        let result = await service.businessSearch({term: "ice cream", location: "Redwood City"});

        
        console.log("-----",result.data);

        {
            "id": "vviNB5GkD0W4-GqEBlabIQ",
            "alias": "gulino-gelato-half-moon-bay-4",
            "name": "Gulino Gelato",
            "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/f4dEdeAM7JkSfSExNp2jkg/o.jpg",
            "is_closed": false,
            "url": "https://www.yelp.com/biz/gulino-gelato-half-moon-bay-4?adjust_creative=5p6FyEXmBc-X6nRXxru8Ag&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=5p6FyEXmBc-X6nRXxru8Ag",
            "review_count": 127,
            "categories": [
              {
                "alias": "gelato",
                "title": "Gelato"
              }
            ],
            "rating": 5,
            "coordinates": {
              "latitude": 37.461737,
              "longitude": -122.429252
            },
            "transactions": [],
            "price": "$$",
            "location": {
              "address1": "643 Main St",
              "address2": "Ste 6",
              "address3": "",
              "city": "Half Moon Bay",
              "zip_code": "94019",
              "country": "US",
              "state": "CA",
              "display_address": [
                "643 Main St",
                "Ste 6",
                "Half Moon Bay, CA 94019"
              ]
            },
            "phone": "",
            "display_phone": "",
            "distance": 18046.74305814287
          }

//         ○ business name
// ○ business address (street, city)
// ○ excerpt from a review of that business
// ○ name of the person that wrote the review
        universalFunctions.sendSuccess(res, result.data);

    } catch (error) {
        console.log("---------------ERROR----------------", JSON.stringify(error, ["message", "arguments", "type", "name", "constraint"]));
        universalFunctions.sendError(res, error);
    }
}

module.exports = {
    businessSearch
}