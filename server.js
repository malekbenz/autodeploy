const express = require('express');
const app = express();
var exec = require('child_process').exec;
var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

const PORT = process.env.PORT || 8000;


app.post('/deploy/red/', function (req, res) {
	
	var response = { success : false, message: '' };
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


// app.use('/', function (req, res, next) {
//     req.body.event = req.headers['x-github-event'];

//     if(req.body.ref){
// 		req.body.branch = req.body.ref.split('/')[2];
// 	}
//     next();
// });

// app.use('/', function (req, res, next) {
	
// 	console.log("req.url", req.url);
//     if (req.body.event != 'push') {
//         res.statusCode = 200
//         res.end('Not a push event ' + req.url);

//         return;
//     }
//     if (req.body.branch != 'develop') {

//         console.log('a %s event on %s branch', req.body.event , req.body.branch);
//         res.statusCode = 200;
//         res.end('Not a master branch');
//         return;
//     }

//     exec('deploy.bat', function (error, stdout, stderr) {
//         console.log('build has is triggered on ', req.body.branch);
//         console.log(stdout);
//         if (error != null) {
//             console.log('Error during the execution of redeploy: ' + stderr);
//             res.statusCode = 200
//             res.end('Error during the execution of redeploy');
//             return;
//         }
//     });
//     next();
// });


app.listen(PORT, function () {
    console.log('Server listening on port ', PORT )
})