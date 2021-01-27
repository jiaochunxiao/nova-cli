#!/usr/bin/env node
const program = require('commander');

const init = require('../command/init');
const add = require('../command/add');
const list = require('../command/list');
const del = require('../command/delete');

let version  = require('../config/version');
const packageJson = require('../package.json');
version += `\n${packageJson.version}\n`;

// TODO 检测本地与npm包上的版本号，提示用户升级
program
    .version(version)
    .usage('<command> [options]')
    .option('-i, --info', 'output some info of the tools');

// 初始化项目
program
    .command('init')
    .alias('i')
    .description('create a new project from some template projects')
    .action(init);

// 添加模板
program
    .command('add')
    .alias('a')
    .description('add a template to local template list')
    .action(add);

program
    .command('list')
    .alias('l')
    .description('show local template list')
    .action(list);

program
    .command('delete')
    .alias('d')
    .description('delete template from local storage')
    .action(del);

program.parse(process.argv);

if (program.info) {
    console.log('Nova-cli is an easy and useful tool for generating a project quickly!');
}
