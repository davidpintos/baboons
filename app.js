express = require('express');
app = module.exports = express();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');  
});

require('./routes/home')(app);
app.listen(8080);
