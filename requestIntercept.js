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
    const page = await (await browser.pages())[0];
    await page.setRequestInterception(true);
    page.on("request", request => {
        if (request.resourceType() === "image") {
            request.abort();
            console.log(request.url());
            ;
        }
        else if (request.resourceType() !== "document") {
            request.abort();
            // console.log( request.url());
        }
        else {
            request.continue();
        }
    });
    page.on("response", response => {
        console.log(response);
    });
    await page.goto("https://pic.netbian.com/4kdongman/");
})();
