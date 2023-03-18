const { searchAndDisplayResults } = require('./app');
const args = process.argv.slice(2);

if (args[0] === '--help' || args.length === 0) {
    console.log('Usage:');
    console.log('node cli.js search --show-name <show_name>');
} else if (args[0] === 'search') {
    const search = args[2];
    searchAndDisplayResults(search);
} else {
    console.error('Invalid command. Type "node cli.js --help" for usage instructions.');
}
