const express = require('express');
const cheerio = require('cheerio');
const _ = require('lodash');
const bodyParser = require('body-parser');


const routers = require('./routes/index');


const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//
// const options = { url: 'https://dzone.com/articles/what-is-cicd' };
// ogs(options, (error, results, response) => {
//     console.log('error:', error); // This is returns true or false. True if there was a error. The error it self is inside the results object.
//     console.log('results:', results); // This contains all of the Open Graph results
//     const {body: html, url} = response;
//     console.log('html:', html); // This contains the HTML of page
//
// });
app.use('/', routers);

// const getData = async () => {
//     const response = await got.get('https://www.imdb.com/title/tt10048342/?ref_=hm_fanfav_tt_2_pd_fp1');
//
//     const $ = cheerio.load(response.body);
//     const meta = $('meta');
//     const metas = Object.keys(meta);
//     const metaData = {};
//     const ogObj = {};
//     metas.forEach((key) => {
//         if (meta[key].attribs !== undefined) {
//             if (meta[key].attribs.property && meta[key].attribs.content) {
//                 const prop = meta[key].attribs.property;
//                 console.log("===>>>prop", prop);
//                 if (_.includes(prop, 'og:')) {
//                     ogObj[prop.replace('og:', '')] = meta[key].attribs.content;
//                 }else {
//                     metaData[meta[key].attribs.property] = meta[key].attribs.content;
//                 }
//             }
//             if (meta[key].attribs.name && meta[key].attribs.content) {
//                 metaData[meta[key].attribs.name] = meta[key].attribs.content;
//             }
//         }
//     });
//     metaData.ogObj = ogObj;
//     if(meta.title || me)
//     console.log("====>>>> metaData", metaData);
// };
//
// getData();

const port = process.env.PORT || 5000;


app.listen(port);
