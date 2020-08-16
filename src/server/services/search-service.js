const Ad = require('../models/ad');

const getSearchResults = async (terms, page, perPage) => {
    let filteredTerms = {};
    for (key in terms) {
        if (terms.hasOwnProperty(key) && key !== 'page' && key !== 'perPage') {
            filteredTerms[key] = terms[key];
        }
    }
    
    let query = {...filteredTerms};
    // Setup query ranges
    for (const term in terms) {
        switch (term) {
            case 'minYear': {
                setupQueryRange(query, 'manufactureDate', new Date(terms[term], 1, 1), 'minYear', '$gte');
                break;
            }
            case 'maxYear': {
                setupQueryRange(query, 'manufactureDate', new Date(terms[term], 1, 1), 'minYear', '$lte');
                break;
            }
            case 'minPower': {
                setupQueryRange(query, 'horsepower', terms[term], 'minPower', '$gte');
                break;
            }
            case 'maxPower': {
                setupQueryRange(query, 'horsepower', terms[term], 'maxPower', '$lte');
                break;
            }
            case 'minPrice': {
                setupQueryRange(query, 'price', terms[term], 'minPrice', '$gte');
                break;
            }
            case 'maxPrice': {
                setupQueryRange(query, 'price', terms[term], 'maxPrice', '$lte');
                break;
            }
        }
    }
    
    const result = await Ad
        .find({...query})
        .sort('-createdOn')
        .skip((page - 1) * perPage)
        .limit(+perPage);

    return result;
}

const getResultsCount = async (terms, page, perPage) => {
    let filteredTerms = {};
    for (key in terms) {
        if (terms.hasOwnProperty(key) && key !== 'page' && key !== 'perPage') {
            filteredTerms[key] = terms[key];
        }
    }
    
    let query = {...filteredTerms};
    // Setup query ranges
    for (const term in terms) {
        switch (term) {
            case 'minYear': {
                setupQueryRange(query, 'manufactureDate', new Date(terms[term], 1, 1), 'minYear', '$gte');
                break;
            }
            case 'maxYear': {
                setupQueryRange(query, 'manufactureDate', new Date(terms[term], 1, 1), 'minYear', '$lte');
                break;
            }
            case 'minPower': {
                setupQueryRange(query, 'horsepower', terms[term], 'minPower', '$gte');
                break;
            }
            case 'maxPower': {
                setupQueryRange(query, 'horsepower', terms[term], 'maxPower', '$lte');
                break;
            }
            case 'minPrice': {
                setupQueryRange(query, 'price', terms[term], 'minPrice', '$gte');
                break;
            }
            case 'maxPrice': {
                setupQueryRange(query, 'price', terms[term], 'maxPrice', '$lte');
                break;
            }
        }
    }
    
    const result = await Ad
        .find({...query})
        .countDocuments();

    return result;
}

const setupQueryRange = (query, dbKey, value, filterKey, filterParam) => {
    query[dbKey] = {};
    query[filterKey] = undefined;
    query[dbKey][filterParam] = value;
}

module.exports = {
    getSearchResults,
    getResultsCount
}