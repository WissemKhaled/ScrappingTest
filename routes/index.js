var express = require('express');
var router = express.Router();
const scrapping = require('../helpers/scrapping.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	let zeldas = scrapping.read('zeldas'); 
  	res.render('index', { "zeldas": zeldas });
});

router.post('/zelda/scrap', function(req, res, next){
	let url = req.body.url;
	scrapping.zelda.scrap(url, function(result){
		res.send(result);
	});
});

router.get('/zeldas/scrap', function(req, res, next) {
	scrapping.zeldas.scrap(function(){
		res.send('true');
	});
});



module.exports = router;
