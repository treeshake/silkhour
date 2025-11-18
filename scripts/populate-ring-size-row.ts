import { readFileSync, writeFileSync } from 'fs';

// Read rows from external TSV file
const inputFilePath = './scripts/input.tsv';
const rows = readFileSync(inputFilePath, 'utf-8').trim();

// Read in rows, work out number of rows based  on new line separator, and copy the last row up to endIdx
const rowArray = rows.split('\n');
const row = rowArray[rowArray.length - 1];

const startIdx = 6;
const endIdx = 41;
const rowsCount = endIdx - startIdx;

const data: string[] = [];

for (let i = 0; i < rowsCount; i++) {
  data.push(row);
}

const resultFilePath = './scripts/output.tsv';

// Add original rows and constructed rows together
const constructedCSV = `${rows}\n${data.join('\n')}`;

writeFileSync(resultFilePath, constructedCSV);

