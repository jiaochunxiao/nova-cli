const getText = require('../utils/getText');
const templateObj = require('../temp');

const templateList = Object.keys(templateObj);

// 初始化配置
module.exports = [{
    type: 'input',
    name: 'projectName',
    message: 'Project name: ',
    validate(val) {
        if (val === '') {
            return getText('Project Name is required!', 'error');
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
    message: 'Author: ',
},
{
    type: 'list',
    name: 'template',
    message: 'Select one template: ',
    choices: templateList,
    pageSize: 5,
}];
