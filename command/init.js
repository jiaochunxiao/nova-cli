const inquirer = require('inquirer');
const fs = require('fs');
const symbols = require('log-symbols');
const chalk = require('chalk');
const ora = require('ora');
const download = require('download-git-repo');
const handlebars = require('handlebars');

const template = require('../lib/getTemplist');
const {templateList, templateObj} = template;
console.log(templateList);


// questions config
const prompt = [{
    type: 'input',
    name: 'projectName',
    message: 'Project name: ',
    validate(val) {
        if (val === '') {
            return 'Project Name is required!';
        }
        return true;
    }
},
{
    type: 'input',
    name: 'description',
    message: 'Project description: ',
},
{
    type: 'input',
    name: 'author',
    message: 'author: ',
},
{
    type: 'list',
    name: 'template',
    choices: templateList,
}];


module.exports = () => {
    inquirer.prompt(prompt).then(answers => {
        const { description, author, template, projectName } = answers;
        console.log(answers);
        if(fs.existsSync(projectName)) {
            console.log(symbols.error, chalk.red('The project already exists!'));
            process.exit(1);
        }
        const spinner = ora('downloading template...');
        const gitRepo = `direct:https://github.com/${templateObj[template]}#master`;
        console.log('git url ', gitRepo);
        spinner.start();
        download(gitRepo, projectName, {
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
                projectName,
                description,
                author,
            };
            const fileName = `${projectName}/package.json`;
            const content = fs.readFileSync(fileName).toString();
            console.log('content: ', content);
            const result = handlebars.compile(content)(packageMeta);
            console.log(result);
            fs.writeFileSync(fileName, result);
            spinner.succeed();
        });
    });
}