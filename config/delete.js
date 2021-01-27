const getText = require('../utils/getText');
const templateObj = require('../temp');

module.exports = [{
    type: 'input',
    name: 'templateName',
    message: 'The template which you want to delete: ',
    validate(val) {
        const value = val.replace(/\s+/g, '');
        if (value === '') {
            return getText('Template name is required!', 'error');
        } else if (!templateObj[value]) {
            return getText('Template is not existed!!', 'error');
        }
        return true;
    }
},
{
    type: 'confirm',
    name: 'deleted',
    message: 'Are you sure to delete it?',
}];
