const express = require('express');
const app = express();
var exec = require('child_process').exec;
var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));


app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.use('/', function (req, res, next) {
    req.body.event = req.headers['x-github-event'];
    
    req.body.branch = req.body.ref.split('/')[2];
    next();
});

app.use('/', function (req, res, next) {
    if (req.body.event != 'push') {
        res.statusCode = 200
        res.end('Not a push event');

        return;
    }
    if (req.body.branch != 'master') {

        console.log('a %s event on %s branch', req.body.event , req.body.branch);
        res.statusCode = 200;
        res.end('Not a master branch');
        return;
    }

    exec('deploy.bat', function (error, stdout, stderr) {
        console.log('build has is triggered on ', req.body.branch);
        console.log(stdout);
        if (error != null) {
            console.log('Error during the execution of redeploy: ' + stderr);
            res.statusCode = 200
            res.end('Error during the execution of redeploy');
            return;
        }
    });
    next();
});

app.post('/', function (req, res) {

    res.send('Well done!')
})

app.listen(8080, function () {
    console.log('Server listening on port 8080!')
})