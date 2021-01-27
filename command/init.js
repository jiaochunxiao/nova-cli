const inquirer = require('inquirer');
const fs = require('fs');
const symbols = require('log-symbols');
const chalk = require('chalk');
const ora = require('ora');
const download = require('download-git-repo');
const handlebars = require('handlebars');
const getText = require('../utils/getText');

const prompt = require('../config/init');
const templateObj = require('../temp');

module.exports = () => {
    inquirer
        .prompt(prompt)
        .then(answers => {
            console.log(answers);
            const { description, author, template, projectName } = answers;
            if(fs.existsSync(projectName)) {
                console.log(symbols.error, chalk.red('The project already exists!'));
                process.exit(1);
            }
            const spinner = ora('downloading template...');
            // 是否需要做成对内/对外各一个版本，目前是内外在同一版本上
            // 判断公司内部还是外部框架
            const {repository, public} = templateObj[template];
            let gitUrl = public ? 'direct:https://github.com/' : 'direct:http://git.baijia.com/';
            // TODO http download
            // direct: https://github.com/${templateObj[template]}/repository/archive.zip
            const gitRepo = `${gitUrl}/${repository}#master`;
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
                const result = handlebars.compile(content)(packageMeta);
                fs.writeFileSync(fileName, result);
                spinner.succeed();
                console.log(getText('Project initialization is complete!', 'success'));
            });
        });
}