const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 9090;

var app = express();


app.set('view engine', 'hbs');
app.use((req, res, next) => {
    console.log(req.ip, + ', ' + (new Date().toString()));
    next();
});
// app.use((req, res, next) => {
//     console.log(req.ip, + ', ' + (new Date().toString()));
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

app.get('/', (req, res) => {
    // res.send('<h1>Hello express!</h1>');
    res.render('home.hbs', {
        page: 'Home',
        welcome: 'Achetez ce que vous voulez'
    });

    // res.header('content-type', 'text/json');
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        page: 'About'
    });
});

app.get('/download', (req, res) => {
    res.render('download.hbs', {
        link: 'hahaha.pdf'
    });
});

app.get('/bad', (req, res) => {
    var err = {
        errorMessage: 'Bad request'
    };

    res.send(err);
});

app.listen(port, () => {
    console.log('Server waiting for connections on port ' + port);
});