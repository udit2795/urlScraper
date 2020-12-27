# Metadata Scrapper


## Description
API to scrape an input URL and parse its OG metadata. It will return all metaData with og parameters(if available).


## Steps to start the project in local
- clone the repository
- run <b>npm i</b> in terminal
- run <b>npm start</b> to start the application

## CURL command to get metaData
```curl
curl --location --request POST 'http://localhost:5000/fetchMeta' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'url=https://www.imdb.com/title/tt1070874/?ref_=hm_tpks_tt_1_pd_tp1'
```

