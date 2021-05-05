"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const progress_1 = __importDefault(require("progress"));
const https_1 = __importDefault(require("https"));
var req = https_1.default.request({
    host: 'download.github.com',
    port: 443,
    path: '/visionmedia-node-jscoverage-0d4608a.zip'
});
req.on('response', function (res) {
    var len = parseInt(res.headers['content-length'], 10);
    console.log();
    var bar = new progress_1.default('  downloading [:bar] :rate/bps :percent :etas', {
        complete: '=',
        incomplete: ' ',
        width: 40,
        total: len
    });
    res.on('data', function (chunk) {
        bar.tick(chunk.length);
    });
    res.on('end', function () {
        console.log('\n');
    });
});
req.end();
