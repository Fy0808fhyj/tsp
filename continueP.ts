import puppeteer,
{Browser, Page} from "puppeteer-core";
import fs from "fs";
(async ()=>{
    const browse: Browser= await puppeteer.connect({
        browserWSEndpoint: "ws://localhost:9222/devtools/browser/8cfb2d5e-71c8-438a-89c2-fd29d79058cc"
    });
    const page: Page = await browse.newPage();
    await page.goto("https://www.baidu.com");


})()
