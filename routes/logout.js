var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	
	if(req.session.id)
	{
		req.session.destroy();
	}

	res.redirect('/login?loggedOut=1');


});

module.exports = router;
