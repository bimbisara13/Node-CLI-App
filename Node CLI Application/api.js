const request = require('superagent');

const BASE_URL = 'https://cat-fact.herokuapp.com';

const getFacts = async (animalType, count) => {
    try {
        const response = await request.get(`${BASE_URL}/facts/random`).query({ animal_type: animalType, amount: count });
        return response.body;
    } catch (error) {
        console.error(error);
    }
};

const getFactById = async (id) => {
    try {
        const response = await request.get(`${BASE_URL}/facts/${id}`);
        return response.body;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    getFacts,
    getFactById,
};