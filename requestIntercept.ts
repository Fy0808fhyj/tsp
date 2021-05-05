import puppeteer, {Page} from "puppeteer-core";
import fs from "fs";

(async () => {
    const data: string = await fs.readFileSync("launch.json", "utf-8");
    const browser: puppeteer.Browser = await puppeteer.launch(JSON.parse(data));
    const page: Page = await (await browser.pages())[0];
    await page.setRequestInterception(true);
    page.on("request", request=>{
        if (request.resourceType()==="image"){
            request.abort();
            console.log(request.url());;
        }
        else if(request.resourceType()!=="document"){
            request.abort();
            // console.log( request.url());
        }else {
            request.continue();
        }
    })
    page.on("response",response=>{
        console.log(response);
    })
    await page.goto("https://pic.netbian.com/4kdongman/");
})()