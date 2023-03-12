const enquirer = require('enquirer');
const apiCall = require('./api');
const args = process.argv.slice(2);

if (args[0] === '--help' || args.length === 0) {
    console.log('Usage:');
    console.log('node cli.js search --animal-type <animal_type>');
    console.log('node cli.js search --animal-type <animal_type> --count <count>');
} else if (args[0] === 'search') {
    const keyword = args[2];
    const animalTypeIndex = args.indexOf('--animal-type');
    const countIndex = args.indexOf('--count');
    let animalType = null;
    let count = null;

    if (animalTypeIndex !== -1 && countIndex !== -1) {
        animalType = args[animalTypeIndex + 1];
        count = args[countIndex + 1];
    } else if (animalTypeIndex !== -1) {
        animalType = args[animalTypeIndex + 1];
        count = 1;
    } else if (countIndex !== -1) {
        count = args[countIndex + 1];
    }

    if (count === null) {
        count = 1;
    }

    apiCall.getFacts(animalType, count)
        .then(facts => {
            if (count == 1) {
                if (facts.text == null) {
                    console.log(`\nFound 0 facts for "${keyword}":`);
                } else {
                    console.log(`\nFound 1 fact containing "${keyword}":`);
                    console.log('- ' + facts.text);
                    const factId = facts._id;
                    apiCall.getFactById(factId)
                        .then(fact => {
                            console.log('Detailed data for the selected fact:');
                            console.log(fact);
                        })
                        .catch(error => console.error(error));
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

                        prompt.run()
                            .then(answer => {
                                const factIndex = facts.findIndex(fact => fact.text === answer);
                                const factId = facts[factIndex]._id;
                                apiCall.getFactById(factId)
                                    .then(fact => {
                                        console.log('\nDetailed info for the selected fact:');
                                        console.log(fact);
                                    })
                                    .catch(error => console.error(error));
                            })
                            .catch(error => console.error(error));
                    } else {
                        const factId = facts[0]._id;
                        apiCall.getFactById(factId)
                            .then(fact => {
                                console.log('\nDetailed info for the selected fact:');
                                console.log(fact);
                            })
                            .catch(error => console.error(error));
                    }
                }
            }
        })
        .catch(error => console.error(error));
} else {
    console.error('Invalid command. Type "node cli.js --help" for usage instructions.');
}
