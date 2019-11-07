var fs = require('fs');

var files = fs.readdirSync('./imgs');

/*
// 修改文件名称
files.forEach((v, i) => {
    fs.renameSync('./imgs/' + v, './imgs/img' + i + '.jpg');
});
*/

// 生成html的img格式
var html = '';
files.forEach((v, i) => {
    html += `<img src="./assets/imgs/img${i}.jpg">\r`;
});
fs.writeFileSync('img.html', html);