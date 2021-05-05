import ProgressBar from "progress";
import https from "https";

var req = https.request({
    host: 'download.github.com',
    port: 443,
    path: '/visionmedia-node-jscoverage-0d4608a.zip'
});

req.on('response', function(res){
    var len = parseInt(res.headers['content-length'], 10);

    console.log();
    var bar = new ProgressBar('  downloading [:bar] :rate/bps :percent :etas', {
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