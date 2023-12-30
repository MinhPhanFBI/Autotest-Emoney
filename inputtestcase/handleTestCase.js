const ExcelJS = require('exceljs');

async function readExcel(filePath) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const sheet1 = workbook.getWorksheet(1);
    let arrElm = [];
    for (let rowNumber = 2; rowNumber <= sheet1.rowCount; rowNumber++) {
        const elementSelector = sheet1.getCell(rowNumber, 2).text;
        arrElm.push(elementSelector);
    }
    return arrElm;
}

module.exports = readExcel;
