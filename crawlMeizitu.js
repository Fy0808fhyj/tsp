"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const fs_1 = __importDefault(require("fs"));
(async () => {
    const data = await fs_1.default.readFileSync("launch.json", "utf-8");
    const browser = await puppeteer_core_1.default.launch(JSON.parse(data));
    let pageArray = [];
    let grabImg = [];
    let pageArray01; //解决期约后的page
    let Img = new Array();
    let Title = new Array();
    let Length = new Array();
    for (let i = 0; i < 4; i++) {
        pageArray[i] = browser.newPage();
        (await pageArray[i]).goto(`https://www.mzitu.com/hot/page/${i + 1}/`);
    }
    pageArray01 = await Promise.all(pageArray);
    for (let i = 0; i < 4; i++) {
        grabImg[i] = await pageArray01[i].$$eval("#pins>li>a", (x) => x.map((y) => y.href));
    }
    await console.log("---------------------");
    console.log(grabImg);
    for (let i = 0; i < 4; i++) {
        new Promise(async () => {
            for (const grabImgElement of grabImg[i]) {
                await pageArray01[i].goto(grabImgElement);
                let str = await pageArray01[i].$eval(("body > div.main > div.content > div.main-image > p > a > img"), (x) => x.src);
                let tit = await pageArray01[i].$eval("head > title", (x) => x.innerText);
                let len = await pageArray01[i].$eval("body > div.main > div.content > div.pagenavi > a:nth-child(7) > span", x => parseInt(x.innerText));
                await Img.push(str);
                await Title.push(tit);
                await Length.push(len);
            }
        });
    }
    await console.log("-------------");
    // await fs.writeFileSync("Img.txt",JSON.stringify(Img),"utf-8");
    // await fs.writeFileSync("Title.txt",JSON.stringify(Title),"utf-8");
    // await fs.writeFileSync("Length.txt",JSON.stringify(Length),"utf-8");
})();
