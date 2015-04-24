# ISO Country Codes

### a little javascript helper

This library is a javascript version of the dataset originally published by [Andrew Patton](http://www.andrewpatton.com/countrylist.html). This dataset merges information from ISO, United Nations and the CIA World Factbook.

By converting the dataset to javascript objects you can access commonly required information (name, currency etc) just using the two letter [ISO 3166-1 alpha-2](http://wikipedia.org/wiki/ISO_3166-1_alpha-2) code. Additional methods are available to search for countries by current, name, international telephone dialling prefix, top-level internet domain etc.

It works in both [Node.js](http://nodejs.org) and the web browser.


## Installation


For use in Node.js:

    npm install iso-countries

In the browser just copy the file from `dist\countries.min.js` (skinny) or `dist\countries.js` (full-fat).


