const fs = require('fs');
const PATH = './historyMetaData.json';

let historyMetadata = [];
try {
  const jsonData = fs.readFileSync(PATH, 'utf-8');
  historyMetadata = JSON.parse(jsonData);
} catch (err) {
}

function saveHistoryMetaData(search, resultCount) {
  historyMetadata.push({ search: search, resultCount });

  fs.writeFile(PATH, JSON.stringify(historyMetadata), err => {
    if (err) {
      console.error(`Couldn't save search history: ${err.message}`);
    } else {
      console.log('\n-------------History Saved--------------');
    }
  });
}

module.exports = { saveHistoryMetaData };
