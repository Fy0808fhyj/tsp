const fs=require("fs")
const path=require("path")
let Img = JSON.parse(fs.readFileSync("Img.txt", "utf-8"));
console.log(Img.length);
console.log(path.dirname(Img[10]));
console.log(path.basename(Img[10]));
console.log(path.basename(Img[10]).match(/\d\d\w/)[0])
let ImgUrl=path.dirname(Img[1])+"/"+path.basename(Img[1]).match(/\d\d\w/)+".jpg";
console.log(ImgUrl);
fs.access("13a01",err => {
    if (err){
        console.log(err);
        fs.mkdirSync(path.basename(Img[0],".jpg"));
    }else {
        console.log("文件夹已经存在");
    }
})

