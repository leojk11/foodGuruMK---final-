const queries = require('./query');
const clientQueries = require('../clients/query')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv/config');
const helper = require('../helper/helper');


// login restaurant
loginRestaurant = async(req, res) => {
    const restUsername = req.body.username;
    const restPassword = req.body.password;

    const restUsernames = await queries.getAllRestaurantsUsernamesQuery();
    const restUsernameExists = restUsernames.some(rest => {
        return restUsername == rest.Username
    });

    if(restUsername == '' || restPassword == '') {
        res.status(400);
        res.json({
            message: 'Please enter username and password.'
        });
    } else if (restUsernameExists == false) {
        res.status(400);
        res.json({
            message: `Restaurant with username ${restUsername}, does not exist.`
        });
    } else {
        try {
            const restaurant = await queries.restaurantLoginQuery(restUsername);
            const restaurantPassword = restaurant[0].Password;
            const restaurantId = restaurant[0].ID;
            // const matchPassword = bcrypt.compareSync(restPassword, restaurantPassword);
            const matchPassword = restaurant.some(rest => {
                return restPassword == rest.Password
            })

            if(matchPassword == true) {
                const payload = {
                    restId: restaurantId
                };

                const token = jwt.sign(payload, process.env.SECRET);
                res.cookie('restlg', token, {
                    maxAge: 365 * 24 * 60 * 60 * 1000,
                    httpOnly: true
                });

                res.status(200);
                res.json({
                    message: 'logged in',
                    token
                });
            } else {
                res.status(400);
                res.json({
                    message: 'Password that you have entered is incorrect.'
                });
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

// restaurant reset password
resetPassword = async(req, res) => {
    const loggedInRest =  req.username.restId;

    const getLoggedInRestPassword = await queries.getSingleRestaurantPasswordQuery(loggedInRest);
    const password = getLoggedInRestPassword[0].Password;

    const oldPassword = req.body.old_password;
    const newPassword = req.body.new_password;

    if(oldPassword == '') {
        res.status(400);
        res.json({
            message: 'Please enter your old password.'
        });
    } else if (newPassword == '') {
        res.status(400);
        res.json({
            message: 'Please enter your new password.'
        });
    } else if(password != oldPassword) {
        res.status(400);
        res.json({
            message: 'old password incorrect.'
        });
    } else if (helper.mediumRegex.test(newPassword) == false) {
        res.status(400);
        res.json({
            message: 'Password needs to be at least six characters long, needs to contain at least one uppercase character and one number.'
        });
    } 
    else {
        try {
            const passHash = bcrypt.hashSync(newPassword, 10);
            await queries.resetPasswordQuery(passHash, loggedInRest);

            res.status(200);
            res.json({
                message: 'Password has been reset successfully.'
            });
        } catch (error) {
            const errorMsg = error.message;
            res.status(500);
            res.json({
                message: errorMsg
            })
        }
    }
    
}

// get all single restaurant orders
getSingleRestaurantOrders = async(req, res) => {
    const loggedInUser = req.username.restId;

    try {
        const restOrders = await queries.getSingleRestaurantOrdersQuery(loggedInUser);


        res.status(200);
        res.json({
            restOrders
        })
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            message: errorMsg
        });
    };
};

/////////////////////////////////////////////////
// finish getting restaurant order and details //
/////////////////////////////////////////////////
getSingleRestaurantOrdersAndDetails = async(req, res) => {
    const loggedInRest = req.username.restId;
    // console.log(loggedInRest);

    try {
        const ordersAndDetails = await queries.getSingleRestaurantOrdersAndOrderDetailsQuery(loggedInRest);
        let clientId;
        // console.log(clientId);

        for(var i = 0; i < ordersAndDetails.length; i++) {
            clientId = ordersAndDetails[i]['Client_id'];

        }
        // console.log(clientId);

        const orders = ordersAndDetails.map(order => {
            const orderObj = {
                orderId: order.ID,
                paymentMethod: order.Payment_method,
                date: order.Time_of_order,

            }
        })
        res.status(200);
        res.json({
            ordersAndDetails
        });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            message: errorMsg
        });
    };
}


////////////////////////////////////////
// continue with getting rest revenue //
////////////////////////////////////////
// get restaurant revenue
getRestaurantRevenue = async(req, res) => {
    const loggedInRest = req.username.restId;

    try {
        const revenue = await queries.getSingleRestaurantRevenueQuery(loggedInRest);

        let array = [];
        let finalRevenue;

        for(var i = 0; i < revenue.length; i++) {
            const price = revenue[i].Price;
            const reducer = (accumulator, currentValue) => accumulator + currentValue;

            array.push(price);
            finalRevenue = array.reduce(reducer);
        };

        res.status(200);
        res.json({
            revenue: finalRevenue + 'MKD'
        });
    } catch (error) {
        const errorMsg = error.message;
        res.status(200);
        res.json({
            message: errorMsg
        });
    };
};
getRestaurantTodaysRevenue = async(req, res) => {
    const loggedInRest = req.username.restId;
    // console.log(loggedInRest);

    const now = new Date();
    const day = ("0" + now.getDate()).slice(-2);
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const year = now.getFullYear();
    const finalDate = day + '-' + month + '-' + year;

    try {
        const todayRevenue = await queries.getSingleRestaurantTodayRevenueQuery(loggedInRest, finalDate);

        let array = [];
        let finalRevenue;

        for(var i = 0; i < todayRevenue.length; i++) {
            const price = todayRevenue[i].Price;
            const reducer = (accumulator, currentValue) => accumulator + currentValue;

            array.push(price);
            finalRevenue = array.reduce(reducer);
        };

        res.status(200);
        res.json({
            todayRevenue: finalRevenue + 'MKD'
        })
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            message: errorMsg
        });
    };
}



///////////////////////////////////
// continue with getting only    //
// active orders for one rest    //
///////////////////////////////////

// get only active restaurant orders
getSingleRestaurantActiveOrders = async(req, res) => {
    const loggedInUser = req.username.restId;
    // console.log(loggedInUser);

    const orderStatus = 'waiting';

    try {
        const orders = await queries.getSingleRestaurantActiveOrdersQuery(loggedInUser, orderStatus);
        res.status(200);
        res.json({
            orders
        });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            message: errorMsg
        });
    };
};

// patch requests
// acceptOrder = async(req, res) => {
//     const orderStatus = 'accepted';
//     const orderId = req.query.orderId;
//     console.log(orderId);

//     const now = new Date();
//     const time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
//     console.log(time);

//     try {
//         await acceptOrderQuery(orderStatus, orderId);

//         res.status(200);
//         res.json({
//             message: 'Order accepted.'
//         });
//     } catch (error){
//         const errorMsg = error.message;
//         res.status(500);
//         res.json({
//             message: errorMsg
//         });
//     };
// };
// sendOrder = async(req, res) => {
//     const orderStatus = 'sent';
//     const orderId = req.query.orderId;

//     try {
//         await queries.sendOrderQuery(orderStatus, orderId);
//         res.status(200);
//         res.json({
//             message: 'Order sent.'
//         });
//     } catch (error) {
//         const errorMsg = error.message;
//         res.status(500);
//         res.json({
//             message: errorMsg
//         });
//     };
// };


/// new ///s
getMyProfileInfo = async(req, res) => {
    const loggedInrest = req.username.restId;
    // console.log(loggedInrest)

    try {
        const restInfo = await queries.getMyInfoQuery(loggedInrest);
        const singleRestInfo = restInfo.map(rest => {
            const infoObj = {
                restName: rest.Name,
                restAdress: rest.Location,
                restPhoneNumber: rest.Phone_number,
                restOpeningTime: rest.Opens,
                restClosingTime: rest.Closes,
                restLogo: rest.Image,
                restStatus: rest.Status
            }
            return infoObj;
        })
        res.status(200);
        res.json({ singleRestInfo });
    } catch(error){
        const errorMsg = error.message;
        res.status(500);
        res.json({ message: errorMsg });
    }
}
getMyAllTimeRevenue = async(req, res) => {
    const loggedInrest = req.username.restId;
    const status = 'Delivered'
    try {
        const allTimeRevenue = await queries.getMyAllTimeRevenueQuery(loggedInrest, status);
        let allTimeRevenueNum = allTimeRevenue[0].allTimeRevenue

        if (allTimeRevenueNum == undefined) {
            allTimeRevenueNum = 0;
        }
        res.status(200);
        res.json({ allTimeRevenueNum });
    } catch(error){
        const errorMsg = error.message;
        res.status(500);
        res.json({ message: errorMsg })
    }
}
getMyTodayRevenue = async(req, res) => {
    const loggedInrest = req.username.restId;
    let today = new Date().toISOString().slice(0, 10)
    
    try {
        const getMyTodayRevenue = await queries.getMyTodayRevenueQuery(loggedInrest, today);
        
        let todayRevenueCount = getMyTodayRevenue[0].revenueByDate;
        
        if(todayRevenueCount < 1){
            todayRevenueCount = 0;
        }
        
        res.status(200).json(todayRevenueCount)
    } catch(error){
        const erroMsg = error.message;
        res.status(500).json({ erroMsg });
    }
}
getMyOrders = async(req, res) => {
    

    try {
        const loggedInRest = req.username.restId;
        // const orderStatus = ['Accepted', 'Ordered', 'Accepted by carrier']
        
        const myOrders = await queries.getMyOrdersQuery(loggedInRest);
    const restOrderDetails = [];
    var singleOrderMealsPrice = [];
    for(let i = 0; i < myOrders.length; i++){
        const myOrdersMeals = myOrders[i].meal_id;
        
        const myOrdersMealsAmount = myOrders[i].amount;

        const meals = myOrdersMeals.split(',');
        const amount = myOrdersMealsAmount.split(',');
        const temp = []
        const tempPrice = []
        for(var j = 0; j < meals.length; j++){
            const mealsInfo = await queries.getSingleMealQuery(meals[j]);
            const mealsNames = mealsInfo[0].Name;
            const mealsPrice = mealsInfo[0].Price;

            const nameAndAmount = amount[j] + 'x' + mealsNames;
            
            temp.push(nameAndAmount);
            

            const mealsFinalPrice = amount[j] * mealsPrice;
            tempPrice.push(mealsFinalPrice)
            // singleOrderMealsPrice.push(mealsFinalPrice);
        }
        restOrderDetails.push(temp)
        singleOrderMealsPrice.push(tempPrice)

    }

    let myOrdersNumb = myOrders.length;
    console.log(myOrdersNumb)

    if(myOrdersNumb < 1) {
        myOrdersNumb = 0;
    }

    let order = myOrders.map((order, i) => {
        
        const orderObj = {
            orderTime: order.Time_ordered,
            orderId: order.ID,
            // orderValue: finalPrice,
            clientPhNumber: order.Phone_number,
            // orderDetails: orderDetails,
            exclusions: order.excluded_ingr,
            specReq: order.Special_requirements,
            orderStatus: order.Order_status
        }
        for (let j = 0; j < restOrderDetails.length; j++) {
            if(i == j){
                orderObj.orderDetails = restOrderDetails[j].toString()
            }
            
        }
        for (let j = 0; j < singleOrderMealsPrice.length; j++) {
            if(i == j){
                const sum = singleOrderMealsPrice[j].reduce((a, b) => a+b,0)
    
                
                orderObj.orderValue = sum
            }
            
            
        }
        return orderObj;
    })
    
        
        
        res.status(200).json({ order});
    } catch(error){
        const errorMsg = error.message;
        res.status(500).json({ errorMsg });
    }
}
getMyLastOrder = async(req, res) => {
    try {
        const loggedInRest = req.username.restId;
        // const orderStatus = ['Accepted', 'Ordered', 'Accepted by carrier']
        
        const myOrders = await queries.getMyLastOrderQuery(loggedInRest);
    const restOrderDetails = [];
    var singleOrderMealsPrice = [];
    for(let i = 0; i < myOrders.length; i++){
        const myOrdersMeals = myOrders[i].meal_id;
        
        const myOrdersMealsAmount = myOrders[i].amount;

        const meals = myOrdersMeals.split(',');
        const amount = myOrdersMealsAmount.split(',');
        const temp = []
        const tempPrice = []
        for(var j = 0; j < meals.length; j++){
            const mealsInfo = await queries.getSingleMealQuery(meals[j]);
            const mealsNames = mealsInfo[0].Name;
            const mealsPrice = mealsInfo[0].Price;

            const nameAndAmount = amount[j] + 'x' + mealsNames;
            
            temp.push(nameAndAmount);
            

            const mealsFinalPrice = amount[j] * mealsPrice;
            tempPrice.push(mealsFinalPrice)
            // singleOrderMealsPrice.push(mealsFinalPrice);
        }
        restOrderDetails.push(temp)
        singleOrderMealsPrice.push(tempPrice)

    }

    let myOrdersNumb = myOrders.length;
    console.log(myOrdersNumb)

    if(myOrdersNumb < 1) {
        myOrdersNumb = 0;
    }

    let order = myOrders.map((order, i) => {
        
        const orderObj = {
            orderTime: order.Time_ordered,
            orderId: order.ID,
            // orderValue: finalPrice,
            clientPhNumber: order.Phone_number,
            // orderDetails: orderDetails,
            exclusions: order.excluded_ingr,
            specReq: order.Special_requirements,
            orderStatus: order.Order_status
        }
        for (let j = 0; j < restOrderDetails.length; j++) {
            if(i == j){
                orderObj.orderDetails = restOrderDetails[j].toString()
            }
            
        }
        for (let j = 0; j < singleOrderMealsPrice.length; j++) {
            if(i == j){
                const sum = singleOrderMealsPrice[j].reduce((a, b) => a+b,0)
    
                
                orderObj.orderValue = sum
            }
            
            
        }
        return orderObj;
    })
    
        
        
        res.status(200).json(order);
    } catch(error){
        const errorMsg = error.message;
        res.status(500).json({ errorMsg });
    }
}
getMyMeals = async(req, res) => {
    const loggedInRest = req.username.restId;

    try {
        const mealsDetailsForSpecificRestaurant = await queries.getMyMealsQuery(loggedInRest);
        
        mealsDetailsForSpecificRestaurant.forEach((e, i) => {
            if(e.Status == null){
                e.Status = 'Paused'
            }
        });
        res.status(200).json({ mealsDetailsForSpecificRestaurant });
    } catch(error){
        const errorMsg = error.message;
        res.status(500).json({ errorMsg });
    }
}
getMyTodayOrders = async(req, res) => {
    const loggedInrest = req.username.restId;
    const status = 'Delivered'
    let today = new Date().toISOString().slice(0, 10)
    try {
        const myTodayOrders = await queries.getMyTodayOrdersQuery(loggedInrest, status, today);
        let todayOrdersNumb = myTodayOrders[0].dailyOrders;
        
        if(todayOrdersNumb < 1){
            todayOrdersNumb = 0;
        }
        
        res.status(200).json(todayOrdersNumb)
    } catch(error){
        const erroMsg = error.message;
        res.status(500).json({ erroMsg });
    }
}
getMyAllTimeOrders = async(req, res) => {
    const loggedInrest = req.username.restId;
    const status = 'Delivered'
    try {
        const myAllTimeOrders = await queries.getMyAllTimeOrdersQuery(loggedInrest, status);


        let ordersNumb = myAllTimeOrders[0].allTimeOrders;
        if(ordersNumb < 1){
            ordersNumb = 0;
        }
        res.status(200).json(ordersNumb)
    } catch(error){
        const erroMsg = error.message;
        res.status(500).json({ erroMsg });
    }
}
getMyPendingOrders = async(req, res) => {
    const loggedInrest = req.username.restId;
    const status = 'Ordered'
    try {
        const pendingOrders = await queries.getMyPendingOrdersQuery(loggedInrest, status);
        const pendingOrdersNum = pendingOrders[0].pendingOrders
        console.log(pendingOrdersNum)
        
        if(pendingOrdersNum == undefined){
            pendingOrdersNum = 0;
        }
        
        res.status(200).json(pendingOrdersNum)
    } catch(error){
        const erroMsg = error.message;
        res.status(500).json({ erroMsg });
    }
}

acceptOrder = async(req, res) => {
    const orderId = req.query.orderId;
    const loggedInrest = req.username.restId;
    const cartOrderStatus = 'Accepted';

    const orderDetails = await queries.getSingleOrderQuery(orderId);
    const orderToken = orderDetails[0].Order_token;

    
    await queries.updateStatusForCartOrderForSpecificRestaurantAndToken(cartOrderStatus, orderToken, loggedInrest)
    const allCartOrdersForSpecificToken = await queries.getCartOrdersForSpecificOrderToken(orderToken);
    //proveruva dali ostanale naracki so status ordered i gi stava vo counter
    //koa ke stisne i posledniot restaurant accept, nema veke naracki so status ordered i prakja vo orders
    //da se smeni status vo 'In Progress'
    let count = 0;
    for (let i = 0; i < allCartOrdersForSpecificToken.length; i++) {
        
        if(allCartOrdersForSpecificToken[i].status == 'Ordered'){
            count ++;
        }
    }
    
    
    const orderStatus = 'In progress';

    try {
        if(count == 0){
            await queries.acceptOrderQuery(orderStatus, orderId);
        }
        
        res.status(200).json({ message: 'Order Accepted' })
    } catch(error){
        const errorMsg = error.message;
        res.status(500).json({ errorMsg });
    }
}
completeOrder = async(req, res) => {
    const orderId = req.query.orderId;
    const orderStatus = 'Ready for pickup';

    try {
        await queries.completeOrderQuery(orderStatus, orderId);
        res.status(200).json({ message: 'order completed' });
    } catch(error){
        const errorMsg = error.message;
        res.status(500).json({ errorMsg });
    }
}
editRestaurantInfo = async(req, res) => {
    const id = req.username.restId;

    const restaurantInfo = {
        location: req.body.restaurantLocation,
        status: req.body.restaurantStatus,
        image: req.body.restaurantImage,
        phoneNumber: req.body.restaurantPhoneNumber,
        opens: req.body.restaurantOpens,
        closes: req.body.restaurantCloses
    };
    try {
        await queries.editRestaurantInfoQuery(restaurantInfo, id);
        res.status(200);
        res.json({ message: 'Restaurant has been edited!' });
    } catch(error){
        const errorMsg = error.message;
        res.status(500);
        res.json({ message: errorMsg })
    }
}

editRestaurantWorkDays = async(req, res) => {
    const id = req.username.restId;

    const workDays = {
        Monday: req.body.Monday,
        Tuesday: req.body.Tuesday,
        Wednesday: req.body.Wednesday,
        Thursday: req.body.Thursday,
        Friday: req.body.Friday,
        Saturday: req.body.Saturday,
        Sunday: req.body.Sunday
    };
    try {
        await queries.editRestaurantWorkDaysQuery(workDays, id);
        res.status(200);
        res.json({ message: 'Restaurant work days have been edited!' });
    } catch(error){
        const errorMsg = error.message;
        res.status(500);
        res.json({ message: errorMsg })
    }
}

getMyWorkingDays = async(req, res) => {
    const loggedInrest = req.username.restId;
    try {
        const workingDaysData = await queries.getMyWorkingDaysQuery(loggedInrest);
        if(workingDaysData.length == 0){
            workDays = {
                monday: 1,
                tuesday: 1,
                wednesday: 1,
                thursday: 1,
                friday: 1,
                saturday: 1,
                sunday: 1
            }
            const newWorkDays = await queries.addWorkDaysQuery(loggedInrest, workDays);
            res.status(200);
            res.json({ newWorkDays });
        }
        else{res.status(200);
            res.json({ workingDaysData });
        }
  
    } catch(error){
        const errorMsg = error.message;
        res.status(500);
        res.json({ message: errorMsg })
    }
}
editMealStatus = async(req, res) => {
    const status = req.body.status;
    const mealId = req.body.mealId;

    try {
        await queries.editMealStatusQuery(status, mealId);
        res.status(200);
        res.json({ message: 'Meal status has been edited' });
    } catch(error){
        const errorMsg = error.message;
        res.status(500);
        res.json({ message: errorMsg })
    }
};
getNumberOfActiveMeals = async(req, res) => {
    const restId = req.username.restId;
    const status = 'Active'
    try {
        const activeMeals = await queries.getNumberOfActiveMealsQuery(restId, status);
        res.status(200).json(activeMeals[0].Active)
    } catch(error){
        const erroMsg = error.message;
        res.status(500).json({ erroMsg });
    }
}
getNumberOfPausedMeals = async(req, res) => {
    const restId = req.username.restId;
    const status = 'Paused'
    try {
        const pausedMeals = await queries.getNumberOfPausedMealsQuery(restId, status);
        res.status(200).json(pausedMeals[0].Paused)
    } catch(error){
        const erroMsg = error.message;
        res.status(500).json({ erroMsg });
    }
}
getSearchedMeals = async(req, res) => {
    const restId = req.username.restId;
    const searchTerm = req.query.inputValue
    console.log(req.query.inputValue)
    try {
        const searchedmeals = await queries.getSearchedMealsQuery(searchTerm, restId);
        res.status(200).json(searchedmeals)
    } catch(error){
        const erroMsg = error.message;
        res.status(500).json({ erroMsg });
    }
}
getFilteredRevenueByDate = async(req, res) => {
    const restId = req.username.restId;
    const date = req.query.date
    try {
        const filteredRevenue = await queries.getFilteredRevenueByDateQuery(restId, date);
        res.status(200).json(filteredRevenue)
    } catch(error){
        const erroMsg = error.message;
        res.status(500).json({ erroMsg });
    }
}
getMyTwoWeekRevenue = async(req, res) => {
    const restId = req.username.restId;
    
    const today = new Date().toISOString().slice(0, 10);
    const date = new Date();
    date.setDate(date.getDate() - 13);
    const endDate = date.toISOString().slice(0, 10)
    //Date range loop
    var getDaysArray = function(s,e) {for(var a=[],d=new Date(s);d<=e;d.setDate(d.getDate()+1)){ a.push(new Date(d));}return a;};
    let daylist = getDaysArray(new Date(endDate),new Date(today))
    let list = daylist.map((v)=>v.toISOString().slice(0, 10))

    
    try {
        let data = [];
        // reverse loop to populate last to weeks obj starting with today
        for (let i = list.length - 1; i >= 0; i--) {
            const revenueByDate = await queries.getFilteredRevenueByDateQuery(restId, list[i]);
            let rev = revenueByDate[0].revenueByDate
            if(rev == null){
                data[list.length -1 - i] = {revenue: 0,date:list[i]}
            }else{
                data[list.length -1 - i] = {revenue: revenueByDate[0].revenueByDate, date:list[i]}
            } 
        }
        
        res.status(200).json(data)
    } catch(error){
        const erroMsg = error.message;
        res.status(500).json({ erroMsg });
    }
}
module.exports = {
    loginRestaurant,

    getSingleRestaurantOrders,
    getSingleRestaurantOrdersAndDetails,
    getSingleRestaurantActiveOrders,

    getRestaurantRevenue,
    getRestaurantTodaysRevenue,
    getMyWorkingDays,

    resetPassword,
    
    // sendOrder,

    /// new ///
    getMyProfileInfo,
    getMyAllTimeRevenue,
    getMyTodayRevenue,
    getMyOrders,
    getMyLastOrder,
    getMyAllTimeOrders,
    getMyMeals,
    getMyTodayOrders,
    getMyPendingOrders,
    getSearchedMeals,

    getNumberOfActiveMeals,
    getNumberOfPausedMeals,
    getFilteredRevenueByDate,
    getMyTwoWeekRevenue,

    editRestaurantInfo,
    editRestaurantWorkDays,
    editMealStatus,

    acceptOrder,
    completeOrder
}