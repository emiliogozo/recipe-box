/**
 * Recipe Helper
 */
var RecipeHelper = {
    csvToArray: (csv) => {
        return csv.split(',').map(val => {
            return val.replace(/^\ */,'');
        });
    },
    arrayToCsv: (arr) => {
        if(!arr) return undefined;
        return arr.join(', ');
    }
};

module.exports = RecipeHelper;