const express = require('express');
const actions = require('./act');
const middlewares = require('../middlewares/middlewares');

const router = express.Router();

router.get('/revenue', actions.getOverallRevenue);
router.get('/today-revenue', actions.getTodaysReveue);
router.get('/month-revenue', actions.getThisMonthRevenue);
router.get('/users', actions.getAllUsers);
router.get('/single-user', actions.getSingleUser);
router.get('/today-users', actions.getOnlyTodaysUsers);
router.get('/restaurants', actions.getAllRestaurants);
router.get('/single-restaurant', actions.getSingleRestaurant);
router.get('/search-restaurant', actions.searchRestaurant);
router.get('/cariers', actions.getAllCariers);
router.get('/online-carriers', actions.getAllOnlineCariers);
router.get('/busy-carriers', actions.getAllBusyCariers);
router.get('/single-carier', actions.getSingleCarier);
router.get('/promotions', actions.getAllPromotions);
router.get('/meals', actions.getAllMeals);
router.get('/single-promotion', actions.getSinglePromotion);
router.get('/single-promotion-type', actions.getSinglePromotionByType);
router.get('/single-meal', actions.getSinleMealByName);
router.get('/orders', actions.getAllOrders);
router.get('/pending-orders', actions.getAllPendingOrders);
router.get('/single-order', actions.getSingleOrder);
router.get('/today-orders', actions.getOnlyTodaysOrders);
router.get('/live-orders', actions.getAllLiveOrders);
router.get('/food-categories', actions.getAllCategories); 
router.get('/single-food-category', actions.getSingleCategory);
router.get('/search-carriers', actions.searchCarriers);
router.get('/search-meals', actions.searchMeals);
router.get('/search-restaurants', actions.searchRestaurants);
router.get('/all-orders-numb', actions.getAllOrdersNumber);
router.get('/carrier-revenue', actions.getsingleCarrierRevenue);
router.get('/carrier-daily-revenue', actions.getSingleCarrierDailyRevenue);
router.get('/search-users', actions.searchUsers);
router.get('/rest-applications', actions.getAllRestApplications);
router.get('/carr-applications', actions.getAllCarrApplications);
router.get('/applications', actions.getAllApplications);


router.post('/login', actions.adminLogin);
router.post('/new-restaurant', actions.addNewRestaurant);
router.post('/new-carier', actions.addNewCarier);
router.post('/new-meal', actions.addNewMeal);
router.post('/new-promo', actions.addNewPromotion);
router.post('/new-category', actions.addNewCategory);

router.put('/edit-restaurant', actions.editRestaurant);
router.put('/edit-carier', actions.editCarier);
router.put('/edit-meal', actions.editMeal);
router.put('/edit-order', actions.editOrder);
router.put('/edit-promo', actions.editPromoCode);
router.put('/edit-category', actions.editCategory);

router.patch('/change-rest-status', actions.changeRestOnlineStatus);

router.delete('/delete-promotion', actions.deletePromotion);
router.delete('/delete-restaurant', actions.removeRestaurant);
router.delete('/delete-meal', actions.deleteMeal);
router.delete('/delete-carrier', actions.deleteCarrier);
router.delete('/delete-cat', actions.deleteCategory);
router.delete('/delete-order', actions.deleteOrder);
router.delete('/delete-app', actions.deleteApplication);

module.exports = router;
