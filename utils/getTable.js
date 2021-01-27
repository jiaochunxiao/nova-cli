const Table = require('cli-table');

module.exports = data => {
    const headers = ['templateName', 'repository', 'isPublic'];
    const table = new Table({
        head: headers,
    });
    Object.keys(data).map(key => {
        const {repository, public} = data[key];
        table.push([key, repository, public]);
    });
    return table.toString();
}