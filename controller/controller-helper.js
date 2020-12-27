const _ = require('lodash');
const cheerio = require('cheerio');
const got = require('got');


const getMetaObj = async (url) => {
    if (_.isEmpty(url)) {
        return "Url is empty";
    }
    try {
        const response = await got.get(url);
        const $ = cheerio.load(response.body);
        const meta = $('meta');
        const metas = Object.keys(meta);
        const metaData = {};
        const ogObj = {};
        metas.forEach((key) => {
            if (meta[key].attribs !== undefined) {
                if (meta[key].attribs.property && meta[key].attribs.content) {
                    const prop = meta[key].attribs.property;
                    if (_.includes(prop, 'og:')) {
                        let modified_key = prop.replace('og:', '');
                        if (!_.isEmpty(ogObj[modified_key])) {
                            ogObj[modified_key] = [ogObj[modified_key]].push(meta[key].attribs.content)
                        } else {
                            ogObj[prop.replace('og:', '')] = meta[key].attribs.content;
                        }
                    } else {
                        metaData[meta[key].attribs.property] = meta[key].attribs.content;
                    }
                }
                if (meta[key].attribs.name && meta[key].attribs.content) {
                    metaData[meta[key].attribs.name] = meta[key].attribs.content;
                }
            }
        });
        metaData.ogObj = ogObj;
        return metaData;
    } catch (e) {
        console.log("Error while fetching metadata", e);
        return e;
    }
};

module.exports = {
    getMetaObj: getMetaObj
};
