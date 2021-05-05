"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const progress_1 = __importDefault(require("progress"));
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
axios_1.default.get("https://imgpc.iimzt.com/2020/03/13a01.jpg", {
    responseType: "stream",
    headers: {
        "Referer": "https://www.mzitu.com/",
        // "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36 Edg/90.0.818.49"
    }
}).then(response => {
    const len = parseInt(response.data.headers['content-length'], 10);
    const bar = new progress_1.default('  downloading [:bar] :rate/kbs :percent 剩余时间 :eta', {
        complete: '=',
        incomplete: ' ',
        width: 40,
        total: len
    });
    response.data.on("data", (chunk) => {
        bar.tick(chunk.length);
        // console.log(typeof chunk);
    });
    response.data.pipe(fs_1.default.createWriteStream("aaa1.jpg"));
});
