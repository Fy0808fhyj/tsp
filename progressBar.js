"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const progress_stream_1 = __importDefault(require("progress-stream"));
const path_1 = __importDefault(require("path"));
const node_fetch_1 = __importDefault(require("node-fetch"));
//下载 的文件 地址
let fileURL = "https://nodejs.org/dist/v12.18.3/node-v12.18.3-x64.msi";
//下载保存的文件路径
let fileSavePath = path_1.default.join(__dirname, path_1.default.basename(fileURL));
//缓存文件路径
let tmpFileSavePath = fileSavePath + ".tmp";
//创建写入流
const fileStream = fs_1.default.createWriteStream(tmpFileSavePath).on('error', function (e) {
    console.error('error==>', e);
}).on('ready', function () {
    console.log("开始下载:", fileURL);
}).on('finish', function () {
    //下载完成后重命名文件
    fs_1.default.renameSync(tmpFileSavePath, fileSavePath);
    console.log('文件下载完成:', fileSavePath);
});
//请求文件
node_fetch_1.default(fileURL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/octet-stream' },
    // timeout: 100,
}).then(res => {
    //获取请求头中的文件大小数据
    let fsize = res.headers.get("content-length");
    //创建进度
    let str = progress_stream_1.default({
        length: fsize,
        time: 100 /* ms */
    });
    // 下载进度
    str.on('progress', function (progressData) {
        //不换行输出
        let percentage = Math.round(progressData.percentage) + '%';
        console.log(percentage);
        // process.stdout.write('\033[2J'+);
        // console.log(progress);
        /*
        {
            percentage: 9.05,
            transferred: 949624,
            length: 10485760,
            remaining: 9536136,
            eta: 42,
            runtime: 3,
            delta: 295396,
            speed: 949624
        }
        */
    });
    res.body.pipe(str).pipe(fileStream);
}).catch(e => {
    //自定义异常处理
    console.log(e);
});
