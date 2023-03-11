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
                    console.log(`Found 0 facts for "${keyword}":`);
                } else {
                    console.log(`Found 1 fact containing "${keyword}":`);
                    console.log('- ' + facts.text);
                }
            } else {
                console.log(`Found ${facts.length} facts containing "${keyword}":`);
                facts.forEach(fact => {
                    console.log('- ' + fact.text)
                });
            }
        })
        .catch(error => console.error(error));
} else {
    console.error('Invalid command. Type "node cli.js --help" for usage instructions.');
}
