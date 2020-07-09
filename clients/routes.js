const express = require('express');
const actions = require('./act');
const middlewares = require('../middlewares/middlewares');

const router = express.Router();

/// get routes ///
router.get('/categories', actions.getAllCategories);
router.get('/all-meals', actions.getAllMeals);
router.get('/featured-meal', actions.getFeaturedMeal);
router.get('/chosen-by-chief', actions.getMealsChosenByChief)
router.get('/single-meal', actions.getSingleMeal);
router.get('/cat-meals', actions.getMealsForCategory);
router.get('/check-log', actions.checkIfUserIsLogged);
router.get('/my-orders', middlewares.verifyTokenClients, actions.getMyOrders);
router.get('/lg-name', middlewares.verifyTokenClients, actions.getLoggedInUserName);
router.get('/single-cart', actions.getSingleCart);
router.get('/cart-summary', actions.cartSummary);
router.get('/my-addresses', middlewares.verifyTokenClients, actions.getMyAddresses);
router.get('/my-profile', middlewares.verifyTokenClients, actions.getMyProfile);
router.get('/rest-meals', actions.getRestaurantMeals);
router.get('/search', actions.seachMealsOrRestaurants);
router.get('/logout', middlewares.verifyTokenClients, actions.logout);
router.get('/single-category', actions.getSingleCategory);
router.get('/user-rank', middlewares.verifyTokenClients, actions.userRank);
router.get('/restaurants', actions.getAllRestaurants);
router.get('/reset-password', actions.forgotPassword);
router.get('/single-order', actions.getSingleOrder);
router.get('/order-carrier', actions.getSingleCarrier);
router.get('/rest-meals', actions.getMealsFromSingleRest);
// router.get('/rest-applicatio')

/// post routes ///
router.post('/make-order', actions.makeOrder);
router.post('/add-to-cart', actions.addToCart);
router.post('/register', actions.register);
router.post('/login', actions.login);
router.post('/add-address', middlewares.verifyTokenClients, actions.addNewAddress);
router.post('/rest-apply', actions.restaurantApply);
router.post('/carr-apply', actions.carrierApply);

/// patch routes ///
router.patch('/delete-from-cart', actions.deleteFromCart);
router.patch('/edit-profile', middlewares.verifyTokenClients, actions.editMyProfile);
router.patch('/count-meal-views', actions.countMealViews);
router.patch('/count-category-views', actions.countCategoryViews);
router.patch('/reset-pass', actions.resetPassword);

router.delete('/delete-address', actions.deleteAddress);

module.exports = router;
