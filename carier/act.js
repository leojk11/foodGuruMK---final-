const queries = require('./query');
const adminQueries = require('../admin/query');
const bcrypt = require('bcryptjs');
const helper = require('../helper/helper');
const jwt = require('jsonwebtoken');
require('dotenv/config');
const con = require('../DB/database');


// carier login
carierLogin = async(req, res) => {
    // carier login information
    const password = req.body.password;
    const username = req.body.username;
    const onlinStatus = 'Online';
    // console.log(caierLoginInfo);

    const carierUsernames = await adminQueries.getAllCariersQuery();
    const carierUsernameExists = carierUsernames.some(carier => {
        return username == carier.Username
    });

    if(username == '') {
        res.status(400);
        res.json({
            message: 'Внеси го твоето корисничко име.'
        });
    } else if (password == '') {
        res.status(400);
        res.json({
            message: 'Внеси ја твојата лозинка.'
        })
    } 
    else if (carierUsernameExists == false) {
        res.status(400);
        res.json({
            message: `Доставувач со корисничко име ${username}, не постои.`
        });
    } else {
        try {
            const carier = await queries.carierLoginQuery(username);
            // const carierPassword = carier[0].Password;
            const carierId = carier[0].ID;
            // const matchPassword = bcrypt.compareSync(password, carierPassword);
            const matchPassword = carier.some(carier => {
                return password == carier.Password
            })

            if(matchPassword == true) {
                const payload = {
                    carierId: carierId
                };
                const token = jwt.sign(payload, process.env.SECRET);
                res.cookie('access_token', token, {
                    maxAge: 365 * 24 * 60 * 60 * 1000,
                    // httpOnly: true
                });

                // const loggedCarrier = req.username.carierId;
                // await queries.markAsOnlineQuery(onlinStatus, loggedCarrier);

                res.status(200);

                res.json({
                    message: 'logged in',
                    token
                });

            } else {
                res.status(400);
                res.json({
                    message: 'Внесената лозинка не е точна.'
                });
                res.redirect('http://localhost:3000/carrier/login');
            };
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
        res.clearCookie('access_token');
        res.status(200).json({ message: 'logged out' });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ message: errorMsg });
    }
}

// carier reset password 
carierResetPassword = async(req, res) => {
    const carierUsername = req.body.carier_username;
    const carierOldPassword = req.body.old_password;
    const carierNewPassword = req.body.new_password;

    const carier = await queries.getSingleCarrierPasswordQuery(carierUsername);
    const carierPass = carier[0].Password;

    const matchPassword = bcrypt.compareSync(carierOldPassword, carierPass);

    if (carierUsername == '') {
        res.status(400);
        res.json({
            message: 'Внеси го твоето корисничко име.'
        })
    } else if (carierOldPassword == '') {
        res.status(400);
        res.json({
            message: 'Внеси ја твојата лозинка.'
        })
    } else if (carierNewPassword == '') {
        res.status(400);
        res.json({
            message: 'Внеси ја твојата нова лозинка.'
        })
    } else if(matchPassword == false) {
        res.status(400);
        res.json({
            message: 'Внесената лозинка не е точна.'
        })
    } else {
        if(helper.mediumRegex.test(carierNewPassword) == false) {
            res.status(400);
            res.json({
                message: 'Лозинката мора да се состои најмалку шест карактери, една бројка и една голема буква.'
            })
        } else {
            try {
                await queries.carierResetPasswordQuery(carierNewPassword, carierUsername);
                res.status(200);
                res.json({
                    message: 'Password has been reset successfully.'
                })
            } catch (error) {
                const errorMsg = error.message;
                res.status(500);
                res.json({
                    errorMsg
                })
            }
        }
    }
};

// get logged in carrier name
getLoggedInCarrierName = async(req, res) => {
    const loggedCarrier = req.username.carierId;

    const loggedCarrierInfo = await queries.getLoggedInCarrierNameQuery(loggedCarrier);
    const loggedInUser = loggedCarrierInfo[0].Firstname;

    try {
        res.status(200);
        res.json({ loggedInUser });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({ message: errorMsg });
    }
}

// get requests
getAllLiveOrders = async(req, res) => {
    const orderStatus = 'waiting carrier';

    try {
        const liveOrdersInfo = await queries.getAllOrdersQuery(orderStatus);
    
        const order = liveOrdersInfo.map(order => {
            const orderObj = {
                orderId: order.ID,
                orderTime: order.Time_ordered,
                orderRestaurant: order.restaurants,
                orderDeliveryAdress: order.Location
            }
            return orderObj;
        });

        res.status(200);
        res.json({ order });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            message: errorMsg
        });
    }
};
getMyRevenue = async(req, res) => {
    const loggedInUser = req.username.carierId;

    try {
        const revenue = await queries.getMyRevenueQuery(loggedInUser);

        let array = [];
        let finalRevenue;

        if(revenue.length < 1){
            finalRevenue = 0;
        }

        for(var i = 0; i < revenue.length; i++) {
            const price = revenue[i].Price;
            const reducer = (accumulator, currentValue) => accumulator + currentValue;

            array.push(price);
            finalRevenue = array.reduce(reducer);
        };

        res.status(200);
        res.json({ finalRevenue })
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({ message: errorMsg });
    }
}
getMyThisWeekRevenue = async(req, res) => {
    const carrierId = req.username.carierId;

    try {
        const revenue = await queries.getMyThisWeekRevenueQuery(carrierId);
        let array = [];
        let finalRevenue;

        if(revenue.length < 1) {
            finalRevenue = 0;
        }

        for(var i = 0; i < revenue.length; i++) {
            const price = revenue[i].Price;
            const reducer = (accumulator, currentValue) => accumulator + currentValue;

            array.push(price);
            finalRevenue = array.reduce(reducer);
        };

        res.status(200).json({ finalRevenue });
        
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ message: errorMsg });
    }
}
getMyTodayRevenue = async(req, res) => {
    const loggedCarrier = req.username.carierId;

    // todays date
    const now = new Date();
    const day = ("0" + now.getDate()).slice(-2);
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const year = now.getFullYear();
    const finalDate = year + '-' + month + '-' + day;

    try {
        const revenue = await queries.getMyTodayRevenueQuery(finalDate, loggedCarrier);

        let array = [];
        let finalRevenue;

        if(revenue.length < 1) {
            finalRevenue = 0;
        }

        for(var i = 0; i < revenue.length; i++) {
            const price = revenue[i].Price;
            const reducer = (accumulator, currentValue) => accumulator + currentValue;

            array.push(price);
            finalRevenue = array.reduce(reducer);
        };

        res.status(200);
        res.json({ finalRevenue })
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({ message: errorMsg });
    }
}
getMyThisMonthRevenue = async(req, res) => {
    const loggedInUser = req.username.carierId;
    // const carrierId = '1';s

    try {
        const revenue = await queries.getMyThisMonthRevenueQuery(loggedInUser);

        let array = [];
        let finalRevenue;

        if(revenue.length < 1) {
            finalRevenue = 0;
        }

        for(var i = 0; i < revenue.length; i++) {
            const price = revenue[i].Price;
            const reducer = (accumulator, currentValue) => accumulator + currentValue;

            array.push(price);
            finalRevenue = array.reduce(reducer);
        };

        res.status(200);
        res.json({ finalRevenue });

    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({ message: errorMsg });
    }
}
getMyOrders = async(req, res) => { 
    const loggedInUser = req.username.carierId;

    try {
        const myOrdersInfo = await queries.getMyOrdersQuery(loggedInUser);
        const myOrdersNumb = myOrdersInfo.length;

        const myOrders = myOrdersInfo.map(order => {
            const ordersObj = {
                orderId: order.Order_id,
                from: order.From_location,
                to: order.To_location,
                meal: order.Meal,
                price: order.Price + 'ДЕН'
            }
            return ordersObj;
        }); 

        res.status(200);
        res.json({ myOrders, myOrdersNumb });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({ message: errorMsg });
    }
};
getAllMyActiveOrders = async(req, res) => {
    const carrierId = req.username.carierId;
    
    getAllMyActiveOrdersQuery = (carrierId) => {
        const query = "SELECT * FROM orders WHERE Carrier_id = ? AND Order_status = 'Accepted by carrier' OR Order_status = 'Picked up'";
        return new Promise((res, rej) => {
            con.query(query, [carrierId], (error, results, fields) =>{
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    };

    getSingleOrderCartItemsQuery = (orderToken) => {
        const query = "SELECT * FROM add_to_cart WHERE order_token = ? AND status = 'Accepted by carrier' OR status = 'Picked up'";
        return new Promise((res, rej) => {
            con.query(query, [orderToken], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    };

    const myActiveOrders = await getAllMyActiveOrdersQuery(carrierId);

    const ordersDetails = [];
    const cartItems = [];
    for(var i = 0; i < myActiveOrders.length; i++){
        const orderToken = myActiveOrders[i].Order_token;
        const orderUserName = myActiveOrders[i].Client_name;
        const orderUserPh = myActiveOrders[i].Phone_number;
        const orderPaymentMethod = myActiveOrders[i].Payment_method;

        const singleOrderCartItems = await getSingleOrderCartItemsQuery(orderToken);
        cartItems.push(singleOrderCartItems);

        const orderObj =  {
            orderUserName,
            orderUserPh,
            orderPaymentMethod
        };
        ordersDetails.push(orderObj);
    }

    try {
        res.status(200).json({ myActiveOrders, cartItems });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ message: errorMsg });
    }
}
getSingleOrderInfo = async(req, res) => {
    const orderId = req.query.orderId;

    try {
        getSingleOrderQuery = (orderId) => {
            const query = 'SELECT * FROM orders WHERE ID = ?';
            return new Promise((res, rej) => {
                con.query(query, [orderId], (error, results, fields) => {
                    if(error){
                        rej(error)
                    } else {
                        res(results)
                    }
                })
            })
        };

        const singleOrder = await getSingleOrderQuery(orderId);
        const orderToken = singleOrder[0].Order_token;

        getSingleOrderCartItemsQuery = (orderToken) => {
            const query = "SELECT * FROM add_to_cart INNER JOIN meals ON add_to_cart.meal_id = meals.ID WHERE add_to_cart.order_token = ? AND add_to_cart.status = 'Accepted by carrier'";
            return new Promise((res, rej) => {
                con.query(query, [orderToken], (error, results, fields) => {
                    if(error){
                        rej(error)
                    } else {
                        res(results)
                    }
                })
            })
        };

        const singleOrderCartItems = await getSingleOrderCartItemsQuery(orderToken);
        const mealsAndRests = [];
        var i = 0;
        while(i < singleOrderCartItems.length){
            const orderObj =  {
                meal: singleOrderCartItems[i].meal_amount + 'x ' + singleOrderCartItems[i].meal_name,
                rest: singleOrderCartItems[i].rest_name
            };
            mealsAndRests.push(orderObj);
            i++;
        }

        res.status(200);
        res.json({ mealsAndRests, singleOrder });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({ errorMsg });
    }
};
getMyCompletedOrders = async(req, res) => {
    const carrierId = req.username.carierId;
    
    getAllMyActiveOrdersQuery = (carrierId) => {
        const query = "SELECT * FROM orders WHERE Carrier_id = ? AND Order_status = 'Delivered'";
        return new Promise((res, rej) => {
            con.query(query, [carrierId], (error, results, fields) =>{
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    };

    getSingleOrderCartItemsQuery = (orderToken) => {
        const query = "SELECT * FROM add_to_cart WHERE order_token = ? AND status = 'Delivered'";
        return new Promise((res, rej) => {
            con.query(query, [orderToken], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    };

    const myActiveOrders = await getAllMyActiveOrdersQuery(carrierId);

    const ordersDetails = [];
    const cartItems = [];
    for(var i = 0; i < myActiveOrders.length; i++){
        const orderToken = myActiveOrders[i].Order_token;
        const orderUserName = myActiveOrders[i].Client_name;
        const orderUserPh = myActiveOrders[i].Phone_number;
        const orderPaymentMethod = myActiveOrders[i].Payment_method;

        const singleOrderCartItems = await getSingleOrderCartItemsQuery(orderToken);
        cartItems.push(singleOrderCartItems);

        const orderObj =  {
            orderUserName,
            orderUserPh,
            orderPaymentMethod
        };
        ordersDetails.push(orderObj);
    }

    try {
        res.status(200).json({ myActiveOrders, cartItems });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ message: errorMsg });
    }
}


acceptOrder = async(req, res) => {
    const loggedInCarrier = req.username.carierId;

    const orderStatus = 'Accepted by carrier';
    const orderId = req.query.orderId;

    const singleOrder = await queries.getSingleOrderInfoQuery(orderId);
    const orderToken = singleOrder[0].Order_token;
    const singleOrderStatus = singleOrder[0].Order_status;

    const acceptOrderObj = {
        orderId: orderId,
        orderStatus: orderStatus,
        carrierId: loggedInCarrier
    };

    updateCartItemsFromOrderQuery = (orderToken) => {
        const query = "UPDATE add_to_cart SET status = 'Accepted by carrier' WHERE order_token = ?";
        return new Promise((res, rej) => {
            con.query(query, [orderToken], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    };

    if(singleOrderStatus !== 'Accepted by carrier'){
        try {
            await updateCartItemsFromOrderQuery(orderToken);
            await queries.carrierAcceptOrderQuery(acceptOrderObj);
    
            res.status(200);
            res.json({ message: 'order accepted' });
        } catch (error) {
            // console.log(error);
            const errorMsg = error.message;
            res.status(500);
            res.json({
                message: errorMsg
            })
        };
    } else {
        res.status(400).json({ messagE: 'order has already been accepted!!' })
    }
    
};
pickupOrder = async(req, res) => {
    const orderId = req.query.orderId;

    const singleOrder = await queries.getSingleOrderInfoQuery(orderId);
    const orderToken = singleOrder[0].Order_token;

    pickupOrderQuery = (orderId) => {
        const query = "UPDATE orders SET Order_status = 'Picked up' WHERE ID = ?";
        // const query = "UPDATE orders SET Order_status = 'Delivered'";
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
    pickupOrderCartItemsQuery = (orderToken) => {
        const query = "UPDATE add_to_cart SET status = 'Picked up' WHERE order_token = ?";
        return new Promise((res, rej) => {
            con.query(query, [orderId], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results);
                }
            })
        })
    }

    try {
        await pickupOrderCartItemsQuery(orderToken);
        await pickupOrderQuery(orderId);
        res.status(200).json({ mess: 'order picked up' });
    } catch (error) {
        res.status(500).json({ error });
    }
}
changeStatusToBusy = async(req, res) => {
    const loggedInCarrier = req.username.carierId;

    let status;
    const carrier = await queries.getSingleCarrierQuery(loggedInCarrier);
    const carrierStatus = carrier[0].Status;


    if(carrierStatus == 'Free'){
        status = 'Busy'
    } else {
        status = 'Free'
    }
    try {
        await queries.changeStatusQuery(status, loggedInCarrier);
        res.status(200).json({ message: 'status changed' });
    } catch (error) {
        const errroMsg = error.message;
        res.status(500).json({ errroMsg });
    }
}
changeStatusToFree = async(req, res) => {
    const loggedInCarrier = req.username.carierId;

    const status = 'Free';

    try {
        await queries.changeStatusQuery(status, loggedInCarrier);
        res.status(200).json({ message: 'status changed' });
    } catch (error) {
        const errroMsg = error.message;
        res.status(500).json({ errroMsg });
    }
}

deliveredOrder = async(req, res) => {
    const loggedInCarrier = req.username.carierId;
    const orderStatus = 'Delivered';
    const orderId = req.query.orderId;

    const acceptOrderObj = {
        carrierId: loggedInCarrier,
        orderStatus: orderStatus,
        orderId: orderId
    };

    const singleOrder = await queries.getSingleOrderInfoQuery(orderId);
    const orderToken = singleOrder[0].Order_token;

    updateCartItemsFromOrderQuery = (orderToken) => {
        const query = "UPDATE add_to_cart SET status = 'Delivered' WHERE order_token = ?";
        return new Promise((res, rej) => {
            con.query(query, [orderToken], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    };

    try {
        await updateCartItemsFromOrderQuery(orderToken);
        await queries.carrierAcceptOrderQuery(acceptOrderObj);
        res.status(200);
        res.json({ message: 'Order delivered' });    
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({ errorMsg })
    }
};
saveOrderToCarrierHistory = async(req, res) => {
    const loggedInCarier = req.username.carierId;
    const saveOrderInfo = { 
        orderId: req.body.orderId,
        restName: req.body.restName + ',',
        finalDestination: req.body.finalDestination,
        mealName: req.body.finalMealName,
        price: req.body.theNum
    };
    try {
        await queries.saveOrderToCarrierHistoryQuery(saveOrderInfo, loggedInCarier);

        res.status(200);
        res.json({ message: 'order saved to history' })
    } catch (error) {
        // console.log(error)
        const errorMsg = error.message;
        res.status(500);
        res.json({ message: errorMsg });
    }
}


// patch requests
cancelOrder = async(req, res) => {
    const orderStatus = 'In progress';
    const orderId = req.query.orderId;

    try {
        await queries.cancelOrderQuery(orderStatus, orderId);

        res.status(200);
        res.json({ message: 'order canceled' })
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({ message: errorMsg });
    }
}

module.exports = {
    getLoggedInCarrierName,
    getMyRevenue,
    getMyTodayRevenue,
    getMyThisWeekRevenue,
    getMyThisMonthRevenue,
    getMyOrders,
    getMyTodayOrders,
    getAllMyActiveOrders,
    getMyCompletedOrders,
    getAllLiveOrders,
    getSingleOrderInfo,
    carierLogin,
    logout,
    carierResetPassword,
    pickupOrder,
    acceptOrder,
    // pickupOrder,
    cancelOrder,
    deliveredOrder,
    saveOrderToCarrierHistory,
    changeStatusToBusy
};