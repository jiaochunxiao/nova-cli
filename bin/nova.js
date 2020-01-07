#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs');
const program = require('commander');
const symbols = require('log-symbols');
const chalk = require('chalk');
const ora = require('ora');
const download = require('download-git-repo');
const handlebars = require('handlebars');

// questions config
const prompt = [];

prompt.push({
    type: 'input',
    name: 'description',
    message: 'project description:'
});

prompt.push({
    type: 'input',
    name: 'author',
    message: 'author:'
});

prompt.push({
    type: 'rawlist',
    name: 'template',
    choices: [
        'vue-admin-typescript',
        'react-admin-typescript',
    ],
});

let version  = require('../src/version');
const packageJson = require('../package.json');
version += `\n${packageJson.version}\n`;

program
    .version(version)
    .option('-i, --info', 'output some info of the tools');

program
    .command('init <app-name>')
    .description('create a new project from some template projects')
    .action(name => {
        if(fs.existsSync(name)) {
            console.log(symbols.error, chalk.red('The project already exists!'));
            process.exit(1);
        }
        inquirer.prompt(prompt).then(answers => {
            const { description, author, template } = answers;
            const spinner = ora('downloading template...');
            const gitRepo = `direct:https://github.com/jiaochunxiao/${template}-template#master`;
            spinner.start();
            download(gitRepo, name, {
                clone: true,
            }, err => {
                if (err) {
                    console.log(err);
                    spinner.fail();
                    console.error(symbols.error,
                        chalk.red(`${err} download template failed, please check your network connection and try again!`)
                    );
                    process.exit(1);
                }
                const packageMeta = {
                    name,
                    description,
                    author,
                };
                const fileName = `${name}/package.json`;
                const content = fs.readFileSync(fileName).toString();
                const result = handlebars.compile(content)(packageMeta);
                fs.writeFileSync(fileName, result);
                spinner.succeed();
            });
        });
    });

program.parse(process.argv);

if (program.info) {
    console.log('Nova-cli is an easy and useful tool for generating a project quickly!');
}