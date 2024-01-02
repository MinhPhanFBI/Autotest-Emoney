import {remote} from 'webdriverio'
import {getSelectorType, readExcel, generateExcelReport, handleAction} from './src/Utils/index.js';
import { BASE_CAPABILITIES } from './src/Constants/index.js';


const runTest = async () => {
    const driver = await remote({
        hostname: process.env.APPIUM_HOST || 'localhost',
        port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
        logLevel: 'info',
        capabilities: BASE_CAPABILITIES
    });

    const testResults = [];

    try {
        const arr = await readExcel('./eMoneyTest_4.xlsx');
        for (const selector of arr) {
            const result = { selector : selector.element, action : selector.action , status: 'failed' };
            try {
                const parsedValue = JSON.parse(`"${selector.element}"`);
                const selectorType = getSelectorType(parsedValue);
                console.log(`ACTION [${selector.action}] ELEMENT [${parsedValue}]  TYPE [${selectorType}]`)
                switch (selectorType) {
                    case 'xpath':
                        await handleAction(driver,`${parsedValue}`, selector.action)
                        result.status = 'success';
                        break;
                    case 'class name':
                        await handleAction(driver,`${parsedValue}`, selector.action)
                        result.status = 'success';
                        break;
                    case 'id':
                        await handleAction(driver,`id:${parsedValue}`, selector.action)
                        result.status = 'success';
                        break;
                    case 'css selector':
                        await handleAction(driver,`${parsedValue}`, selector.action)
                        result.status = 'success';
                        break;
                    default:
                        await handleAction(driver,`${parsedValue}`, selector.action)
                        result.status = 'success';
                        break;
                }
            } catch (error) {
                console.log("FAILED TEST ERROR:", error);
            } finally {
                testResults.push(result);
            }
        }
    } finally {
        await driver.pause(1000);
        await driver.deleteSession();
    }
    await generateExcelReport(testResults);
};

runTest().catch(console.error);
