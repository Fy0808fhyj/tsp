import fs from "fs";
import puppeteer, {Page} from "puppeteer-core";

(async () => {
    const data: string = await fs.readFileSync("launch.json", "utf-8");
    const browser: puppeteer.Browser = await puppeteer.launch(JSON.parse(data));
    let pageC: Promise<Page>[] = [];
    let pageArray: Promise<Page[]>;
    let pageArrayED: Page[]
    let finish:Promise<string>[]=[];
    for (let i = 0; i < 3; i++) {
        pageC[i] = browser.newPage();
    }
    await Promise.all(pageC)
    pageArray = browser.pages();
    pageArrayED = await pageArray
    for (const page of pageArrayED) {
        await page.setRequestInterception(true);
        page.on("request",request=>{
            if (request.resourceType()!=="document"){
                request.abort();
            }else {
                request.continue();
            }
        })
    }
    console.log(pageArrayED.length);
    for (let i = 0; i < 4; i++) {
    finish[i]=new Promise(async (resolve) => {
        for (let j = 0; j < 10; j++) {
            await pageArrayED[i].goto(`https://www.baidu.com/s?wd=${j}`);
            if (j==9) {
                resolve(`第${i+1}个页面`);
            }
        }
    })
    }
    await console.log("------");
    Promise.race(finish).then(x=>console.log("最先加载完毕的页面为"+x));
    Promise.all(finish).then(()=>{
        browser.close();
    })
})()