const chai = require('chai');
let chaiHttp = require('chai-http');

const app = require('../server');
const controller = require('../controller/controller-helper');

const assert = chai.assert;
let should = chai.should();


chai.use(chaiHttp);

let url = 'https://www.imdb.com/title/tt1070874/?ref_=hm_tpks_tt_1_pd_tp1';

let metaData = {
    'apple-itunes-app': 'app-id=342792525, app-argument=imdb:///title/tt1070874?src=mdot',
    'theme-color': '#000000',
    pageId: 'tt1070874',
    pageType: 'title',
    subpageType: 'main',
    'fb:app_id': '115109575169727',
    title: 'The Trial of the Chicago 7 (2020) - IMDb',
    description: 'Directed by Aaron Sorkin.  With Eddie Redmayne, Alex Sharp, Sacha Baron Cohen, Jeremy Strong. The story of 7 people on trial stemming from various charges surrounding the uprising at the 1968 Democratic National Convention in Chicago, Illinois.',
    keywords: 'Reviews, Showtimes, DVDs, Photos, Message Boards, User Ratings, Synopsis, Trailers, Credits',
    ogObj: {
        url: 'http://www.imdb.com/title/tt1070874/',
        image: 'https://m.media-amazon.com/images/M/MV5BYjYzOGE1MjUtODgyMy00ZDAxLTljYTgtNzk0Njg2YWQwMTZhXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_UY1200_CR90,0,630,1200_AL_.jpg',
        type: 'video.movie',
        title: 'The Trial of the Chicago 7 (2020) - IMDb',
        site_name: 'IMDb',
        description: 'Directed by Aaron Sorkin.  With Eddie Redmayne, Alex Sharp, Sacha Baron Cohen, Jeremy Strong. The story of 7 people on trial stemming from various charges surrounding the uprising at the 1968 Democratic National Convention in Chicago, Illinois.'
    }
};

let InvalidMetaData = {
    "input": "abc",
    "code": "ERR_INVALID_URL"
};

describe('getMetaObj:: controller helper', async () => {
    it('app should return error', async () => {
        let resp = await controller.getMetaObj('');
        assert.equal(resp, 'Url is empty')
    });

    it('app should return metadata', async () => {
        let resp = await controller.getMetaObj(url);
        delete resp["request_id"];
        assert.deepEqual(resp, metaData);
    });

    it('Invalid url',  (done)=> {
        chai.request(app)
            .post('/fetchMeta')
            .send('abc')
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            })
    });
});
