//import url from 'node:url';

function normalizeURL(url) {
    const fullURL = new URL(url);
    //console.log(fullURL.hostname.replace('www.', '') + fullURL.pathname)

    return fullURL.hostname.replace('www.', '') + fullURL.pathname.toLowerCase()

}

function getURLSFromHTML(htmlBody, baseURL) {
    const { JSDOM } = require('jsdom');
    const foundURLS = [];

    const dom = new JSDOM(htmlBody);
    const results = dom.window.document.querySelectorAll('a');

    results.forEach((result) => { 
        foundURLS.push(result.href)
    });

    return foundURLS
}

//getURLSFromHTML(`<!DOCTYPE html><body><a href="www.google.com/images">Google images</a><a href="www.google.com/search">Google search</a></body>`, 'www.google.com')

module.exports = {
    normalizeURL,
    getURLSFromHTML
}