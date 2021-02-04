const symbols = require('log-symbols')
const chalk = require('chalk')

const COLOR_CONFIG = {
  success: 'green',
  error: 'red',
  info: 'blue',
  waring: 'yellow'
}

/**
 *
 * @param string text 文本
 * @param string type 输出类型
 */
module.exports = (text, type) => {
  return `${symbols[type]} ${chalk[COLOR_CONFIG[type]](text)}`
}
