const cheerio = require('cheerio');
const axios = require('axios');

async function getTableData() {
  const response = await axios.get('https://www.dwd.de/DE/fachnutzer/luftfahrt/teaser/gafor/node_37.html');
  const $ = cheerio.load(response.data);
  const table = $('table.standard');
  const rows = table.find('tr');

  const data = [];
  rows.each((index, row) => {
    const cells = $(row).find('td');
    const cellData = [];
    cells.each((cellIndex, cell) => {
      cellData.push($(cell).text().trim());
    });
    data.push(cellData);
  });

  return data;
}

getTableData().then(data => console.log(data));
