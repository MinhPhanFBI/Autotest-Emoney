const emoneyTransFlowTest = async (driver) => {
    const iconTrans = await driver.$("(//android.widget.TextView[@text=\"Giao dịch\"])[1]")
    await iconTrans.click()
    const el1 = await driver.$("id:com.viettel.vtt.vn.emoneycustomer.dev:id/layoutTransferEmoney");
    await el1.click();
    const el2 = await driver.$("xpath://androidx.recyclerview.widget.RecyclerView[@resource-id=\"com.viettel.vtt.vn.emoneycustomer.dev:id/recyclerViewLayout\"]/android.widget.LinearLayout[3]/android.widget.LinearLayout");
    await el2.click();
    const el3 = await driver.$(`class name:android.widget.Button`);
    await el3.click();
    let pin = [0,1,0,1,0,1]
    for (i in pin) {
        const tx1 = await driver.$(`xpath://android.widget.TextView[@text=\"${i}\"]`);
        await tx1.click(); 
    } 
}
module.exports = emoneyTransFlowTest

