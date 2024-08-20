var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

//database
const connectToDatabase = require('./conection/mongo');
//routes
const sessionRoutes = require('./routes/session');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const studentRoutes = require('./routes/student');
const interestAreaRoutes = require('./routes/interestArea');
const instructorRoutes = require('./routes/instructor')
const specialityRoutes = require('./routes/speciality')
const courseRoutes = require('./routes/course');
const moduleRoutes = require('./routes/module');
const lessonRoutes = require('./routes/lesson');
const answerRoutes = require('./routes/answer');
const questionRoutes = require('./routes/question');
const achievementRoutes = require('./routes/achievement');
const reviewRatingRoutes = require('./routes/reviewRating');
const forumRoutes = require('./routes/forum');
const commentRoutes = require('./routes/comment');
const assessmentRoutes = require('./routes/assessment');
const recuperacion = require('./routes/recuperacion');
const loginRoute = require('./routes/login');
const userAnswerRoutes = require('./routes/userAnswer');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');



var app = express();
app.use(cors());
connectToDatabase();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/sessions', sessionRoutes);
app.use('/users', userRoutes);
app.use('/categorys', categoryRoutes);
app.use('/students', studentRoutes);
app.use('/interestAreas', interestAreaRoutes);
app.use('/instructors', instructorRoutes);  
app.use('/specialitys', specialityRoutes);
app.use('/courses', courseRoutes);
app.use('/modules', moduleRoutes);
app.use('/lessons', lessonRoutes);
app.use('/answers', answerRoutes);
app.use('/questions', questionRoutes);
app.use('/achievements', achievementRoutes);
app.use('/reviewRatings', reviewRatingRoutes);
app.use('/forums', forumRoutes);
app.use('/comments', commentRoutes);
app.use('/assessments', assessmentRoutes);
app.use('/recuperacion', recuperacion);
app.use('/login', loginRoute);
app.use('/useranswers', userAnswerRoutes);

//app.use('/auth', loginRoute); 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
