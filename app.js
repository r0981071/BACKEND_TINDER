const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//ROUTING

const indexRouter = require('./routes/index');//just in case index
const userRouter = require('./routes/users');
const profileRouter = require('./routes/profile');
const swipesRouter = require('./routes/swipes');
const matchesRouter = require('./routes/matches');
const messagesRouter = require('./routes/messages');
const conversationsRouter = require('./routes/conversations');

app.use('/', indexRouter);//just in case index
app.use('/api/users', userRouter);
app.use('/api/profiles', profileRouter);
app.use('/api/swipes', swipesRouter);
app.use('/api/matches', matchesRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/conversations', conversationsRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');




// catch 404 and forward to error handler
app.use((req, res, next) =>{
  next(createError(404));
});

// error handler
app.use((err, req, res, next) =>{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
