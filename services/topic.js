const mongoose = require('../config/mongoose');
const Anti = require('../spiders/anti');
const topicService = require('./topic.service');
const { timeout } = require('./util');

// 命令行读取用户名密码
const processArgs = process.argv.splice(2);
const user = processArgs[0];
const pwd = processArgs[1];
const host = processArgs[2];

async function init() {
  // 1. 初始化数据库链接
  mongoose({ user, pwd, host });
  // 2. 初始化Puppeteer，用户获取antiId
  await Anti.init();
  // 3. 抓取feed相关联的topic数据
  for (const index of Array.from({ length: 500 })) {
    console.log(`[Topic] ${index} start`);
    await topicService.setFeedRelatedTopicInfo();
    await timeout(10000);
  }
  console.log('All success~');
}

init();