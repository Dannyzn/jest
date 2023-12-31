// const { read } = require('./sum')

// console.log(require.cache, '111');

require.cache['fs'] = {
    id: 'fs',
    filename: 'fs',
    exports: {
        readFileSync(filename) {
            return '{"version": "1.0.0"}';
        }
    }
}

const fs = require('fs')

console.log(fs.readFileSync('./package.json', 'utf8'))

console.log(require.cache, '111');
