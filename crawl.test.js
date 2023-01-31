const { test, expect } = require('@jest/globals')

const { normalizeURL } = require('./crawl.js')

test('Testing website 1: www.GOOGLE.COM/homE', () => {
    expect(normalizeURL('https://www.GOOGLE.COM/homE')).toBe('google.com/home')
});

test('Testing website 1: http://www.GOOGLE.COM/home', () => {
    expect(normalizeURL('http://www.GOOGLE.COM/home')).toBe('google.com/home')
});


test('Testing website 1: https://www.gooGle.com/HOME', () => {
    expect(normalizeURL('https://www.gooGle.com/HOME')).toBe('google.com/home')
});


test('Testing website 1: http://www.google.COM/HOME', () => {
    expect(normalizeURL('http://www.google.COM/HOME')).toBe('google.com/home')
});



const { getURLSFromHTML } = require('./crawl.js') 

test('Testing html 1', () => {
    expect(getURLSFromHTML(`<!DOCTYPE html><body><a href="www.google.com/images">Google images</a><a href="www.google.com/search">Google search</a></body>`, 'www.google.com')).toBe('[www.google.com/images, www.google.com/search]')
});