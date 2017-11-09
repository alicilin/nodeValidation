const path = require('path');
const fs = require('fs');

function validator(){
    this.language = 'tr';
    
    this.setLanguage = function(lang){
        if(typeof this.languages[lang] === 'undefined'){
            throw new Error(lang + ' dili sistemde kayıtlı değil');
        }
        this.language = lang;
    };

};

validator.prototype.languages = {};
validator.prototype.rules = {};

validator.prototype.setLanguageDir = function(dir){
    if(!fs.existsSync(dir)){
        throw new Error(dir + ' okunabilir bir dizin değil');
    }
    let that = this;
    let files = fs.readdirSync(dir);
    files.forEach(function(value){
        let [fileName,extension] = value.split('.');
        if(extension === 'js' || extension === 'JS'){
           let r = require(path.join(dir,fileName));
           if(typeof r === 'object'){
               that.languages[fileName] = r;
           }
        }
    });
};

validator.prototype.addRulesDir = function(dir){
    if(!fs.existsSync(dir)){
        throw new Error(dir + ' okunabilir bir dizin değil');
    }
    let that = this;
    let files = fs.readdirSync(dir);
    files.forEach(function(value){
        let [fileName,extension] = value.split('.');
        if(extension === 'js' || extension === 'JS'){
            require(path.join(dir,fileName))(that);
        }
    });
};

validator.prototype.parseRules = function(rules){
    let result = [];
    rules = rules.trim();
    let rulesArr = rules.split('|');
    rulesArr.forEach(function(rule){
        let params = rule.split(':');
        let ruleName = params[0];
        result.push({ruleName: ruleName, params: params.slice(1,params.lenght)});
    });
    return result;
};

validator.prototype.addRule = function(ruleName, callback){
    if(typeof callback !== 'function'){
        throw new Error('callback bir fonksiyon olmalıdır !');
    }
    this.rules[ruleName] = callback;
};

validator.prototype.validate = function(rules, data){
    let that = this;
    let result = {};
    result.success = true;
    result.messages = [];
    let ext = {};
    
    outloop1:
    for(let key in data){
        if(typeof rules[key] !== 'undefined'){
            let parsedRules = that.parseRules(rules[key]['rules']);
            outloop2:
            for(let parsedRule of parsedRules){
                if(typeof this.rules[parsedRule['ruleName']] === 'undefined'){
                    throw new Error(parsedRule['ruleName'] + ' Validasyon Kuralı bulunamadı');
                }
                let execRuleResult = this.rules[parsedRule['ruleName']](data, key, parsedRule['params'], ext);
                if(execRuleResult === false){
                    if(typeof this.languages[this.language][parsedRule['ruleName']] === 'undefined'){
                        throw new Error(this.language + ' dilinde ' + parsedRule['ruleName'] + ' kuralının mesajı bulunmamaktadır');
                    }
                    result.success = false;
                    let message = this.languages[this.language][parsedRule['ruleName']];
                    message = message.replace('{name}',( typeof rules[key]['name'] !== 'undefined' ? rules[key]['name'] : key));
                    message = message.replace('{value}', data[key]);
                    parsedRule['params'].forEach(function(paramVal, paramKey){
                        message = message.replace(('{p' + paramKey + '}'), paramVal);
                    })
                    for(extKey in ext){
                        message = message.replace(('{ext.' + extKey + '}'), ext[extKey]);
                    }
                    result.messages.push(message.replace(/{(.(?!{{.+}}))+}/gi,''));
                    ext = {};
                    break outloop2;
                } else if (execRuleResult === null){
                    break outloop1;
                }
            }
        }
    }
    return result;
};

module.exports = validator;
