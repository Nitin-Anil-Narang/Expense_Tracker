
const { Parser } = require('json2csv');

function convertToCSV(data) {
  const parser = new Parser();
  return parser.parse(data);
}

module.exports = convertToCSV;
