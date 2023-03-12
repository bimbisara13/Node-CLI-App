const { searchAndDisplayResults } = require('./app');
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

    searchAndDisplayResults(keyword, animalType, count);
} else {
    console.error('Invalid command. Type "node cli.js --help" for usage instructions.');
}
