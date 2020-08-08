const createGetUrl = (terms) => {
    let result = ''
    for (const term in terms) {
        console.log(terms[term])
        if (terms[term] && terms[term] !== '') {
            result += `${term}=${terms[term]}&`
        }
    }

    result = result.substring(0, result.length - 1);
    return result;
}

export default {
    createGetUrl,
}