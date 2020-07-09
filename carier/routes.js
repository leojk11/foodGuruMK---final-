const express = require('express');
const actions = require('./act');
const middlewares = require('../middlewares/middlewares');

const router = express.Router();

router.get('/live-orders', middlewares.verifyToken, actions.getAllLiveOrders);
router.get('/single-order', middlewares.verifyToken, actions.getSingleOrderInfo);
router.get('/loggedInUserName', middlewares.verifyToken, actions.getLoggedInCarrierName);
router.get('/my-revenue', middlewares.verifyToken, actions.getMyRevenue);
router.get('/my-today-revenue', middlewares.verifyToken, actions.getMyTodayRevenue);
router.get('/this-week-revenue', middlewares.verifyToken, actions.getMyThisWeekRevenue);
router.get('/this-month-revenue', middlewares.verifyToken, middlewares.verifyToken, actions.getMyThisMonthRevenue);
router.get('/my-orders', middlewares.verifyToken, actions.getMyOrders);
router.get('/my-today-orders', middlewares.verifyToken, actions.getMyTodayOrders);
router.get('/my-active-orders', middlewares.verifyToken, actions.getAllMyActiveOrders);
router.get('/my-completed-orders', middlewares.verifyToken, actions.getMyCompletedOrders);
router.get('/logout', actions.logout);

router.post('/login', actions.carierLogin);
router.post('/save-order', middlewares.verifyToken, actions.saveOrderToCarrierHistory);

router.patch('/password-reset', middlewares.verifyToken, actions.carierResetPassword);
router.patch('/accept-order', middlewares.verifyToken, actions.acceptOrder);
router.patch('/pickup-order', middlewares.verifyToken, actions.pickupOrder);
router.patch('/cancel-order', middlewares.verifyToken, actions.cancelOrder);
router.patch('/deliver-order', middlewares.verifyToken, actions.deliveredOrder);
router.patch('/change-status', middlewares.verifyToken, actions.changeStatusToBusy);


module.exports = router;