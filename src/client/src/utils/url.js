const createGetUrl = (terms) => {
    let result = ''
    for (const term in terms) {
        if (terms[term]) {
            result += `&${term}=${terms[term]}`
        }
    }

    return result;
}

export default {
    createGetUrl,
}