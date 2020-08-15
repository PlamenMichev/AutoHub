const { getSearchResults, getResultsCount } = require('../services/search-service');

const getSearch = async (req, res) => {
    try {
        const ads = await getSearchResults(req.query, req.query.page, req.query.perPage);
        const count = await getResultsCount(req.query, req.query.page, req.query.perPage);
        res.status(200)
            .send({
                ads,
                count,
            });
    } catch (error) {
        res.status(500)
            .send({
                message: 'Error has occured!',
            });
    }
}

module.exports = {
    getSearch,
}