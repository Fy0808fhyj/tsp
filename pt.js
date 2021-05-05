const fs=require("fs");
const axios=require("axios");
(async ()=> {
    let Length = JSON.parse(fs.readFileSync("Length.txt", "utf-8"));
    let Title = JSON.parse(fs.readFileSync("Title.txt", "utf-8"));
    let Img = JSON.parse(fs.readFileSync("Img.txt", "utf-8"));
    for (let i = 0; i < await Length.length; i++) {
        await fs.mkdirSync(`./img/${await Title[i]}`);
        for (let j = 0; j < Length[i]; j++) {
axios.get(`${await Img[0]}`)

        }

    }
})()
