"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
(async () => {
    const browse = await puppeteer_core_1.default.connect({
        browserWSEndpoint: "ws://localhost:9222/devtools/browser/8cfb2d5e-71c8-438a-89c2-fd29d79058cc"
    });
    const page = await browse.newPage();
    await page.goto("https://www.baidu.com");
})();
