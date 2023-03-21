const enquirer = require('enquirer');
const { getShowList, getShowById } = require('./api');
const { saveHistoryMetaData } = require('./history')

const searchAndDisplayResults = async (keyword) => {
    try {
        const shows = await getShowList(keyword);
        saveHistoryMetaData(keyword,shows.length)
        if (shows.length === 0) {
            console.log(`\nFound 0 shows for "${keyword}".`);
            return;
        }

        console.log(`\nFound ${shows.length} shows containing "${keyword}":`);
        shows.forEach((show, index) => {
            console.log(`${index + 1}. ${show.show.name}`);
        });

        if (shows.length === 1) {
            const showId = shows[0].show.id;
            const show = await getShowById(showId);
            console.log('\nDetailed data for the selected show:');
            console.log(show);
        } else {
            const prompt = new enquirer.Select({
                name: 'show',
                message: '\n\nSelect a show to view detailed info:',
                choices: shows.map((show) => show.show.name),
            });

            const answer = await prompt.run();
            const showIndex = shows.findIndex((show) => show.show.name === answer);
            const showId = shows[showIndex].show.id;
            const showDetails = await getShowById(showId);
            console.log(`\nDetailed info for ${showDetails.name}:`);
            console.log(showDetails);
        }
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    searchAndDisplayResults,
};
