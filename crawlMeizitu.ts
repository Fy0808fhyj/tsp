import puppeteer, {HTTPResponse, Page} from "puppeteer-core"
import axios from "axios";
import progressBar from "progress"
import fs from "fs";

(async () => {
    const data: string = await fs.readFileSync("launch.json", "utf-8");
    const browser: puppeteer.Browser = await puppeteer.launch(JSON.parse(data));
    let pageArray: Promise<Page>[] = [];
    let grabImg: Array<string[]> = [];
    let pageArray01: Page[];//解决期约后的page
    let Img: Array<string> = new Array<string>();
    let Title: Array<string> = new Array<string>();
    let Length: Array<number> = new Array<number>();
    for (let i = 0; i < 4; i++) {
        pageArray[i] = browser.newPage();
        (await pageArray[i]).goto(`https://www.mzitu.com/hot/page/${i + 1}/`);
    }
    pageArray01 = await Promise.all(pageArray);
    for (let i = 0; i < 4; i++) {
        grabImg[i] = await pageArray01[i].$$eval("#pins>li>a", (x: Element[]) =>
            x.map((y: Element) => (y as HTMLAnchorElement).href));
    }
    await console.log("---------------------")
    console.log(grabImg);
    for (let i = 0; i < 4; i++) {
        new Promise(async () => {
            for (const grabImgElement of grabImg[i]) {
                await pageArray01[i].goto(grabImgElement);
                let str: string = await pageArray01[i].$eval(("body > div.main > div.content > div.main-image > p > a > img"),
                    (x: Element): string => (x as HTMLImageElement).src);
                let tit: string = await pageArray01[i].$eval("head > title",
                    (x: Element) => (x as HTMLElement).innerText);
                let len: number = await pageArray01[i].$eval("body > div.main > div.content > div.pagenavi > a:nth-child(7) > span",
                    x => parseInt((x as HTMLElement).innerText))
                await Img.push(str);
                await Title.push(tit);
                await Length.push(len);
            }
        })
    }
    await console.log("-------------");
    // await fs.writeFileSync("Img.txt",JSON.stringify(Img),"utf-8");
    // await fs.writeFileSync("Title.txt",JSON.stringify(Title),"utf-8");
    // await fs.writeFileSync("Length.txt",JSON.stringify(Length),"utf-8");


})()