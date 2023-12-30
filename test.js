const { remote } = require('webdriverio');
const readExcel = require('./inputtestcase/handleTestCase');
const generateExcelReport = require('./exportExcel/exportExcel')

function getSelectorType(selector) {
    if (selector.startsWith('//') || 
        selector.startsWith('xpath://') ||
        selector.startsWith('(')
        ) {
        return 'xpath';
    } else if (selector.startsWith('class')) {
        return 'class name';
    } else if (selector.startsWith('id=')) {
        return 'id';
    } else if (selector.startsWith('css=')) {
        return 'css selector';
    } else if (selector.startsWith('com.viettel.vtt.vn.emoneycustomer.dev:id/')) {
        return 'id';
    } else {
        return 'unknown';
    }
}



async function runTest() {
    const driver = await remote({
        hostname: process.env.APPIUM_HOST || 'localhost',
        port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
        logLevel: 'info',
        capabilities: {
            platformName: 'android',
            'appium:deviceName': 'emulator-5554',
            'appium:automationName': 'uiautomator2',
            'appium:appPackage': 'com.viettel.vtt.vn.emoneycustomer.dev',
            'appium:appActivity': 'com.viettel.vtt.vn.emoneycustomer.feature.verify.VerifyActivity',
            'appium:noReset': true
        }
    });


    const testResults = [];

    try {
        const arr = await readExcel('./TransactionFlow.xlsx');
        for (const selector of arr) {
            const result = { selector, status: 'failed' };

            try {
                const parsedValue = JSON.parse(`"${selector}"`);
                const selectorType = getSelectorType(parsedValue);

                switch (selectorType) {
                    case 'xpath':
                        await driver.$(`${parsedValue}`).click();
                        result.status = 'success';
                        break;
                    case 'class name':
                        await driver.$(`${parsedValue}`).click();
                        result.status = 'success';
                        break;
                    case 'id':
                        await driver.$(`id:${parsedValue}`).click();
                        result.status = 'success';
                        break;
                    case 'css selector':
                        await driver.$(`${parsedValue}`).click();
                        result.status = 'success';
                        break;
                    default:
                        await driver.$(`${parsedValue}`).click();
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

    console.log("Test Results:", testResults);
    await generateExcelReport(testResults)
}

runTest().catch(console.error);

