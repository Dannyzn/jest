const fs = require('fs');
const vm = require('vm');

const context = {
    console,
    zhao: 111,
    ning: 222
}

vm.createContext(context);

vm.runInContext(' console.log(zhao + ning)', context);

function sum(a, b) {
  return a + b;
}

function read() {
    const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    return pkg.version === '1.0.0' ? 'v1' : 'v2';
}

function some(callback) {
   callback(1);
   callback(2);
}

function minuns(a, b) {
    return a + b;
}

console.log(require.cache, '111');

module.exports = {
    sum,
    read,
    some,
};