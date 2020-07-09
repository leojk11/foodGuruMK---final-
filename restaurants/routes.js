const express = require('express');
const actions = require('./act');
const middlewares = require('../middlewares/middlewares');

const router = express.Router();

router.get('/orders', middlewares.verifyToken, actions.getSingleRestaurantOrders);
router.get('/active-orders', middlewares.verifyToken, actions.getSingleRestaurantActiveOrders);
router.get('/orders-details', middlewares.verifyToken, actions.getSingleRestaurantOrdersAndDetails);
router.get('/revenue', middlewares.verifyToken, actions.getRestaurantRevenue);
router.get('/today-revenue', middlewares.verifyToken, actions.getRestaurantTodaysRevenue);
router.post('/login', actions.loginRestaurant);
router.patch('/reset-password', middlewares.verifyToken, actions.resetPassword);
// router.patch('/send-order', middlewares.verifyToken, actions.sendOrder);


/// new ///
router.get('/my-profile', middlewares.verifyTokenRestaurant, actions.getMyProfileInfo);
router.get('/my-all-time-revenue', middlewares.verifyTokenRestaurant, actions.getMyAllTimeRevenue);
router.get('/my-today-revenue',middlewares.verifyTokenRestaurant, actions.getMyTodayRevenue)
router.get('/my-orders', middlewares.verifyTokenRestaurant, actions.getMyOrders);
router.get('/my-last-order', middlewares.verifyTokenRestaurant, actions.getMyLastOrder);
router.get('/my-meals', middlewares.verifyTokenRestaurant, actions.getMyMeals);
router.get('/my-today-orders', middlewares.verifyTokenRestaurant, actions.getMyTodayOrders);
router.get('/my-all-time-orders', middlewares.verifyTokenRestaurant, actions.getMyAllTimeOrders);
router.get('/my-pending-orders', middlewares.verifyTokenRestaurant, actions.getMyPendingOrders);
router.get('/my-work-days', middlewares.verifyTokenRestaurant, actions.getMyWorkingDays);
router.get('/my-active-meals', middlewares.verifyTokenRestaurant, actions.getNumberOfActiveMeals);
router.get('/my-paused-meals', middlewares.verifyTokenRestaurant, actions.getNumberOfPausedMeals);
router.get('/my-searched-meals', middlewares.verifyTokenRestaurant, actions.getSearchedMeals);
router.get('/my-filtered-revenue', middlewares.verifyTokenRestaurant, actions.getFilteredRevenueByDate);
router.get('/my-two-week-revenue', middlewares.verifyTokenRestaurant, actions.getMyTwoWeekRevenue);

router.put('/edit-restaurant-info', middlewares.verifyTokenRestaurant, actions.editRestaurantInfo);
router.put('/edit-restaurant-workdays', middlewares.verifyTokenRestaurant, actions.editRestaurantWorkDays);
router.put('/edit-meal-status', middlewares.verifyTokenRestaurant, actions.editMealStatus);

router.patch('/accept-order', middlewares.verifyTokenRestaurant, actions.acceptOrder);
router.patch('/complete-order', middlewares.verifyTokenRestaurant, actions.completeOrder);


module.exports = router;
