const { JSDOM } = require('jsdom');

function normalizeURL(urlInput) {
    const fullURL = new URL(urlInput); //URL function will lowercase automatically
    const hostPath =  `${fullURL.hostname}${fullURL.pathname}`
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
        if (result.href.slice(0, 1)=== '/') { //check if relative or absolute path
            try {
                urlObj = new URL(`${baseURL}${result}`);
                foundURLS.push(`${baseURL}${result}`);
            } catch (err) {
                console.log(`relative url is not valid: ${err.message}, URL found was: ${baseURL}${result}`) // if url is not valid
            }
            
        } else {
            try {
                urlObj = new URL(`${result.href}`);
                foundURLS.push(result.href);
            } catch (err) {
                console.log(`absolute url is not valid: ${err.message}, URL found was: ${baseURL}${result}`) // if url is not valid
            }
        }
    });

    return foundURLS
}

async function crawlPage(providedURL) { //async due to fetch 
    console.log(`now crawling: ${providedURL}`)

    try {
        const page = await fetch(new URL(providedURL))
        
        if (page.status > 399) {
            console.log(`Unable to continue, error code: ${page.status} on page ${providedURL}`)   
            return //stop crawling page 
        }
        if (!page.headers.get('content-type').includes("text/html")) {
            console.log(`URL does not contain HTML, content type is ${page.headers.get('content-type')}`) 
            return //stop crawling page 
        }
        console.log(await page.text())

    } catch (err) { //get any errors that happen and fail
        console.log(`Error: ${err.message}`)
    }

}

module.exports = {
    normalizeURL,
    getURLSFromHTML,
    crawlPage
}
