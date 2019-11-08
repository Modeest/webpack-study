const fs = require('fs');
const OSS = require('ali-oss');

// 实例化OSS配置地址：https://help.aliyun.com/document_detail/64097.html?spm=a2c4g.11186623.2.21.5ab510d51h3mk2
const store = OSS({
    region: 'oss-cn-hangzhou',
    accessKeyId: 'LTAI4FgBWCDmqN6qK1suq9sY',
    accessKeySecret: 'T4bcmbBgr3pi5d2eEhNLD2Pv0DIBnR',
    bucket: 'd2-h5-dongyin-activities',
    endpoint: 'd2-activity.dongyin.net',    // oss域名
    cname: true
});

/**
 * 文档地址：https://github.com/ali-sdk/ali-oss
 * .listBuckets(query[, options])：列出所有的buckets
 * .putBucket(name[, options])：新增bucket
 * .deleteBucket(name[, options])：删除bucket
 * .useBucket(name)：使用某个bucket
 * .getBucketInfo(name)：获取指定bucket的信息
 * .getBucketLocation(name)：获取指定bucket的位置
 *
 * .putBucketWebsite(name, config[, options])：Set the bucket as a static website.
 * .getBucketWebsite(name[, options])：Get the bucket website config.
 */

/**
 * [ { name: 'jiaqitong',
    region: 'oss-cn-beijing',
    creationDate: '2018-12-16T08:29:21.000Z',
    StorageClass: 'Standard'
 * },
 */
/*
store.listBuckets().then(res => {
    console.log('listBuckets:', res.buckets);
})
*/

/*
store.getBucketWebsite('d2-h5-dongyin-activities').then(res => {
    console.log('getBucketWebsite:', res);
})
*/
/*
store.getBucketWebsite('jiaqitong').then(res => {
    console.log('getBucketWebsite:', res);
})
*/

// store.put('index.js', './config/util.js').then(res => {
//     console.log('put:', res);
// });
function upload (dir) {
    // 1. 读取需要上传的文件目录
    const files = fs.readdirSync(dir);

    // 2. 将文件一一上传
    files.forEach(async v => {
        await store.put(v, dir + v);
    })
}

upload('./config/img/');

// https://github.com/tj/commander.js
// https://github.com/ali-sdk/ali-oss