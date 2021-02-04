const templateObj = require('../temp')
const getTable = require('../utils/getTable')
const getText = require('../utils/getText')

module.exports = () => {
  console.log(getText('Local template list is shown below.\n', 'info'))
  console.log(getTable(templateObj))
}
