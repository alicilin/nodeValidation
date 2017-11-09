global.rootDir = __dirname;
const path = require('path');
const v = require(path.join(rootDir,'validator'));
const validator = new v();

validator.setLanguageDir(path.join(rootDir,'languages'));
validator.addRulesDir(path.join(rootDir,'rules'));
validator.setLanguage('tr');

let rules = {
    isim: {
        name: 'Telefon',
        rules: 'isPhone'
    }
};

let data = {
    isim: '+90 542 571 18 69'
};

let a = validator.validate(rules, data);
console.log(a);
console.log(typeof data.isim)