const { JSDOM } = require('jsdom');

function normalizeURL(urlInput) {
    const fullURL = new URL(urlInput); //URL function will lowercase automatically
    const hostPath =  `${fullURL.hostname}${fullURL.pathname}`
    console.log(hostPath)

    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1) // remove final / from URL
    }
    return hostPath

    //return fullURL.hostname.replace('www.', '') + fullURL.pathname.slice(0,-1) //return normalised url without /

}

function getURLSFromHTML(htmlBody, baseURL) {
    const foundURLS = [];
    const dom = new JSDOM(htmlBody); //dom = document object model, in-memory object that uses the html tree structure 
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