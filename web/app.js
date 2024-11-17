var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/biblioteca', (req, res) => {
  const id = 1;
  const userFilePath = 'C:\\Users\\jorge\\Desktop\\Todo\\Trabajos\\DAW\\Segundo año\\diseño de interfaces\\UD01\\appweb\\appweb\\web\\public\\json\\users.json';
  const movieFilePath = 'C:\\Users\\jorge\\Desktop\\Todo\\Trabajos\\DAW\\Segundo año\\diseño de interfaces\\UD01\\appweb\\appweb\\web\\public\\json\\movies.json';


  fs.readFile(userFilePath, 'utf8', (err, userData) => {
    if (err) {
      return res.status(500).send('Error interno del servidor al leer el archivo de usuarios.');
    }

    const users = JSON.parse(userData);
    const user = users.find(u => u.id === id);

    if (!user) {
      return res.status(404).send('Usuario no encontrado.');
    }

    fs.readFile(movieFilePath, 'utf8', (err, movieData) => {
      if (err) {
        return res.status(500).send('Error interno del servidor al leer el archivo de películas.');
      }

      const movies = JSON.parse(movieData);
      const userMovies = movies.filter(movie =>
        movie.copias.some(copia => user.copias.includes(copia.id))
      );

      res.render('biblioteca', { userMovies });
    });
  });
});

app.get('/support', (req, res) => {
  res.render('support');
});

app.get('/info', (req, res) => {
  const movieId = parseInt(req.query.id, 10);
  const movieFilePath = path.resolve(__dirname, 'web/public/json/movies.json');

  fs.readFile(movieFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error interno del servidor al leer el archivo de películas.');
    }

    const movies = JSON.parse(data);
    const movie = movies.find(m => m.id === movieId);

    if (!movie) {
      return res.status(404).send('Película no encontrada.');
    }

    res.render('info', { movie });
  });
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
