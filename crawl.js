const { JSDOM } = require('jsdom');

function normaliseURL(urlInput) {
    const fullURL = new URL(urlInput); //URL function will lowercase automatically
    const hostPath =  `${fullURL.hostname}${fullURL.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1) // remove final / from URL
    }
    return hostPath
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

async function crawlPage(base_url, currentURL, pages) { //async due to fetch
    //Check if url provided is a valid URL
    
    try {
        const base_urlObj = new URL(base_url);
        const currentURLObj = new URL(currentURL);
        
        if(base_urlObj.hostname !== currentURLObj.hostname) { //return if the hostname is not the same e.g google.com
            return pages 
        }

    } catch (err) {
        console.log(`Error with URL: ${err.message}`)
    }

    currentURLNormalised = normaliseURL(currentURL)

    if (pages[currentURLNormalised] > 0) {
        pages[currentURLNormalised]++
        return pages
    }

    // if its not already there, add to the pages object
    pages[currentURLNormalised] = 1

    console.log(`now crawling: ${currentURL}`)

    try {
        const page = await fetch(currentURL)
        
        if (page.status > 399) {
            console.log(`Unable to continue, error code: ${page.status} on page ${currentURL}`)   
            return pages//stop crawling page but still return the current pages object
        }
        if (!page.headers.get('content-type').includes("text/html")) {
            console.log(`URL does not contain HTML, content type is ${page.headers.get('content-type')}`) 
            return pages //stop crawling page but still return the current pages object
        }

        const html_page = await page.text()
        const fetchedURls = getURLSFromHTML(html_page, base_url)

        for (const nextURL of fetchedURls) {
            pages = await crawlPage(base_url, nextURL, pages) //recursive crawling
        }
    } catch (err) { //get any errors that happen and fail
        console.log(`Error with crawl attempt: ${err.message}`)
    }
    return pages
}

module.exports = {
    normaliseURL,
    getURLSFromHTML,
    crawlPage
}
