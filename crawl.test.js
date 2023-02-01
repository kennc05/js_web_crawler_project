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


/*

const { getURLSFromHTML } = require('./crawl.js') 

test('Testing html 1', () => {
    expect(getURLSFromHTML(`<!DOCTYPE html><body><a href="www.google.com/images">Google images</a><a href="www.google.com/search">Google search</a></body>`, 'www.google.com')).toEqual(["www.google.com/images", "www.google.com/search"])
});


*/