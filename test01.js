"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
(async () => {
    const data = await fs_1.default.readFileSync("launch.json", "utf-8");
    const browser = await puppeteer_core_1.default.launch(JSON.parse(data));
    let pageC = [];
    let pageArray;
    let pageArrayED;
    let finish = [];
    for (let i = 0; i < 3; i++) {
        pageC[i] = browser.newPage();
    }
    await Promise.all(pageC);
    pageArray = browser.pages();
    pageArrayED = await pageArray;
    for (const page of pageArrayED) {
        await page.setRequestInterception(true);
        page.on("request", request => {
            if (request.resourceType() !== "document") {
                request.abort();
            }
            else {
                request.continue();
            }
        });
    }
    console.log(pageArrayED.length);
    for (let i = 0; i < 4; i++) {
        finish[i] = new Promise(async (resolve) => {
            for (let j = 0; j < 10; j++) {
                await pageArrayED[i].goto(`https://www.baidu.com/s?wd=${j}`);
                if (j == 9) {
                    resolve(`第${i + 1}个页面`);
                }
            }
        });
    }
    await console.log("------");
    Promise.race(finish).then(x => console.log("最先加载完毕的页面为" + x));
    Promise.all(finish).then(() => {
        browser.close();
    });
})();
