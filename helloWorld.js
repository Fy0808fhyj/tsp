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
    const page = await browser.newPage();
    await page.goto("https://web.sanguosha.com/login/index.html");
    const inputT = await page.$$(".dobest_input");
    const checked = await page.$("input[id^='dobest_protocol_']");
    await inputT[0].type("fy1525569");
    await inputT[1].type("a4613532");
    await checked?.click();
    await inputT[1].press("Enter");
})();
