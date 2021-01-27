const inquirer = require('inquirer');
const fs = require('fs');
const chalk = require('chalk');

const getText = require('../utils/getText');
const table = require('../utils/getTable');

const prompt = require('../config/add');
const templateObj = require('../temp');


module.exports = () => {
    inquirer
        .prompt(prompt)
        .then(answers => {
            const {templateName, repository, public} = answers;
            templateObj[templateName] = {
                repository,
                public,
            };
            // 将模板写入temp.json
            fs.writeFile(`${__dirname}/../temp.json`, JSON.stringify(templateObj), 'utf-8', err => {
                if (err) {
                    console.log(chalk.red(err))
                }
                // 显示列表
                console.log(getText('Template has been added successfully! \n', 'success'));
                console.log(table(templateObj));
                console.log('\n');
            });
        });
}
