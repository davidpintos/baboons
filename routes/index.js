module.exports = function(app) {

    // home page
    app.get('/', function(req, res) {        
        res.render('index', { title: 'Baboon' })
    });

    // home page
    app.all('/prueba', function(req, res) {        
        res.render('prueba')
    });

}