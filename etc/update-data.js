// Fetch the Google Sheet, download as XLXS, and convert to a JSON file
const fs = require('fs').promises;
const config = require('./config.json');
const { ExcelReader, GoogleDocFetcher } = require('kndlib/node');
const TMP_XLSX_PATH = `${__dirname}/../_tmp/gsheet.xlsx`;

(async function() {
    // Show the configuration for debugging purposes
    console.log(config);

    // First download the Google docs to a temporary location
    const spreadsheet = new GoogleDocFetcher(config.data.spreadsheet);
    await spreadsheet.writeTo(TMP_XLSX_PATH);

    // And now convert to a JSON file
    const reader = new ExcelReader(TMP_XLSX_PATH);
    const data = await reader.getData();

    const json = JSON.stringify(data, null, 4);
    await fs.writeFile(__dirname + '/../' + config.data.filename, json);
    console.log(`Wrote to ${config.data.filename}`);
})();