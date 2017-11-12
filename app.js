'use strict';
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
        rules: 'minLength:10'
    }
};

let data = {
    isim: 'ali'
};

let a = validator.validate(rules, data);
console.log(a);