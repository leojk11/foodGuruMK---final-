const queries = require('./query');
const adminQueries = require('../admin/query');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
require('dotenv/config');
const helper = require('../helper/helper');
const con = require('../DB/database');
const nodemailer = require('nodemailer');


/// GET ///

// user registration
register = async(req, res) => {
    // entered info by user
    const userInfo = {
        name: req.body.firstname,
        lastname: req.body.lastname,
        // username: req.body.username,
        email: req.body.email,
        telNumber: req.body.phNumber,
        adress: req.body.adress,
        password: req.body.password,
        repeatPassword: req.body.repeatPassword,

        status: 'test',
        ordersCompleted: 0,
        rank: 'None'
    };
    // console.log(userInfo);

    // check if entered username exist
    const usernames = await queries.getAllUsernamesQuery();
    const usernameExists = usernames.some(user => {
        return userInfo.username == user.Username
    });

    // check if entered email exist
    const emails = await queries.getAllEmailsQuery();
    const emailExists = emails.some(user => {
        return userInfo.email == user.Email
    });

    // check if all fields are filled with info
    if(userInfo.name == '' || userInfo.lastname == '' || userInfo.username == '' || userInfo.email == '' || userInfo.password == '' || userInfo.phoneNumber == '') {
        res.status(404);
        res.json({ message: 'Внеси ги сите информации.' });
    } else if (emailExists == true) { // check if email exist
        res.status(404);
        res.json({ message: `Корисник со е-маил ${userInfo.email}, веќе постои.` });
    } else if (helper.emailRegex.test(userInfo.email) == false) { // check if username is valid with regex
        res.status(400);
        res.json({ message: `Е-маил адресата ${userInfo.email}, не е валидна.` });
    } else if (helper.mediumRegex.test(userInfo.password) == false) { // check if entered password is valid with regex
        res.status(422);
        res.json({ message: 'Лозинката мора да се состои од 6 карактери, една голема буква и една бројка.' });
    } else {
        try {
            // hashing user password for db
            const passHash = bcrypt.hashSync(userInfo.password, 10);
            await queries.registerQuery(userInfo, passHash); // sending user info to db
            res.status(200);
            res.json({ message: 'Твојата регистрација е успешна.' });
        } catch (error) {
            const errorMsg = error.message;
            res.status(500);
            res.json({ message: errorMsg });
        };
    };
};

// user login
login = async(req, res) => {
    // entered login info
    const username = req.body.username;
    const password = req.body.password;

    // check if username exists
    const usernames = await queries.getAllEmailsQuery();
    const usernameExists = usernames.some(user => {
        return username == user.Email
    });


    if(username == '' || password == '') { // check if username and password are entereds
        res.status(404);
        res.json({
            message: 'Enter your username and password.'
        });
    } else if (usernameExists == false) { // check if username exists
        res.status(404);
        res.json({
            message: `User with username ${username}, does not exist.`
        });
    } else {
        try {
            const user = await queries.loginQuery(username);
            const userPass = user[0].Password;
            const userId = user[0].ID;
            // const matchPassword = bcrypt.compareSync(password, userPass);
            const matchPassword = user.some(user => {
                return password == user.Password
            })

            if(matchPassword) {
                const payload = {
                    userId: userId
                };

                const token = jwt.sign(payload, process.env.SECRET);
                // console.log(token.username);
                res.cookie('cliAct', token, {
                    maxAge: 365 * 24 * 60 * 60 * 1000,
                    value: token
                    // httpOnly: true
                });
                res.cookie('user_id', userId, {
                    maxAge: 365 * 24 * 60 * 60 * 1000,
                    value: userId
                });

                res.status(200);
                res.json({
                    message: 'logged in',
                    userId
                    // token
                });
            } else {
                res.status(400);
                res.json({
                    message: 'Password that you have entered is incorrect.'
                });
            }
        } catch (error) {
            const errorMsg = error.message;
            res.status(500);
            res.json({
                message: errorMsg
            });
        };
    };
};
logout = async(req, res) => {
    try {
        // res.cookies.set('cliAct', {expires: Date.now()});
        res.clearCookie('cliAct');
        res.clearCookie('user_id');
        res.status(200).json({ message: 'logged out' });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ message: errorMsg });
    }
}
checkIfUserIsLogged = async(req, res) => {
    const cookies = req.cookies.cliAct;
    // console.log(cookies)

    if(cookies == undefined){
        res.status(200).json({ message: 'user logged' });

    } else {
        try {
            res.status(200).json({ mess: 'logged' });
        } catch(error){
            const errorMsg = error.message;
            res.status(500).json({ message: errorMsg });
        }
    };
};
getLoggedInUserName = async(req, res) => {
    const loggedInUser = req.username.userId;


    const singleUser = await queries.getSingleUserQuery(loggedInUser);
    const singleUserName = singleUser[0].Firstname;
    // console.log(singleUserName);

    try {
        res.status(200).json({ singleUserName });
    } catch(error){
        const errorMsg = error.message;
        res.status(500).json({ message: errorMsg });
    }
}

addToCart = async(req, res) => {
    const mealId = req.query.mealId;
    const sessionId = req.sessionID;
    const amount = req.body.amount;
    const exIngr = req.body.excludedIngr;

    const mealInfo = await queries.getSingleMealQuery(mealId);
    const mealPrice = mealInfo[0].Price;
    const mealName = mealInfo[0].Name;
    const restId = mealInfo[0].Restaurant_id;

    const restInfo = await queries.getSingleRestaurantQuery(restId);
    const restName = restInfo[0].Name;

    const totalPrice = amount * mealPrice;

    const orderInfo = {
        mealId: mealId,
        sessionId: sessionId,
        price: totalPrice,
        amount: amount,
        restaurantName: restId,
        exIngridients: exIngr,
        status: 'In cart',
        mealName: mealName,
        restName: restName
    };

    // if there is logged in user get his id and put it in orderInfo obj
    const userId = req.cookies.user_id;
    // console.log(userId);
    if(userId !== undefined){
        orderInfo.userId = userId
    }

    try {
        const addedToCart = await queries.addToCartQuery(orderInfo);
        res.status(200).json({ message: 'added' });
    } catch(error){
        // console.log(error);
        const errorMsg = error.message;
        res.status(500);
        res.json({ errorMsg });
    }
}
cartSummary = async(req, res) => {
    const sessionId = req.sessionID;
    const status = 'In cart';

    try {
        const singleCart = await queries.getSingleCartItemQuery(status, sessionId);

        let array = [];
        let cartSummary;
        const deliveryPrice = 50;

        if(singleCart.length < 1){
            cartSummary = 0;
        }

        for(var i = 0; i < singleCart.length; i++) {
            const price = singleCart[i].total_price;
            const reducer = (accumulator, currentValue) => accumulator + currentValue;

            array.push(price);
            cartSummary = array.reduce(reducer);
        };
        console.log(cartSummary)

        const finalPrice = cartSummary + deliveryPrice;
        // console.log(finalPrice);

        res.status(200).json({ finalPrice })
    } catch(error){
        const errorMsg = error.messsage;
        res.status(500).json({ errorMsg });
    }
}
deleteFromCart = async(req, res) => {
    const sessionId = req.sessionID;
    const cartItemId = req.query.cartItemId;

    try {
        await queries.deleteFromCartQuery(cartItemId);
        res.status(200).json({ message: 'meal deleted' });
    } catch(error){
        const errorMsg = error.message;
        res.status(500).json({ errorMsg });
    }
}
getSingleCart = async(req, res) => {
    const sessionId = req.sessionID;
    const status = 'In cart';

    try {
        const singleCart = await queries.getSingleCartItemQuery(status, sessionId);
        
        let array = [];
        let finalRevenue;

        if(singleCart.length < 1){
            finalRevenue = 0;
        }

        for(var i = 0; i < singleCart.length; i++) {
            const price = singleCart[i].total_price;
            const reducer = (accumulator, currentValue) => accumulator + currentValue;

            array.push(price);
            finalRevenue = array.reduce(reducer);
        };

        res.status(200).json({ singleCart });
    } catch(error){
        const errorMsg = error.message;
        res.status(500).json({ errorMsg });
    }
}
makeOrder = async(req, res) => {
    const sessionId = req.sessionID;

    const orderInfo = req.body;
    // console.log(orderInfo);

    if(req.body.clientFullNameVal == '' || req.body.clientPhoneNumbVal == '' || req.body.clientLivingAdressVal == ''){
        res.status(400).json({ message: 'Please enter all fields.' })
    }

    const status = 'In cart';
    const singleCart = await queries.getSingleCartItemQuery(status, sessionId);
    // console.log(singleCart);

    // if(singleCart.length == 0){
        const cartMealsArray = [];
        for(var i = 0; i < singleCart.length; i++){
            const singleCartMeals = singleCart[i].meal_name;
            const singleCartMealsAmount = singleCart[i].meal_amount;
            cartMealsArray.push(singleCartMealsAmount + 'x' + singleCartMeals);
        }
        const cartItemsId = cartMealsArray.toString();
        // console.log(cartItemsId);
    
    
        let array = [];
        let totalPrice;
    
        if(singleCart.length < 1){
            totalPrice = 0;
        }
    
        for(var i = 0; i < singleCart.length; i++) {
            const price = singleCart[i].total_price;
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
    
            array.push(price);
            totalPrice = array.reduce(reducer);
        };
    
    
        const orderInfoObj = {
            clientName: req.body.clientFullNameVal,
            clientPhoneNumb: req.body.clientPhoneNumbVal,
            clientAdress: req.body.clientLivingAdressVal,
            meals: cartItemsId,
            specReq: 'None',
            sessionId: sessionId,
            orderStatus: 'Waiting restaurant confirmation',
            totalPrice: totalPrice,
            paymentMethod: 'Pay on delivery',
            promotion: 0
        };
    
        // console.log(orderInfoObj)
    
    
        const userId = req.cookies.user_id;
        // console.log(userId);
        if(userId !== undefined){
            orderInfoObj.userId = userId
    
            const userProfile = await queries.getSingleUserQuery(userId);
            const userFirstname = userProfile[0].Firstname;
            const userLastname = userProfile[0].Lastname;
            const userPhoneNumber = userProfile[0].Phone_number;
    
            const userFullname = userFirstname + ' ' + userLastname;
    
            orderInfoObj.clientName = userFullname;
            orderInfoObj.clientPhoneNumb = userPhoneNumber;
            orderInfoObj.clientAdress = req.body.chosenAddress;

            countUserOrdersQuery = (userId) => {
                const query = 'UPDATE clients SET Completed_orders = Completed_orders + 1 WHERE ID = ?';
                return new Promise((res, rej) => {
                    con.query(query, [userId], (error, results, fields) => {
                        if(error){
                            rej(error)
                        } else {
                            res(results)
                        }
                    })
                })
            }

            await countUserOrdersQuery(userId);

            getSingleUserQuery = (userId) => {
                const query = 'SELECT * FROM clients WHERE ID = ?';
                return new Promise((res, rej) => {
                    con.query(query, [userId], (error, results, fields) => {
                        if(error){
                            rej(error)
                        } else {
                            res(results)
                        }
                    })
                })
            }

            const singleUser = await getSingleUserQuery(userId);
            const userOrders = singleUser[0].Completed_orders;

            updateUserRankQuery = (rank, userId) => {
                const query = 'UPDATE clients SET Rank = ? WHERE ID = ?';
                return new Promise((res, rej) => {
                    con.query(query, [rank, userId], (error, results, fields) => {
                        if(error){
                            rej(error)
                        } else {
                            res(results)
                        }
                    })
                })
            }

            if(userOrders == 1){
                const rank = 'Explorer';
                await updateUserRankQuery(rank, userId);
            } else if (userOrders > 5 && userOrders == 6){
                const rank = 'Chef guru';
                await updateUserRankQuery(rank, userId);
            } else if (userOrders > 20){
                const rank = 'Master guru';
                await updateUserRankQuery(rank, userId);
            }

        }
    
        try {
            // update status in add_to_cart
            const status = 'Ordered';
            const orderToken = randomstring.generate();
            await queries.udateOrderStatusOnCartItemsQuery(status, orderToken, sessionId);
    
            // insert order into orders table
            await queries.makeOrderQuery(orderInfoObj, orderToken);
    
            getThisOrderIdQuery  = (orderToken) => {
                const query = 'SELECT * FROM orders WHERE Order_token = ?';
                return new Promise((res, rej) => {
                    con.query(query, [orderToken], (error, results, fields) => {
                        if(error){
                            rej(error)
                        } else {
                            res(results)
                        }
                    })
                })
            }
    
            const thisOrder = await getThisOrderIdQuery(orderToken);
            const thisOrderId = thisOrder[0].ID;
    
            res.status(200);
            res.json({ message: 'order placed', thisOrderId })
        } catch(error){
            // console.log(error);
            const errorMsg = error.message;
            res.status(500);
            res.json({ errorMsg });
        }
    // } 
    // else {
    //     res.status(200).json({ message: 'cart cannot be empty' });
    // }
}
countMealViews = async(req, res) => {
    const mealId = req.query.mealId;

    const mealInfo = await queries.getSingleMealQuery(mealId);
    const mealViews = mealInfo[0].Views;

    const views = parseInt(mealViews);
    // console.log(views)

    const newViews = views + 1;
    // console.log(newViews);

    try {
        await queries.countMealViewsQuery(newViews, mealId);
        res.status(200).json({ message: 'view +1' });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ message: errorMsg });
    }
}

/// new ///
getAllCategories = async(req, res) => {
    try {
        const categories = await queries.getAllCategoriesQuery();
        res.status(200);
        res.json({ categories });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({ errorMsg });
    }
}
getAllMeals = async(req, res) => {
    const status = 'Active';

    // test about getting users ip address
    // var ip = req.ip;

    // console.log(ip);

    try {
        const meals = await queries.getAllMealsQuery(status);
        res.status(200);
        res.json({ meals });
    } catch(error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({ errorMsg });
    }
}
getFeaturedMeal = async(req, res) => {
    try {
        const featuredMeal = await queries.getFeaturedMealQuery();
        // console.log(featuredMeal)
        res.status(200);
        res.json({ featuredMeal })
    } catch (error) {
        // console.log(error)
        const errorMsg = error.message;
        res.status(500);
        res.json({ errorMsg })
    }
}
getMealsChosenByChief = async(req, res) => {
    try {
        const chosenMeals = await queries.getMealsChosenByChiefQuery();
        res.status(200);
        res.json({ chosenMeals })
    } catch(error) {
        const errorMsg = error.message;
        res.status(200);
        res.json({ errorMsg });
    }
}
getSingleMeal = async(req, res) => {
    const mealId = req.query.mealId;

    try {
        const singleMeal = await queries.getSingleMealQuery(mealId);
        res.status(200);
        res.json({ singleMeal });
    } catch(error){
        const errorMsg = error.message;
        res.status(500);
        res.json({ errorMsg });
    }
}
getMealsForCategory = async(req, res) => {
    const mealCat = req.query.singleMealCat;
    // const mealCat = 'Скара';
    const status = 'Active';

    try {
        const mealsCat = await queries.getMealsFromCatQuery(mealCat, status);
        // console.log(mealsCat)
        res.status(200);
        res.json({ mealsCat });
    } catch(error){
        const errorMsg = error.message;
        res.status(500);
        res.json({ errorMsg });
    }
}


/// user dashboard ///
addNewAddress = async(req, res) => {
    const loggedinUser = req.username.userId;

    const newAddressObj = {
        userId: loggedinUser,
        name: req.body.addressName,
        location: req.body.location
    };

    try {
        await queries.addNewAddressQuery(newAddressObj);
        res.status(200).json({ message: 'added' });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ message: errorMsg });
    }
}
getMyAddresses = async(req, res) => {
    const loggedInUser = req.username.userId;

    try {
        const addresses = await queries.getMyAddressesQuery(loggedInUser);
        res.status(200).json({ addresses });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ message: errorMsg });
    }
}
deleteAddress = async(req, res) => {
    const addressId = req.query.addressId;

    try {
        await queries.deleteAddressQuery(addressId);
        res.status(200).json({ message: 'address deleted' });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ message: errorMsg });
    }
}
getMyProfile = async(req, res) => {
    const loggedInUser = req.username.userId;

    try {
        const myProfile = await queries.getyMyProfileQuery(loggedInUser);
        res.status(200).json({ myProfile });
    } catch (error) {
        console.log(error);
        const errorMsg = error.message;
        res.status(500).json({ errorMsg });
    }
}
editMyProfile = async(req, res) => {
    const loggedInUser = req.username.userId;
    const userInfo = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    };

    const myProfile = await queries.getyMyProfileQuery(loggedInUser);
    // console.log(myProfile);

    const editMyProfile = myProfile.filter(profile => {
        if(userInfo.firstname == ''){
            userInfo.firstname = profile.Firstname
        } else {
            profile.Firstname = userInfo.firstname
        }

        if(userInfo.lastname == ''){
            userInfo.lastname = profile.Lastname
        } else {
            profile.Lastname = userInfo.lastname
        }

        if(userInfo.email == ''){
            userInfo.email = profile.Email
        } else {
            profile.Email = userInfo.email
        }

        if(userInfo.password == ''){
            userInfo.password = profile.Password
        } else {
            profile.Password = userInfo.password
        }

        return profile;
    })

    const finalInfo = editMyProfile[0];

    try {
        await queries.editMyProfileQuery(finalInfo, loggedInUser);
        res.status(200).json({ message: 'profile edited' });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ errorMsg });
    }
}
getMyOrders = async(req, res) => {
    const loggedInUser = req.username.userId;
    // console.log(loggedInUser);

    try {
        const myOrders = await queries.getMyOrders(loggedInUser);
        const numberOfOrders = myOrders.length;

        res.status(200).json({ myOrders, numberOfOrders });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            message: errorMsg
        });
    };
};


getRestaurantMeals = async(req, res) => {
    const restId = req.query.restId;

    try {
        const restMeals = await queries.getRestaurantMealsQuery(restId);
        res.status(200).json({ restMeals });
    } catch (error) {
        // console.log(error)
        const errorMsg = error.message;
        res.status(500).json({ message: errorMsg });
    }
}
seachMealsOrRestaurants = async(req, res) => {
    const searched = req.query.searched;

    try {
        const searchResult = await queries.searchMealsOrRestaurants(searched);
        res.status(200).json({ searchResult });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ message: errorMsg });
    }
}
countCategoryViews = async(req, res) => {
    const category = req.query.category;
    console.log(category);

    countCategoryViewsQuery = (category) =>{
        const query = 'UPDATE food_category SET Views = Views + 1 WHERE Category = ?';
        return new Promise((res, rej) => {
            con.query(query, [category], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }
    try {
        await countCategoryViewsQuery(category);
        res.status(200).json({ mess: 'view +1'});
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ message: errorMsg });
    }
}
getSingleCategory = async(req, res) => {
    const category = req.query.category;
    console.log(category);

    getSingleCatQuery = (category) => {
        const query = 'SELECT * FROM food_category WHERE Category = ?';
        return new Promise((res, rej) => {
            con.query(query, [category], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        const singleCat = await getSingleCatQuery(category);
        res.status(200).json({ singleCat });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ message: errorMsg });
    }
}
userRank = async(req, res) => {
    const loggedUser = req.username.userId;

    getUserRankQuery = (loggedUser) => {
        const query = 'SELECT Rank FROM clients WHERE ID = ?';
        return new Promise((res, rej) => {
            con.query(query, [loggedUser], (error, results, fields) => {
                if(error){
                    rej(error) 
                } else {
                    res(results)
                }
            })
        })            
    }

    try {
        const userRank = await getUserRankQuery(loggedUser);
        res.status(200).json({ userRank });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ message: errorMsg });
    }
}
getAllRestaurants = async(req, res) => {

    getAllRestaurantsQuery = () => {
        const query = "SELECT * FROM restaurants WHERE Status = 'Online'";
        return new Promise((res, rej) => {
            con.query(query, (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    };

    try {
        const restaurants = await getAllRestaurantsQuery();
        res.status(200).json({ restaurants });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ message: errorMsg });
    }
}
restaurantApply = async(req, res) => {
    const restName = req.body.restName;
    const restPhone = req.body.restPhone;

    console.log(req.body);

    restaurantApplyQuery = (restName, restPhone) => {
        const query = 'INSERT INTO restaurant_applications(name, phone_number, date) VALUES(?,?, CURRENT_TIMESTAMP())';
        return new Promise((res, rej) => {
            con.query(query, [restName, restPhone], (error, results, fields) => {
                if(error){
                    rej(error);
                } else {
                    res(results);
                }
            })
        })
    }


    try {
        await restaurantApplyQuery(restName, restPhone);
        res.status(200).json({ message: 'applied' });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ message: errorMsg });
    }
}

carrierApply = async(req, res) => {
    const name = req.body.restName;
    const phoneNumber = req.body.restPhone;
    const type = req.body.type;

    console.log(req.body);

    carrierApplyQuery = (name, phoneNumber, type) => {
        const query = 'INSERT INTO applications(name, phone_number, type, date) VALUES(?,?,?,CURRENT_DATE())';
        return new Promise((res, rej) => {
            con.query(query, [name, phoneNumber, type], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        await carrierApplyQuery(name, phoneNumber, type);
        res.status(200).json({ message: 'applied' });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ message: errorMsg });
    }
}

getSingleOrder = async(req, res) => {
    const orderId = req.query.orderId;

    singleOrderQuery = (orderId) => {
        const query = 'SELECT * FROM orders WHERE ID = ? LIMIT 1';
        return new Promise((res, rej) => {
            con.query(query, [orderId], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        const singleOrder = await singleOrderQuery(orderId);
        res.status(200).json({ singleOrder });
    } catch (error) {
        res.status(500).json({ error });
    }
}

getSingleCarrier = async(req, res) => {
    const carrierId = req.query.carrierId;

    getSingleCarrierQuery = (carrierId) => {
        const query = 'SELECT * FROM cariers WHERE ID = ?';
        return new Promise((res, rej) => {
            con.query(query, [carrierId], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results);
                }
            })
        })
    }

    try {
        const carrier = await getSingleCarrierQuery(carrierId);
        res.status(200).json({ carrier });
    } catch (error) {
        res.status(500).json({ error });
    }
}
getMealsFromSingleRest = async(req, res) => {
    const restId = req.query.restId;

    mealsFromSingleRestQuery = (restId) => {
        const query = 'SELECT * FROM meals WHERE Restaurant_id = ?';
        return new Promise((res, rej) => {
            con.query(query, [restid], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        const singleRestMeals = await mealsFromSingleRestQuery(restId);
        res.status(200).json({ singleRestMeals });
    } catch (error) {
        res.status(500).json({ error });
    }
}

forgotPassword = async(req, res) => {
    const userEmail = req.query.userEmail;
    // console.log(userEmail);

    checkIfEmailExistsQuery = (email) => {
        const query = 'SELECT Email FROM clients';
        return new Promise((res, rej) => {
            con.query(query, [email], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    const emails = await checkIfEmailExistsQuery(userEmail);
    const checkEmail = emails.some(email => {
        return userEmail == email.Email
    });

    // console.log(checkEmail);

    if(checkEmail == true){
        const resetPassToken = randomstring.generate();

        addResetPassTokenToUserQuery = (resetPassToken) => {
            const query = "UPDATE clients SET reset_pass_token = ?";
            return new Promise((res, rej) => {
                con.query(query, [resetPassToken], (error, results, fields) => {
                    if(error){
                        rej(error)
                    } else {
                        res(results);
                    }
                })
            })
        }
        await addResetPassTokenToUserQuery(resetPassToken);

        getSingleUserResetPassTokenQuery = (userEmail) => {
            const query = 'SELECT reset_pass_token FROM clients WHERE Email = ?';
            return new Promise((res, rej) => {
                con.query(query, [userEmail], (error, results, fields) => {
                    if(error){
                        rej(error)
                    } else {
                        res(results)
                    }
                })
            })
        }
        const user = await getSingleUserResetPassTokenQuery(userEmail);
        const userToken = user[0].reset_pass_token;
        console.log(userToken);

        // console.log('leo')
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'smstreet12@gmail.com',
                pass: 'Kajakimovski123'
            }
        });
        
        var mailOptions = {
            from: 'smstreet12@gmail.com',
            to: userEmail,
            subject: 'reset pass'
            // text: 'test'
        };
        mailOptions.html = '<div><h1 style="color: red">FoodGuru</h1><p>Вашата заборавена лозинка можете да ја повратите со следниов линк</p><a rel="nofollow" style="padding-left:20px;padding-right:20px;padding-top:10px;padding-bottom:10px;color:white;background:red;border-radius:10px;margin-top:20px;text-decoration:none;"" targer="_blank" onClick="return window.theMainWindow.showLinkWarning(this)" href="http://localhost:3000/reset-password?token='+ userToken + '">Заборавена лозинка</a></div>';
        
        
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            } else {
                res.status(200).json({ mess: 'mail sent' })
                console.log('Email sent:' + info.response);
            }
        })
    } else {
        res.status(200).json({ mess: 'email does not exist' })
    }

    try {
        // res.status(200).json({ mess: 'test' })
    } catch (error) {
        res.status(500).json({ error });
    }
}
resetPassword = async(req, res) => {
    const resetPassToken = req.query.token;
    const newPass = req.query.pass;

    resetUserPasswordQuery = (newPass, token) => {
        const query = 'UPDATE clients SET Password = ? WHERE reset_pass_token = ?';
        return new Promise((res, rej) => {
            con.query(query, [newPass, token], (error, results,fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }
    try {
        await resetUserPasswordQuery(newPass, resetPassToken);
        res.status(200).json({ mess: 'pass reset done' })
    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = {
    /// get ///
    cartSummary,
    getSingleCart,
    getAllCategories,
    getFeaturedMeal,
    getAllMeals,
    getMealsChosenByChief,
    getSingleMeal,
    getMealsForCategory,
    getLoggedInUserName,
    getMyOrders,
    getMyProfile,
    getMyAddresses,
    getRestaurantMeals,
    checkIfUserIsLogged,
    seachMealsOrRestaurants,
    getSingleCategory,
    userRank,
    getAllRestaurants,
    forgotPassword,
    resetPassword,
    getSingleOrder,
    getSingleCarrier,
    getMealsFromSingleRest,

    /// post ///
    register,
    login,
    logout,
    addToCart,
    makeOrder,
    addNewAddress,
    restaurantApply,
    carrierApply,
    
    /// patch ///
    editMyProfile,
    countMealViews,
    countCategoryViews,

    /// delete ///
    deleteFromCart,
    deleteAddress
}
