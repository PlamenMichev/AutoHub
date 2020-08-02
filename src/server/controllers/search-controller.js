const { getSearchResults } = require('../services/search-service');

const getSearch = async (req, res) => {
    try {
        const result = await getSearchResults(req.query);
        res.status(200)
            .send(result);
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