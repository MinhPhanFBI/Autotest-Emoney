import ExcelJS from 'exceljs';

const generateExcelReport = async (testResults) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Test Results');
    worksheet.addRow(['Selector','Action', 'Status']);
    testResults.forEach(({ selector , action ,status }) => {
        worksheet.addRow([selector, action ,status]);
    });

    const date = Date.now();
    await workbook.xlsx.writeFile(`TestResults - ${date}.xlsx`);
};

export default generateExcelReport;
