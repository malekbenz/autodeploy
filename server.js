const express = require('express');
const app = express();
var exec = require('child_process').exec;
var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

const PORT = process.env.PORT || 4000;


app.use(express.static('public'));

app.use('/', function (req, res, next) {
     req.body.event = req.headers['x-github-event'];

     if(req.body.ref){
 		req.body.branch = req.body.ref.split('/')[2];
 	}
     next();
 });

app.use('/', function (req, res, next) {
	
	console.log("req.url", req.url);
    if (req.body.event != 'push') {
        res.statuscode = 200
        res.end('not a push event ' + req.url);

        return;
    }

    // exec('deploy.bat', function (error, stdout, stderr) {
        // console.log('build has is triggered on ', req.body.branch);
        // console.log(stdout);
        // if (error != null) {
            // console.log('error during the execution of redeploy: ' + stderr);
            // res.statuscode = 200
            // res.end('error during the execution of redeploy');
            // return;
        // }
    // });
    next();
});

 
app.post('/', function (req, res) {
	
	var response = { success : false, message: '' };
    if (req.body.branch != 'develop' && req.body.branch != 'master') {

        console.log('a %s event on %s branch', req.body.event , req.body.branch);
        res.statuscode = 200;
        res.end('not a master branch');
        return;
    }

	exec('deploy.bat', function (error, stdout, stderr) {
			console.log('build has is triggered on Develop ');
			console.log(stdout);
			if (error != null) {
				console.log('Error during the execution of redeploy: ' + stderr);
				response.message = 'Error during the execution,   ' + stderr;
				res.send(response);
				return;
			}
			response.success =true;
			response.message = 'Good job , ' + stdout;
			res.send(response);
		});
   
	
});

app.get('/deploy', function (req, res) {
	  
    res.sendFile(__dirname + '/index.html');
});



 

app.listen(PORT, function () {
    console.log('Server listening on port ', PORT )
})