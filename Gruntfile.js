'use strict';
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    uglify: {
      build: {
        files: {
          'dist/countries.min.js': ['dist/countries.js']
        }
      }
    }
  });

  grunt.registerTask('generate-countries', 'Generate the countries script', function(arg1, arg2) {
    var countryInputFile = 'countries.yaml';
    var currencyInputFile = 'currency-symbol-map.json';

    var outputfile = 'dist/countries.js';

    var currenciesByISO = {};
    var countriesByISO = {};
    var lines = [];

    var countries = grunt.file.readYAML(countryInputFile);
    var currencySymbolMap = grunt.file.readJSON(currencyInputFile);

    Object.keys(countries).forEach(function(key) {
      var country = countries[key],
        alpha2 = country.alpha2;
      if (alpha2) {
        var currency = country.currency;

        var obj = {
          value: country.alpha2,
          name: country.name,
          names: country.names,
          region: country.region,
          subregion: country.subregion,
          currency: country.currency,
          alpha2: country.alpha2,
          alpha3: country.alpha3,
          ioc: country.ioc,
          number: country.number,
          tel: country.country_code,
          latitude: country.latitude,
          longitude: country.longitude,
          un: country.un_locode
        };

        if(country.commonname) {
          obj.commonname = country.commonname;
        }

        countriesByISO[alpha2] = obj;

        if (!currenciesByISO[country.currency]) {
          currenciesByISO[country.currency] = {
            value:  country.currency,
            name: country.currency,
            symbol: currencySymbolMap[country.currency] || false,
            countries: [obj.value]
          };
        } else {
          currenciesByISO[country.currency].countries.push(obj.value);
        }
      }

    });

    loadTemplate(function(err, template) {
      console.log("Loading template...");
      if(err || !template) {
        console.log('Failed to load template'.red);
        console.log(err);
      }


      template = template.replace('\'%%countries%%\'', JSON.stringify(countriesByISO, null, 2));
      template = template.replace('\'%%currencies%%\'', JSON.stringify(currenciesByISO, null, 2));

      grunt.file.write(outputfile, template);
    });

    function loadTemplate(callback) {
      var template = grunt.file.read(__dirname + '/' + 'countries.js.template');
      callback(null, template.toString());
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', [
    'generate-countries',
    'uglify'
  ]);

};