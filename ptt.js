const fs = require('fs');
const axios = require('axios');
const path = require("path");
const ProgressBar = require("progress");
(async () => {
    let Img = await JSON.parse(fs.readFileSync("Img.txt", "utf-8"));
    let Title = await JSON.parse(fs.readFileSync("Title.txt", "utf-8"));
    let Length = await JSON.parse(fs.readFileSync("Length.txt", "utf-8"));
    let files404 = new Map();
    let files;
    for (let i = 1; i < 78; i++) {
        for (let j = 0; j < Length[i]; j++) {
            let sign = j < 9 ? `0${j + 1}` : j + 1;
            let ImgUrl = path.dirname(Img[i]) + "/" + path.basename(Img[i]).match(/\d\d\w/)[0] + sign + ".jpg";
            if (j === 0) {
                if (!(fs.existsSync(`img/${Title[i]}`))) {
                    await fs.mkdirSync(`img/${Title[i]}`);
                } else {
                    console.log("文件夹已经存在");
                }
                files = await fs.readdirSync(`img/${Title[i]}`);//读取新创建文件夹下面的文件

                if (files.length>=2) {
                    files = files.sort((aa, bb) => {
                        aa = aa.match(/\d{1,3}(?=\.)/)[0];
                        bb = bb.match(/\d{1,3}(?=\.)/)[0];
                        return parseInt(aa) - parseInt(bb);
                    });//对文件夹下面的文件进行排序
                }

            }
            if (files[j] !== undefined && files[j] === `${j}.jpg`) {
                // console.log(`已经存在${j}.jpg`);
                continue;
            }
            await axios.get(ImgUrl, {
                responseType: "stream",
                headers: {
                    Referer: "https://www.mzitu.com/",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36 Edg/90.0.818.49"
                }
            })
                .then(async (response) => {
                    const len = parseInt(response.data.headers['content-length'], 10);
                    const bar = new ProgressBar(`[${i}]  ${Title[i]}/${j} [:bar] :rate/kbs :percent 剩余时间 :eta`, {
                        complete: '=',
                        incomplete: ' ',
                        width: 40,
                        total: len
                    });
                    response.data.on("data", chunk => {
                        bar.tick(chunk.length);
                    });
                    await new Promise(resolve => {
                        setTimeout(resolve, 600, response.data.pipe(fs.createWriteStream(`img/${Title[i]}/${j}.jpg`))
                        );
                    })
                }).catch(err => {
                    console.log("!!!!!!!!!!!!!!!!!!!!!!");
                    console.log(`img/${Title[i]}/${j}.jpg`);
                    console.log(`${err.config.url} `);
                    files404.set(`${err.config.url}`, `img/${Title[i]}/${j}.jpg`);
                    console.log("!!!!!!!!!!!!!!!!!!!!!!");

                })
        }
    }
    await console.log("\n" + files404 + "\n");

})()
