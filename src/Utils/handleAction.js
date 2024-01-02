const handleAction = async (driver, element, actionType) => {
    const action = actionType.toLowerCase()
    switch (action) {
        case 'click':
            await driver.$(element).click()
            break;
        case 'tap' :
            await new Promise(resolve => setTimeout(resolve, 500));
            await driver.touchAction(getValueXYFromElement(element));
            break;
        default:
            await driver.$(element).click()
            break;
    }
}

const getValueXYFromElement = (element) => {
    const xpart = String(element).split(',')
    const xValue = xpart[0].split('x:')[1].trim()
    const yValue = xpart[1].split('y:')[1].trim()
    return {
        action : 'tap',
        x: Number(xValue),
        y: Number(yValue)
    }
}

export default handleAction;