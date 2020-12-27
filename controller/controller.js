const _ = require('lodash');
const got = require('got');

const controllerHelper = require('./controller-helper');
const cacheService = require('../service/cache-service').Cache;


const ttl = 60 * 60 * 1; // cache for 1 Hour
const cache = new cacheService(ttl); // Create a new cache service instance

const getMeta = async (req, res, next) => {
    const url = _.get(req, 'body.url', '');
    try {
        const key = `getMetaData_${url}`;
        let metaObj = await cache.get(key, async () => {
            return await controllerHelper.getMetaObj(url);
        });
        res.send(metaObj);
    } catch (e) {
        console.log("Error while Fetching metaData", e);
        res.send(e)
    }
};

module.exports = {
    getMeta: getMeta
};
