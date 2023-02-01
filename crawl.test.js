const { test, expect } = require('@jest/globals')

const { normalizeURL } = require('./crawl.js')


test('Test normalizeURL: getting a URL and remove protocol', () => {
    expect(normalizeURL('https://images.google.com/home')).toBe('images.google.com/home')
});

test('Test normalizeURL: remove last /', () => {
    expect(normalizeURL('https://images.google.com/home/')).toBe('images.google.com/home')
});

test('Test normalizeURL: all lower case', () => {
    expect(normalizeURL('https://images.GOOGLE.com/home/')).toBe('images.google.com/home')
});


//Testing getURLsFromHTML
const { getURLSFromHTML } = require('./crawl.js') 

const expectedURLS = ["https://www.google.com/images", "https://www.google.com/search"]


test('Test getURLSFromHTML: get the array with absolute URLs', () => {
    expect(getURLSFromHTML(`
    <html>
        <body>
            <a href="https://www.google.com/images">Google images</a>
            <a href="https://www.google.com/search">Google search</a>
        </body>
    </html>`, 'www.google.com')).toEqual(expectedURLS, 'google.com')
});


test('Test getURLSFromHTML: get the array with relative URLs', () => {
    expect(getURLSFromHTML(`
    <html>
        <body>
            <a href="/images">Google images</a>
            <a href="/search">Google search</a>
        </body>
    </html>`, 'https://www.google.com')).toEqual(expectedURLS, 'https://www.google.com')
});

test('Test getURLSFromHTML: invalid URLs', () => {
    expect(getURLSFromHTML(`
    <html>
        <body>
            <a href="invalid">Google images</a>
        </body>
    </html>`, 'https://www.google.com')).toEqual([])
});


test('Test getURLSFromHTML: mix of invalid URL, absolute and relative', () => {
    expect(getURLSFromHTML(`
    <html>
        <body>
            <a href="invalid">invalid path</a>
            <a href="https://www.google.com/images">Google images</a>
            <a href="/search">Google search</a>
            
        </body>
    </html>`, 'https://www.google.com')).toEqual(expectedURLS)
});
