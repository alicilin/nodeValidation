
function rules(validator){

    validator.addRule('isNull', function(allData, key, params, ext){
        return allData[key] === null;
    });

    validator.addRule('isNotNull', function(allData, key, params, ext){
        return allData[key] !== null;
    });

    validator.addRule('equalKey', function(allData, key, params, ext){
        return typeof allData[params[0]] === 'undefined' ? null : (allData[key] == allData[params[0]]);
    });

    validator.addRule('toInt', function(allData, key, params, ext){
        allData[key] = parseInt(allData[key]);
        return true;
    });

    validator.addRule('toFloat', function(allData, key, params, ext){
        allData[key] = parseFloat(allData[key]);
        return true;
    });

    validator.addRule('toString', function(allData, key, params, ext){
        allData[key] = String(allData[key]);
        return true;
    });
    
    validator.addRule('toBoolean', function(allData, key, params, ext){
        allData[key] = ((String(allData[key]) === 'true' || String(allData[key]) === '1') ? true : false);
        return true;
    });
    
    validator.addRule('toArray', function(allData, key, params, ext){
        if(typeof allData[key] === 'string'){
            allData[key] = allData[key].split('');
        } else if(typeof allData[key] === 'object'){
            let result = [];
            for(let k in allData[key]){
                result.push(allData[key][k]);
            }
            allData[key] = result;
        } else if (typeof allData[key] === 'integer'){
            let result = [];
            for(let item of String(allData[key]).split('')){
                result.push(item);
            }
            allData[key] = result;
        } else if (typeof allData[key] === 'float'){
            let result = [];
            for(let item of String(allData[key]).split('')){
                result.push(item);
            }
            allData[key] = result;
        }
        return true;
    });

    validator.addRule('toNull', function(allData, key, params, ext){
        allData[key] = null;
        return true;
    });

    validator.addRule('isInt', function(allData, key, params, ext){
        return (typeof allData[key] === 'integer');
    });

    validator.addRule('isNumber', function(allData, key, params, ext){
        let regex = /^\d+$/gi;
        return regex.exec(allData[key]) !== null;
    });

    validator.addRule('isPhone', function(allData, key, params, ext){
        let regex = /^(\+\d{1,2})*(\s|\D)*\d{3,4}(\s|\D)*\d{3}(\s|\D)*\d{2}(\s|\D)*\d{2}$/gimu;
        return regex.exec(allData[key]) !== null;
    });

    validator.addRule('isCardNumber', function(allData, key, params, ext){
        let regex = /^\d{4}\s*\d{4}\s*\d{4}\s*\d{4}$/gimu;
        return regex.exec(allData[key]) !== null;
    });

    validator.addRule('isEmail', function(allData, key, params, ext){
        let regex = /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/giu;
        return regex.exec(allData[key]) !== null;
    });


    validator.addRule('isDomain', function(allData, key, params, ext){
        let regex = /^(http:\/\/|https:\/\/)?(www\.)?[a-z0-9_.-]*\.[.a-z]{2,6}$/giu;
        return regex.exec(allData[key]) !== null;
    });

    validator.addRule('maxLenght', function(allData, key, params, ext){
        let regex = new RegExp('/^.{0,' + params[0] + '}$/','gumi');
        return regex.exec(allData[key]) !== null;
    });

    validator.addRule('minLenght', function(allData, key, params, ext){
        let regex = new RegExp('/^.{' + params[0] + ',}$/','gumi');
        return regex.exec(allData[key]) !== null;
    });

    validator.addRule('rangeLenght', function(allData, key, params, ext){
        let regex = new RegExp('/^.{' + params[0] + ',' + params[1] + '}$/','gumi');
        return regex.exec(allData[key]) !== null;
    });

    validator.addRule('isIPv4', function(allData, key, params, ext){
        let regex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/giu;
        return regex.exec(allData[key]) !== null;
    });

    validator.addRule('isIPv6', function(allData, key, params, ext){
        let regex = /^(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9](?::|$)){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?))$/giu;
        return regex.exec(allData[key]) !== null;
    });

    validator.addRule('contains', function(allData, key, params, ext){
        return params[0].split(',').indexof(allData[key]) !== -1;
    });

    validator.addRule('notContains', function(allData, key, params, ext){
        return params[0].split(',').indexof(allData[key]) === -1;
    });

    validator.addRule('rangeNumber', function(allData, key, params, ext){
        return (parseInt(params[0]) <= parseInt(allData[key]) && parseInt(allData[key]) >= parseInt(params[1]));
    });

}

module.exports = rules;