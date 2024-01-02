import ExcelJS from 'exceljs';

const readExcel = async (filePath) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const sheet1 = workbook.getWorksheet(1);
    let arrElm = [];
    for (let rowNumber = 2; rowNumber <= sheet1.rowCount; rowNumber++) {
        const elementSelector = sheet1.getCell(rowNumber, 2).text;
        const actionSelector = sheet1.getCell(rowNumber,1).text;
        const newObj = {
            action : actionSelector,
            element : elementSelector
        }
        arrElm.push(newObj)
    }
    return arrElm;
}

export default readExcel;
