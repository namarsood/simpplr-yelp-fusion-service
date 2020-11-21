const config = {
    PORT: process.env.PORT || 3000,
    YELP_BASE_URL: "https://api.yelp.com/v3",
    YELP_API_KEY: "Bearer pSxxXBpunBnBT0mIoP_m6VTEy32nmGTOG8xO5_9ehd8uIPpSgZvaSTxqmVoNdR_OxuXI2u5JLB5gltsjBUxat5sy4ci96wvRmWJT_Bmw473B48rMEeZQml2lcPBeX3Yx",
    API_VERSIONS:{
        V1: "v1"
    },
    APIS: {
        TOP_10_ICECREAM_SHOPS: "top-10-icecream-shops"
    }
};

module.exports = config;