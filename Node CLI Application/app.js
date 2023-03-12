const enquirer = require('enquirer');
const apiCall = require('./api');

const searchAndDisplayResults = async (keyword, animalType, count) => {
    try {
        const facts = await apiCall.getFacts(animalType, count);
        if (count == 1) {
            if (facts.text == null) {
                console.log(`\nFound 0 facts for "${keyword}":`);
            } else {
                console.log(`\nFound 1 fact containing "${keyword}":`);
                console.log('- ' + facts.text);
                const factId = facts._id;
                const fact = await apiCall.getFactById(factId);
                console.log('Detailed data for the selected fact:');
                console.log(fact);
            }
        } else {
            if (facts.length === 0) {
                console.log(`\nFound 0 facts for "${keyword}":`);
            } else {
                console.log(`\nFound ${facts.length} facts containing "${keyword}":`);
                facts.forEach((fact, index) => {
                    console.log(`${index + 1}. ${fact.text}`);
                });
                if (facts.length > 1) {
                    const prompt = new enquirer.Select({
                        name: 'fact',
                        message: 'Select a fact to view detailed info:',
                        choices: facts.map(fact => fact.text)
                    });

                    const answer = await prompt.run();
                    const factIndex = facts.findIndex(fact => fact.text === answer);
                    const factId = facts[factIndex]._id;
                    const fact = await apiCall.getFactById(factId);
                    console.log('\nDetailed info for the selected fact:');
                    console.log(fact);
                } else {
                    const factId = facts[0]._id;
                    const fact = await apiCall.getFactById(factId);
                    console.log('\nDetailed info for the selected fact:');
                    console.log(fact);
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    searchAndDisplayResults
};
