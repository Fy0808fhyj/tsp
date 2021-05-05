import fs from "fs"
import puppeteer, {ElementHandle} from "puppeteer-core"
(async ()=>{
const data:string=await fs.readFileSync("launch.json","utf-8");
const browser:puppeteer.Browser=await puppeteer.launch(JSON.parse(data));
const page:puppeteer.Page=await browser.newPage();
await page.goto("https://web.sanguosha.com/login/index.html");
const inputT:Array<ElementHandle>=await page.$$(".dobest_input");
const checked: ElementHandle | null =await page.$("input[id^='dobest_protocol_']");
 await inputT[0].type("fy1525569");
 await inputT[1].type("a4613532");
 await checked?.click();
 await inputT[1].press("Enter");


})()