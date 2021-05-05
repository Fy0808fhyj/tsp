import {ElementHandle} from 'puppeteer-core'
import fs from "fs"
import puppeteer from "puppeteer-core";
console.time("1");
(async () => {
    const browser:puppeteer.Browser = await puppeteer.launch({
        executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
        headless: false,
        slowMo: 0,
        defaultViewport: {
            width: 1280,
            height: 720
        }
    });
    const page: puppeteer.Page = await browser.newPage();
    await page.goto("https://www.douban.com/doulist/45004834/");
    for (let i = 0; i < 4; i++) {
        await page.waitForSelector("div > div.bd.doulist-subject");
        let textElement: string[] = await page.$$eval("div > div.bd.doulist-subject",
            (x) =>
                x.map((y) => (y as HTMLElement).innerText + "\n-------------------------")
        );
        let pageDown: ElementHandle | null = await page.$(".thispage+a");
        console.log(textElement[0]);
        fs.writeFile("1.txt", textElement.toString(), {flag: "a"}, (async err => {
            if (err) throw err;
        }));
        if (pageDown != null) await pageDown.click();
        else {
            await browser.close();
            console.timeEnd("1");
        }
    }
})()