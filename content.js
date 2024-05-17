const scrapeData = () => {
  const sections = document.querySelectorAll('#screener-table > section');
  const headingElements = sections[0].querySelectorAll('div[id]');

  const scrapedData = Array.from(headingElements).map((elm) => {
    const selector =
      elm.getAttribute('id') === 'name'
        ? 'stock-name-col'
        : elm.getAttribute('id') + '-col';
    const rowElements = sections[1].querySelectorAll(
      '.' + selector + ' .desktop--only'
    );
    return {
      column: elm.querySelector('.data-cell .desktop--only').textContent,
      rows: Array.from(rowElements).map((el) => el.textContent),
    };
  });
  return scrapedData;
};

const generateCSVData = (scrapedData) => {
  const count = scrapedData[0].rows.length;

  // generate structured data
  const csvData = Array.from(
    {
      length: count,
    },
    (_, rowIndex) => {
      var obj = {};
      scrapedData.forEach((data) => {
        obj[data.column] = `"${data.rows[rowIndex]}"`;
      });
      return obj;
    }
  );

  const headers = Object.keys(csvData[0]).toString();
  // Get and stringify the keys of the first object in the array

  const main = csvData.map((item) => Object.values(item).toString());
  // Map finally returns array of arrays of values in each object

  const csv = [headers, ...main].join('\n');
  // Creates new array, where first row is keys and further rows the values in each object

  return csv;
};

const downloadFile = (csvData) => {
  const anchor = document.createElement('a');
  anchor.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvData);
  anchor.target = '_blank';
  anchor.download = `${document.title}`;
  anchor.click();
};

downloadFile(generateCSVData(scrapeData()));
