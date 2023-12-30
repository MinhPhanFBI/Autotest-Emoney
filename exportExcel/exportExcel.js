const ExcelJS = require('exceljs');

async function generateExcelReport(testResults) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Test Results');
    worksheet.addRow(['Selector', 'Status']);
    testResults.forEach(result => {
        worksheet.addRow([result.selector, result.status]);
    });
    let date = Date.now()
    await workbook.xlsx.writeFile(`TestResults${date}.xlsx`);
}
module.exports = generateExcelReport

