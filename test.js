"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
console.time("1");
(async () => {
    const browser = await puppeteer_core_1.default.launch({
        executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
        headless: false,
        slowMo: 0,
        defaultViewport: {
            width: 1280,
            height: 720
        }
    });
    const page = await browser.newPage();
    await page.goto("https://www.douban.com/doulist/45004834/");
    for (let i = 0; i < 4; i++) {
        await page.waitForSelector("div > div.bd.doulist-subject");
        let textElement = await page.$$eval("div > div.bd.doulist-subject", (x) => x.map((y) => y.innerText + "\n-------------------------"));
        let pageDown = await page.$(".thispage+a");
        console.log(textElement[0]);
        fs_1.default.writeFile("1.txt", textElement.toString(), { flag: "a" }, (async (err) => {
            if (err)
                throw err;
        }));
        if (pageDown != null)
            await pageDown.click();
        else {
            await browser.close();
            console.timeEnd("1");
        }
    }
})();
