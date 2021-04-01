const express = require('express');

const router = express.Router();
<<<<<<< HEAD
const userController = require('../controllers/userController');

const authController = require('../controllers/authController');

router.get(
  '/me',
  authController.protect,
  userController.getMe,
  userController.getUser
);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
=======
const userController = require('./../controllers/userController');
>>>>>>> parent of 7f4eda3 (a)

router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
