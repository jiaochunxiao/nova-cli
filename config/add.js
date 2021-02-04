const getText = require('../utils/getText')
const templateObj = require('../temp')

module.exports = [{
  type: 'input',
  name: 'templateName',
  message: 'Template Name: ',
  validate (val) {
    const value = val.replace(/\s+/g, '')
    if (value === '') {
      return getText('Template name is required!', 'error')
    } else if (templateObj[value]) {
      return getText('Template has already existed!!', 'error')
    }
    return true
  }
},
{
  type: 'input',
  name: 'repository',
  message: 'Repository name: [git account name]/[git repository name], such as "jiaochunxiao/nova-cli": ',
  validate (val) {
    const value = val.replace(/\s+/g, '')
    const length = value.split('/').length
    if (value === '') {
      return getText('Repository Owner is required!', 'error')
    } else if (length !== 2) {
      return getText('Please input a correct reposity such as "jiaochunxiao/nova-cli"', 'error')
    }
    return true
  }
},
{
  type: 'confirm',
  name: 'isPublic',
  message: 'Is this repository is public?'
}]
