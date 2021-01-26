#!/usr/bin/env node
const program = require('commander');

const init = require('../command/init');

let version  = require('../src/version');
const packageJson = require('../package.json');
version += `\n${packageJson.version}\n`;

program
    .version(version)
    .usage('<command> [options]')
    .option('-i, --info', 'output some info of the tools');

program
    .command('init')
    .alias('i')
    .description('create a new project from some template projects')
    .action(init)

program.parse(process.argv);

if (program.info) {
    console.log('Nova-cli is an easy and useful tool for generating a project quickly!');
}