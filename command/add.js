const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk')

const getText = require('../utils/getText')
const table = require('../utils/getTable')

const prompt = require('../config/add')
const templateObj = require('../temp')

module.exports = () => {
  inquirer
    .prompt(prompt)
    .then(answers => {
      const { templateName, repository, isPublic } = answers
      templateObj[templateName] = {
        repository,
        isPublic
      }
      // 将模板写入temp.json
      fs.writeFile(path.join(__dirname, '../temp.json'), JSON.stringify(templateObj), 'utf-8', err => {
        if (err) {
          console.log(chalk.red(err))
        }
        // 显示列表
        console.log(getText('Template has been added successfully! \n', 'success'))
        console.log(table(templateObj))
        console.log('\n')
      })
    })
}
