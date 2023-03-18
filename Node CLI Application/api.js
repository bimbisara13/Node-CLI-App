const request = require('superagent');
const BASE_URL = 'https://api.tvmaze.com';

const getShowList = async (search) => {
    try {
        const response = await request.get(`${BASE_URL}/search/shows`).query({ q: search });
        return response.body;
    } catch (error) {
        console.error(error);
    }
};

const getShowById = async (id) => {
    try {
        const response = await request.get(`${BASE_URL}/shows/${id}`);
        return response.body;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    getShowList,
    getShowById,
};