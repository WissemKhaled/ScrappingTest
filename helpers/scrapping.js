const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');


module.exports = {
	"read": function(fileName) {
		return JSON.parse(fs.readFileSync('data/' + fileName + '.json').toString());			
	},
	"zelda": {
		"scrap": function(url, callback) {
			const options = {
				"url": url,
				"transform": function(body) {
					return cheerio.load(body);
				}
			}
			rp(options)
			.then( function ($){				
				callback($('#landingImage').attr('src'));
			})
		}
	},
	"zeldas": {
		"scrap": function(callback) {
			const stream = fs.createWriteStream('data/zeldas.json', {flags:'a'});
			const options = {
				url: "https://www.amazon.fr/s/ref=sr_nr_n_9?fst=as%3Aoff&rh=n%3A530490%2Cn%3A13493653031%2Ck%3Azelda&keywords=zelda&ie=UTF8&qid=1528880593&rnid=548014",
				transform: function(body) {
					return cheerio.load(body);
				}
			}
			rp(options)
			.then( function ($){
				fs.writeFileSync('data/zeldas.json', '');
				stream.write('[');
				let length = $('div.a-fixed-left-grid-col.a-col-right').length;
				$('div.a-fixed-left-grid-col.a-col-right').each(function(i, el) {
				
						stream.write(JSON.stringify({
							//"id": i,
							"name": $(this).children().first().children().first().children().first().children('h2').attr('data-attribute'),
							"url": $(this).children().last().children().first().children().last().children().last().children('a').attr('href'),
							"prix": $(this).children().last().children().first().children().last().children().last().children('a').last().children('span').text()
						}));
						if(i !== length - 1) {
							stream.write(',');
						}
					//}
				})
				stream.write(']');
				console.log('Scrapping Done');
				callback();
			})
			.catch( function(err) {
				console.log(err);
			}); 
		}
	}
}
