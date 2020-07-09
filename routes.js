const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
require('dotenv/config');
const middlewares = require('./middlewares/middlewares')


const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

app.get(express.static(__dirname + "/public"));


/// carrier routes ///
app.get('/carrier/style', function(req, res) {
  res.sendFile(__dirname + "/" + "/public/carrieradmin/css/style.css");
});
app.get('/dropIcon', (req, res) => {
  res.sendFile(__dirname + '/' + '/public/carrieradmin/icons/drop.png');
});
app.get('/fgLogo', (req, res) => {
  res.sendFile(__dirname + '/' + '/public/carrieradmin/images/LogoFG.png');
});
app.get('/fgGuru', (req, res) => {
    res.sendFile(__dirname + '/' + '/public/carrieradmin/icons/fgGuru.png');
})
app.get('/carrier/login-js', (req, res) => {
    res.sendFile(__dirname  + '/public/carrieradmin/js/login.js');
})
app.get('/carrier/index-js', (req, res) => {
    res.sendFile(__dirname  + '/public/carrieradmin/js/index.js');
})
app.get('/carrier/my-order-js', (req, res) => {
    res.sendFile(__dirname  + '/public/carrieradmin/js/my-order.js');
})
app.get('/carrier/my-orders-js', (req, res) => {
    res.sendFile(__dirname  + '/public/carrieradmin/js/my-orders.js');
})
app.get('/carrier/my-revenue-js', (req, res) => {
    res.sendFile(__dirname  + '/public/carrieradmin/js/my-revenue.js');
})
app.get('/carrier/my-competed-orders-js', (req, res) => {
  res.sendFile(__dirname  + '/public/carrieradmin/js/my-completed-orders.js');
})
/// carrier html routes ///
app.get('/carrier', (req, res) => {
  res.sendFile(__dirname + "/public/carrieradmin/login.html");
});
app.get('/carrier/home', middlewares.verifyToken, (req, res) => {
  res.sendFile(__dirname + "/public/carrieradmin/index.html");
});
app.get('/carrier/get-my-orders', middlewares.verifyToken, (req, res) => {
  res.sendFile(__dirname + "/public/carrieradmin/my-orders.html");
});
app.get('/carrier/get-clicked-order-info', middlewares.verifyToken,  (req, res) => {
  res.sendFile(__dirname + "/public/carrieradmin/my-order.html");
});
app.get('/carrier/get-my-revenue', middlewares.verifyToken, (req, res) => {
  res.sendFile(__dirname + "/public/carrieradmin/my-revenue.html");
});
app.get('/carrier/completed-orders', middlewares.verifyToken, (req, res) => {
  res.sendFile(__dirname + "/public/carrieradmin/my-completed-orders.html");
});





/// superadmin style ///
app.get('/superadmin/style', (req, res) => {
  res.sendFile(__dirname + '/public/superadmin/style.css');
})
app.get('/superadmin/iconsCss', (req, res) => {
  res.sendFile(__dirname + '/public/superadmin/icons/icons/css/all.css')
})
/// superadmin style ///

//// icons ////
app.get('/superadmin/icon', (req, res) => {
  res.sendFile(__dirname + '/public/superadmin/icons/icon.svg')
})
app.get('/superadmin/icon/editIcon', (req, res) => {
  res.sendFile(__dirname + '/public/superadmin/icons/edit.png');
})
app.get('/superadmin/icon/binIcon', (req, res) => {
  res.sendFile(__dirname + '/public/superadmin/icons/bin.png');
})
app.get('/superadmin/icon/moreIcon', (req, res) => {
  res.sendFile(__dirname + '/public/superadmin/icons/more.png');
})
app.get('/superadmin/pinIcon', (req, res) => {
  res.sendFile(__dirname + '/public/superadmin/icons/pin.png');
})
app.get('/superadmin/clockIcon', (req, res) => {
  res.sendFile(__dirname + '/public/superadmin/icons/clock.png')
})
app.get('/superadmin/noImgIcon', (req, res) => {
  res.sendFile(__dirname + '/public/superadmin/icons/noimg.png')
})
app.get('/superadmin/phoneIcon', (req, res) => {
  res.sendFile(__dirname + '/public/superadmin/icons/call.png');
})

//// icons ////


/// superadmin js routes //
app.get('/superadmin/add-carrier-js', (req, res) => {
  res.sendFile(__dirname + "/public/superadmin/js/add-carriers.js");
})
app.get('/superadmin/add-category-js', (req, res) => {
  res.sendFile(__dirname + "/public/superadmin/js/add-category.js");
})
app.get('/superadmin/add-meal-js', (req, res) => {
  res.sendFile(__dirname + "/public/superadmin/js/add-meal.js");
})
app.get('/superadmin/add-promo-code-js', (req, res) => {
  res.sendFile(__dirname + "/public/superadmin/js/add-promo-code.js");
})
app.get('/superadmin/add-restaurant-js', (req, res) => {
  res.sendFile(__dirname + "/public/superadmin/js/add-restaurant.js");
})
app.get('/superadmin/delivery-activity-js', (req, res) => {
  res.sendFile(__dirname + "/public/superadmin/js/delivery-activity.js");
})
app.get('/superadmin/edit-carriers-js', (req, res) => {
  res.sendFile(__dirname + "/public/superadmin/js/edit-carriers.js");
});
app.get('/superadmin/edit-category-js', (req, res) => {
  res.sendFile(__dirname + "/public/superadmin/js/edit-category.js");
});
app.get('/superadmin/edit-meal-js', (req, res) => {
  res.sendFile(__dirname + "/public/superadmin/js/edit-meal.js");
});
app.get('/superadmin/edit-restaurant-js', (req, res) => {
  res.sendFile(__dirname + "/public/superadmin/js/edit-restaurant.js");
});
app.get('/superadmin/edit-user-js', (req, res) => {
  res.sendFile(__dirname + "/public/superadmin/js/edit-user.js");
});
app.get('/superadmin/edit-promo-code-js', (req, res) => {
  res.sendFile(__dirname + "/public/superadmin/js/edit-promo-code.js");
});
app.get('/superadmin/index-js', (req, res) => {
  res.sendFile(__dirname + "/public/superadmin/js/index.js");
});
app.get('/superadmin/manage-carriers-js', (req, res) => {
  res.sendFile(__dirname + "/public/superadmin/js/manage-carriers.js");
});
app.get('/superadmin/manage-categories-js', (req, res) => {
  res.sendFile(__dirname + "/public/superadmin/js/manage-categories.js");
});
app.get('/superadmin/manage-meals-js', (req, res) => {
  res.sendFile(__dirname + "/public/superadmin/js/manage-meals.js");
});
app.get('/superadmin/manage-restaurants-js', (req, res) => {
  res.sendFile(__dirname + "/public/superadmin/js/manage-restaurants.js");
});
app.get('/superadmin/manage-users-js', (req, res) => {
  res.sendFile(__dirname + "/public/superadmin/js/manage-users.js");
});
app.get('/superadmin/order-activity-js', (req, res) => {
  res.sendFile(__dirname + "/public/superadmin/js/order-activity.js");
});
app.get('/superadmin/promo-codes-js', (req, res) => {
  res.sendFile(__dirname + "/public/superadmin/js/promo-codes.js");
});
app.get('/superadmin/user-activity-js', (req, res) => {
  res.sendFile(__dirname + "/public/superadmin/js/user-activity.js");
});


// <script src="https://kit.fontawesome.com/8012b4644d.js" crossorigin="anonymous"></script>

////// admin ///////
app.get('/superadmin', (req, res) => {
  res.sendFile(__dirname + "/public/superadmin/login.html");
})
app.get('/superadmin/getMealImage', (req, res) => {
  const imageQuery = req.query.image;
  res.sendFile(__dirname + "/images/meals/" + imageQuery);
})
app.get('/superadmin/getCategoryImage', (req, res) => {
  const imageQuery = req.query.image;
  res.sendFile(__dirname + "/images/categories/" + imageQuery);
})
app.get('/superadmin/getCarrierImage', (req, res) => {
  const imageQuery = req.query.image;
  res.sendFile(__dirname + '/images/carriers/' + imageQuery)
})
app.get('/superadmin/getRestaurantImage', (req, res) => {
  const imageQuery = req.query.image;
  res.sendFile(__dirname + '/images/restaurants/' + imageQuery)
})
app.get('/superadmin/add-carrier', middlewares.verifyTokenAdmin, (req, res) => {
  res.sendFile(__dirname + "/public/superadmin/add-carriers.html")
});
app.get('/superadmin/add-category', middlewares.verifyTokenAdmin,(req, res) => {
  res.sendFile(__dirname + "/public/superadmin/add-category.html");
})
app.get('/superadmin/add-meal', middlewares.verifyTokenAdmin,(req, res) => {
  res.sendFile(__dirname + "/public/superadmin/add-meal.html");
})
app.get('/superadmin/add-promo-code', middlewares.verifyTokenAdmin,(req, res) => {
  res.sendFile(__dirname + "/public/superadmin/add-promo-code.html");
})
app.get('/superadmin/add-restaurant', middlewares.verifyTokenAdmin,(req, res) => {
  res.sendFile(__dirname + "/public/superadmin/add-restaurant.html");
})
app.get('/superadmin/delivery-activity', middlewares.verifyTokenAdmin,(req, res) => {
  res.sendFile(__dirname + "/public/superadmin/delivery-activity.html");
})
app.get('/superadmin/edit-carrier', middlewares.verifyTokenAdmin,(req, res) => {
  res.sendFile(__dirname + "/public/superadmin/edit-carriers.html");
})
app.get('/superadmin/edit-category', middlewares.verifyTokenAdmin,(req, res) => {
  res.sendFile(__dirname + "/public/superadmin/edit-category.html");
})
app.get('/superadmin/edit-meal', middlewares.verifyTokenAdmin,(req, res) => {
  res.sendFile(__dirname + "/public/superadmin/edit-meal.html");
})
app.get('/superadmin/edit-promo-code', middlewares.verifyTokenAdmin,(req, res) => {
  res.sendFile(__dirname + "/public/superadmin/edit-promo-code.html");
})
app.get('/superadmin/edit-restaurant', middlewares.verifyTokenAdmin,(req, res) => {
  res.sendFile(__dirname + "/public/superadmin/edit-restaurant.html");
})
app.get('/superadmin/edit-user', middlewares.verifyTokenAdmin,(req, res) => {
  res.sendFile(__dirname + "/public/superadmin/edit-user.html");
})
app.get('/superadmin/dashboard', middlewares.verifyTokenAdmin,(req, res) => {
  res.sendFile(__dirname + "/public/superadmin/index.html");
})
app.get('/superadmin/manage-carriers', middlewares.verifyTokenAdmin,(req, res) => {
  res.sendFile(__dirname + "/public/superadmin/manage-carriers.html");
})
app.get('/superadmin/manage-categories', middlewares.verifyTokenAdmin,(req, res) => {
  res.sendFile(__dirname + "/public/superadmin/manage-categories.html");
})
app.get('/superadmin/manage-meals', middlewares.verifyTokenAdmin,(req, res) => {
  res.sendFile(__dirname + "/public/superadmin/manage-meals.html");
})
app.get('/superadmin/manage-restaurants', middlewares.verifyTokenAdmin,(req, res) => {
  res.sendFile(__dirname + "/public/superadmin/manage-restaurants.html");
})
app.get('/superadmin/manage-users', middlewares.verifyTokenAdmin,(req, res) => {
  res.sendFile(__dirname + "/public/superadmin/manage-users.html");
})
app.get('/superadmin/order-activity', middlewares.verifyTokenAdmin,(req, res) => {
  res.sendFile(__dirname + "/public/superadmin/order-activity.html");
})
app.get('/superadmin/promo-codes', middlewares.verifyTokenAdmin,(req, res) => {
  res.sendFile(__dirname + "/public/superadmin/promo-codes.html");
})
app.get('/superadmin/user-activity', middlewares.verifyTokenAdmin,(req, res) => {
  res.sendFile(__dirname + "/public/superadmin/users-activity.html");
})
app.get('/superadmin/applications', middlewares.verifyTokenAdmin,(req, res) => {
  res.sendFile(__dirname + "/public/superadmin/applications.html");
})

///////// desktop /////////////
//// desktop style ///
app.get('/desktop/style', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/css/style.css")
})
app.get('/desktop/circle-style', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/css/circle.css")
})
app.get('/desktop/full-logo', (req, res) => {
  res.sendFile(__dirname + '/public/desktopadmin/images/LogoFG.png');
})
app.get('/desktop/mascot', (req, res) => {
  res.sendFile(__dirname + '/public/desktopadmin/images/mascot.png');
})
app.get('/desktop/fitness-mascot', (req, res) => {
  res.sendFile(__dirname + '/public/desktopadmin/images/fitness-mascot.png');
})
app.get('/desktop/logo', (req, res) => {
  res.sendFile(__dirname + '/public/desktopadmin/images/foodguru-logo.png');
})
app.get('/desktop/fitness-logo', (req, res) => {
  res.sendFile(__dirname + '/public/desktopadmin/images/fitness-logo.png');
})
app.get('/desktop/cart-icon', (req, res) => {
  res.sendFile(__dirname + '/public/desktopadmin/icons/supermarket.png');
})
app.get('/desktop/like-icon', (req, res) => {
  res.sendFile(__dirname + '/public/desktopadmin/images/like.svg');
})
app.get('/desktop/clock-icon', (req, res) => {
  res.sendFile(__dirname + '/public/desktopadmin/images/clock.svg');
})
app.get('/desktop/scooter-icon', (req, res) => {
  res.sendFile(__dirname + '/public/desktopadmin/images/scooter.svg');
})
app.get('/destop/shopping-bag-icon', (req, res) => {
  res.sendFile(__dirname + '/public/desktopadmin/icons/shopping-bag.png');
})
app.get('/destop/cat-icon', (req, res) => {
  res.sendFile(__dirname + '/public/desktopadmin/icons/cat_sample.png')
})
app.get('/desktop/full-star-icon', (req, res) => {
  res.sendFile(__dirname + '/public/desktopadmin/icons/full_star.png')
})
app.get('/desktop/star-icon', (req, res) => {
  res.sendFile(__dirname + '/public/desktopadmin/icons/star.png')
})
app.get('/desktop/add-to-cart-icon', (req, res) => {
  res.sendFile(__dirname + '/public/desktopadmin/icons/add-to-cart.png');
})
app.get('/desktop/beef-icon', (req, res) => {
  res.sendFile(__dirname + '/public/desktopadmin/images/beef.jpg');
})
app.get('/desktop/delete-icon', (req, res) => {
  res.sendFile(__dirname + '/public/desktopadmin/icons/delete.png');
})
app.get('/desktop/waiting-guru', (req, res) => {
  res.sendFile(__dirname + '/public/desktopadmin/images/waiting-guru.png');
})
app.get('/desktop/burger', (req, res) => {
  res.sendFile(__dirname + '/public/desktopadmin/icons/burger.png');
})
app.get('/desktop/hamb', (req, res) => {
  res.sendFile(__dirname + '/public/desktopadmin/icons/drop.png');
})
app.get('/desktop/down-arrow', (req, res) => {
  res.sendFile(__dirname + '/public/desktopadmin/icons/down-arrow1.png');
})
app.get('/desktop/search-icon', (req, res) => {
  res.sendFile(__dirname + '/public/desktopadmin/icons/search.svg');
})
app.get('/desktop/cubes-icon', (req, res) => {
  res.sendFile(__dirname + '/public/desktopadmin/icons/menu.svg');
})
app.get('/desktop/pin-icon', (req, res) => {
  res.sendFile(__dirname + '/public/desktopadmin/icons/pin.svg');
})
app.get('/desktop/login-icon', (req, res) => {
  res.sendFile(__dirname + '/public/desktopadmin/icons/login.svg');
})
app.get('/desktop/save-icon', (req, res) => {
  res.sendFile(__dirname + '/public/desktopadmin/icons/save.svg');
})
app.get('/desktop/plus-icon', (req, res) => {
  res.sendFile(__dirname + '/public/desktopadmin/icons/more.svg');
})
app.get('/desktop/expand-icon', (req, res) => {
  res.sendFile(__dirname + '/public/desktopadmin/icons/expand.png');
})
app.get('/desktopadmin/shutdown', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/images/shutdown.png");
});
app.get('/desktopadmin/user-icon', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/icons/user.svg");
});
app.get('/desktopadmin/bag-icon', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/icons/bag.svg");
});
app.get('/desktopadmin/logout', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/icons/switch.svg");
});
app.get('/desktopadmin/hamburger', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/icons/hamb.png");
});
app.get('/desktop/user-icon', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/icons/user.svg");
})
app.get('/desktop/explorer-guru', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/images/explorer-guru.png");
})
app.get('/desktop/chef-guru', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/images/chefguru.png");
})
app.get('/desktop/master-guru', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/images/masterguru.png");
})
app.get('/desktopadmin/header', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/images/header.png");
});
app.get('/desktopadmin/wave-guru', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/images/wave-guru.png");
});
app.get('/desktopadmin/icon1', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/images/icon1.png");
});
app.get('/desktopadmin/icon2', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/images/icon-2.png");
});
app.get('/desktopadmin/icon3', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/images/icon-3.png");
});
app.get('/desktopadmin/icon4', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/images/icon-4.png");
});
app.get('/desktopadmin/icon5', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/images/icon-5.png");
});
app.get('/desktopadmin/icon6', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/images/icon-6.png");
});
app.get('/desktopadmin/guru-black-wave', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/images/guru-black-wave.png");
});
app.get('/desktopadmin/footer-rest', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/images/footer-rest.png");
});
app.get('/desktopadmin/header-delivery', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/images/header-delivery.png");
});
app.get('/desktopadmin/icon1-delivery', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/images/icon_1_delivery.png");
});
app.get('/desktopadmin/icon2-delivery', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/images/icon_2_delivery.png");
});
app.get('/desktopadmin/icon3-delivery', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/images/icon_3_delivery.png");
});
app.get('/desktopadmin/icon4-delivery', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/images/icon_4_delivery.png");
});
app.get('/desktopadmin/white-wave', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/images/guru-white-wave.png");
});
app.get('/desktopadmin/car-icon', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/images/car-icon.png");
});
app.get('/desktopadmin/vespa-icon', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/images/vespa-icon.png");
});
app.get('/desktopadmin/bike-icon', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/images/bike-icon.png");
});
app.get('/desktopadmin/black1', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/images/wave-guru-black1.png");
});
/// desktop js ///
app.get('/desktopadmin/index', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/js/index.js");
});
//Restaurant static JS Routes
app.get('/restaurants/active-meals-js', (req, res) => {
  res.sendFile(__dirname + "/public/restaurantadmin/js/active-meals.js");
});
app.get('/restaurants/index-js', (req, res) => {
  res.sendFile(__dirname + "/public/restaurantadmin/js/index.js");
});
app.get('/restaurants/login-js', (req, res) => {
  res.sendFile(__dirname + "/public/restaurantadmin/js/login.js");
});
app.get('/restaurants/my-profile-js', (req, res) => {
  res.sendFile(__dirname + "/public/restaurantadmin/js/my-profile.js");
});
app.get('/restaurants/my-revenue-js', (req, res) => {
  res.sendFile(__dirname + "/public/restaurantadmin/js/my-revenue.js");
});
app.get('/restaurants/order-activity-js', (req, res) => {
  res.sendFile(__dirname + "/public/restaurantadmin/js/order-activity.js");
});
app.get('/restaurants/support-tickets-js', (req, res) => {
  res.sendFile(__dirname + "/public/restaurantadmin/js/support-tickets.js");
});
//Notification sound route
app.get('/restaurants/notification', (req, res) => {
  res.sendFile(__dirname + "/public/restaurantadmin/js/notification.mp3");
});
//Notification sound route
app.get('/restaurants/notification', (req, res) => {
  res.sendFile(__dirname + "/public/restaurantadmin/js/notification.mp3");
});
app.get('/desktopadmin/meal-js', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/js/meal.js");
});
app.get('/desktopadmin/cat-js', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/js/category.js");
});
app.get('/desktopadmin/my-cart-js', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/js/my-cart.js");
});
app.get('/desktopadmin/in-progress-js', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/js/in-progress.js");
});
app.get('/desktopadmin/register-js', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/js/register.js");
});
app.get('/desktopadmin/address-js', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/js/address.js");
});
app.get('/desktopadmin/dashboard-js', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/js/dashboard.js");
});
app.get('/desktopadmin/orders-js', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/js/orders.js");
});
app.get('/desktopadmin/profile-js', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/js/profile.js");
});
app.get('/desktopadmin/favicon', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/images/favicon.ico");
});
app.get('/desktopadmin/user-manual-js', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/images/user-manual.js");
});
app.get('/desktopadmin/manifesto-js', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/images/manifesto.js");
});
app.get('/desktopadmin/faq-js', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/images/faq.js");
});
app.get('/desktopadmin/guru-privacy-js', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/images/guru-privacy.js");
});
app.get('/desktopadmin/general-conditions-js', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/images/general-conditions.js");
});
app.get('/desktopadmin/reset-pass-js', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/js/reset-pass.js");
});
app.get('/desktopadmin/restaurants-js', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/js/restaurants.js");
});
/// js files ///


/// clients ///
/// front pages /// 
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/index.html");
})
app.get('/category', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/category.html");
})
app.get('/in-progress', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/in-progress.html");
})
app.get('/meal', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/meal.html");
})
app.get('/my-cart', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/my-cart.html");
})
app.get('/register', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/register.html");
})
app.get('/privecy-policy', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/privacy-policy.html");
})
app.get('/dashboard', middlewares.verifyTokenClients, (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/dashboard.html");
})
app.get('/orders', middlewares.verifyTokenClients, (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/orders.html");
})
app.get('/address', middlewares.verifyTokenClients, (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/address.html");
})
app.get('/profile', middlewares.verifyTokenClients, (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/profile.html");
})
app.get('/career-apply', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/career-apply.html");
});
app.get('/partner-restaurant', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/partner-restaurant.html");
});
app.get('/restaurant-apply', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/restaurant-apply.html");
});
app.get('/guru-carrier', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/guru-carrier.html");
});
app.get('/delivery-apply', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/delivery-apply.html");
});
app.get('/user-manual', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/user-manual.html");
});
app.get('/manifesto', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/manifesto.html");
});
app.get('/faq', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/faq.html");
});
app.get('/guru-privacy', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/guru-privacy.html");
});
app.get('/general-conditions', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/general-conditions.html");
});
app.get('/forgot-password', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/forgot-pass.html");
});
app.get('/reset-password', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/reset-pass.html");
});
app.get('/order-status', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/order-status.html");
});
app.get('/restaurants', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/restaurants.html");
});
app.get('/restaurant-meals', (req, res) => {
  res.sendFile(__dirname + "/public/desktopadmin/restaurant-meals.html");
});

/// client side ends here ///


/// restaurants ///
/// style ///
app.get('/restaurants/rest-style', (req, res) => {
  res.sendFile(__dirname + '/public/restaurantadmin/css/style.css');
})
app.get('/restaurants/rest-circle-style', (req, res) => {
  res.sendFile(__dirname + '/public/restaurantadmin/css/circle.css');
})
app.get('/restaurants/all-css', (req, res) => {
  res.sendFile(__dirname + '/public/restaurantadmin/icons/css/all.css');
})
app.get('/restaurants/rest-logo', (req, res) => {
  const imageQuery = req.query.image;
  res.sendFile(__dirname + '/images/restaurants/' + imageQuery);
})
/// front pages ///
/// front pages ///
app.get('/restaurant', (req, res) => {
  res.sendFile(__dirname + '/public/restaurantadmin/login.html');
})
app.get('/restaurants/dashboard', (req, res) => {
  res.sendFile(__dirname + '/public/restaurantadmin/index.html');
})
app.get('/restaurants/my-profile', (req, res) => {
  res.sendFile(__dirname + '/public/restaurantadmin/my-profile.html');
})
app.get('/restaurants/my-revenue', (req, res) => {
  res.sendFile(__dirname + '/public/restaurantadmin/my-revenue.html');
})
app.get('/restaurants/orders', (req, res) => {
  res.sendFile(__dirname + '/public/restaurantadmin/order-activity.html');
})
app.get('/restaurants/support', (req, res) => {
  res.sendFile(__dirname + '/public/restaurantadmin/support-tickets.html');
})
app.get('/restaurants/meals', (req, res) => {
  res.sendFile(__dirname + '/public/restaurantadmin/active-meals.html');
})
app.get('/restaurants/order-activity-js', (req, res) => {
  res.sendFile(__dirname + "/public/restaurantadmin/js/order-activity.js");
});
//Restaurant static JS Routes
app.get('/restaurants/active-meals-js', (req, res) => {
  res.sendFile(__dirname + "/public/restaurantadmin/js/active-meals.js");
});
app.get('/restaurants/index-js', (req, res) => {
  res.sendFile(__dirname + "/public/restaurantadmin/js/index.js");
});
app.get('/restaurants/login-js', (req, res) => {
  res.sendFile(__dirname + "/public/restaurantadmin/js/login.js");
});
app.get('/restaurants/my-profile-js', (req, res) => {
  res.sendFile(__dirname + "/public/restaurantadmin/js/my-profile.js");
});
app.get('/restaurants/my-revenue-js', (req, res) => {
  res.sendFile(__dirname + "/public/restaurantadmin/js/my-revenue.js");
});
app.get('/restaurants/order-activity-js', (req, res) => {
  res.sendFile(__dirname + "/public/restaurantadmin/js/order-activity.js");
});
app.get('/restaurants/support-tickets-js', (req, res) => {
  res.sendFile(__dirname + "/public/restaurantadmin/js/support-tickets.js");
});
//Notification sound route
app.get('/restaurants/notification', (req, res) => {
  res.sendFile(__dirname + "/public/restaurantadmin/js/notification.mp3");
});


module.exports = app;