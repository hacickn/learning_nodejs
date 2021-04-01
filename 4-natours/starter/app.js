const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const xss = require('xss-clean');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
<<<<<<< HEAD
const reviewRouter = require('./routes/reviewRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
=======
>>>>>>> parent of 7f4eda3 (a)

const app = express();

// MIDDLEWARE
// set security http headers
app.use(helmet());

// development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour',
});

app.use('/api', limiter);

// body parser, reading data from the body into req.body
app.use(express.json());
//app.use(express.json({limit:'10kb'}));

// data sanitization against NoSQL querry incjection
app.use(mongoSanitize());

// data sanitization against XSS
app.use(xss());

//preventing parameter pollution
app.use(
  hpp({
    whiteList: [
      'duration',
      'ratingQuantity',
      'ratingAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// serving static files
app.use(express.static(`${__dirname}/public`));

// test middleware
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
<<<<<<< HEAD
app.use('/api/v1/reviews', reviewRouter);
app.all('*', (req, res, next) => {
  /*
  const err = new Error(`cant find ${req.originalUrl} on this server`);
  err.status = 'fail';
  err.statusCode = 404;
  */
  next(new AppError(`cant find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);
=======
>>>>>>> parent of 7f4eda3 (a)

module.exports = app;

/*
app.get('/', (req,res)=>{
    //res.status(200).send('Hello from the server side');
    res.status(200).json({message : 'Hello from the server side by haci and talha', app: 'Natours', date: '22/10/2020'});
});

app.post('/',(req,res)=>{
    console.log("asadfaasfaf");
    res.send('You are using the post ');
})
*/

// 2 ROUTEHANDLER

// 3 ROUTES
/*
app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getTour);
app.post('/api/v1/tours', createTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);
*/
