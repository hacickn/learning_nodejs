const express = require('express');
<<<<<<< HEAD
const authController = require('../controllers/authController');
const tourController = require('./../controllers/tourController');
//const reviewController = require('../controllers/reviewController');
const reviewRouter = require('./../routes/reviewRoutes');

=======
>>>>>>> parent of 7f4eda3 (a)
const router = express.Router();
const tourController = require('./../controllers/tourController');

<<<<<<< HEAD
router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);
=======
//router.param('id', tourController.checkID);
>>>>>>> parent of 7f4eda3 (a)

router
  .route('/')
  .get(tourController.getAllTours)
<<<<<<< HEAD
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );
=======
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);
>>>>>>> parent of 7f4eda3 (a)

module.exports = router;
