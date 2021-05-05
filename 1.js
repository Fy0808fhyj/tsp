const fs =require("fs")

for (let i=0;i<10;i++) {
    if (!(fs.existsSync(`test/${i}`))) {
         fs.mkdir(`test/${i}`, err1 => {
            if (err1) throw err1
        });
    } else {
        console.log("文件夹已经存在");
    }
}