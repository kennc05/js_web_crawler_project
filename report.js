/*
*
* Purpose: File for functions to print out to console each internal link found and in sorted order
* Author: @kennc05 
* Date created: 30/01/23
*
*/


function printReport(pages) {
    pages.sort 
    console.log("Report being generated")
    sorted_array = orderLinks(pages) 

    //Loop through the sorted array and print each line to the report 
    for(const page of sorted_array) {
        console.log(`Found ${page[1]} internal links to ${page[0]}`)
    }
}

function orderLinks(pagesObj) {
    const pageArray = Object.entries(pagesObj)

    //[1] ensures that we are comparing the second element of each array in order 
    return pageArray.sort((a, b) => {
        return b[1] - a[1]
    });
}

module.exports = {
    printReport
}
