// There are some errors in this

const axios = require("axios");

const cheerio = require("cheerio");

const url = "https://quotes.toscrape.com/"

async function scrapeQuotes() {
    try {
        console.log(`Fetching data from: ${url}`)
        const $ = axios.load(response.data);
        const $ = cheerio.load(response.data);
        const scrapedData = [];

        $(".quote").each((i, element) => {

        })
    }
}