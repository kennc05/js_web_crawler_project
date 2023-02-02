/*
*
* Purpose: Main file to run the crawler
* Author: @kennc05 
* Date created: 30/01/23
*
*/

const {crawlPage} = require('./crawl.js')
const {printReport} = require('./report.js')

async function main() {

    var arguments = process.argv //get the arguements passed when starting from CLI
    if (arguments.length < 3) {
        console.log('too little was provided, please double check');
        process.exit(1)
    } else if (arguments.length > 4) {
        console.log('too many arguments provided');
    } else {
        console.log(`Starting web crawler now at URL: ${arguments[2]}`);
    }
    const results = await crawlPage(arguments[2], arguments[2], {});
    printReport(results);
}

main()
