const queries = require('./query');
const bcrypt = require('bcryptjs'); // not using it, because we dont have hashed passwords
const helper = require('../helper/helper');
const jwt = require('jsonwebtoken');
require('dotenv/config');
const generator = require('generate-password');
const con = require('../DB/database');


// admin login
adminLogin = async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const adminUsernames = await queries.getAllAdminUsernameQuery();
    const adminExists = adminUsernames.some(admin => {
        return username == admin.Username
    });

    if (username == '') {
        res.status(400);
        res.json({
            message: 'Please enter username.'
        });
    } else if (password == '') {
        res.status(400);
        res.json({
            message: 'Please enter your password.'
        })
    } else if (adminExists == false) {
        res.status(400);
        res.json({
            message: 'You have entered wrong username.'
        });
    }
    try {
        const admin = await queries.adminLoginQuery(username);
        // const adminPassword = admin[0].Password;
        const adminId = admin[0].ID;
        // const matchPassword = bcrypt.compareSync(password, adminPassword);
        const matchPassword = admin.some(admin => {
            return password == admin.Password
        });

        if (matchPassword == true) {
            const payload = {
                adminId: adminId
            };

            const token = jwt.sign(payload, process.env.SECRET);
            res.cookie('access_token', token, {
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
            res.redirect('http://localhost:3000/superadmin/dashboard');
        };
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            message: errorMsg
        });
    };
}



// get requests
getAllUsers = async (req, res) => {
    try {
        const usersInfo = await queries.getAllUsersQuery();
        const usersNumber = usersInfo.length;

        const users = usersInfo.map(users => {
            const userObj = {
                user_id: users.ID,
                user_full_name: users.Firstname + ' ' + users.Lastname,
                signup_date: users.Registration_date,
                completedOrders: users.Completed_orders,
                userStatus: users.Status
            };
            return userObj;
        });
        res.status(200);
        res.json({
            users,
            usersNumber
        });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            errorMsg
        })
    };
};
getSingleUser = async (req, res) => {
    const userInfo = req.query.userInfo;

    try {
        const user = await queries.getSingleUserQuery(userInfo);

        res.status(200);
        res.json({
            user
        });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            errorMsg
        });
    }
}

getOverallRevenue = async (req, res) => {
    try {
        const revenue = await queries.getOverallRevenueQuery();

        let array = [];
        let finalRevenue;

        for (var i = 0; i < revenue.length; i++) {
            const price = revenue[i].Price;
            const reducer = (accumulator, currentValue) => accumulator + currentValue;

            array.push(price);
            finalRevenue = array.reduce(reducer);
        };
        if (finalRevenue == undefined) {
            finalRevenue = 0;
        }

        res.status(200);
        res.json({
            revenue: finalRevenue + 'MKD'
        });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            message: errorMsg
        });
    };
}
getTodaysReveue = async (req, res) => {
    const now = new Date();
    const day = ("0" + now.getDate()).slice(-2);
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const year = now.getFullYear();
    const finalDate = year + '-' + month + '-' + day;

    try {
        const todayRevenue = await queries.getTodaysRevenueQuery(finalDate);

        let array = [];
        let finalRevenue;

        for (var i = 0; i < todayRevenue.length; i++) {
            const price = todayRevenue[i].Price;
            const reducer = (accumulator, currentValue) => accumulator + currentValue;

            array.push(price);
            finalRevenue = array.reduce(reducer);
        };

        if (finalRevenue == undefined) {
            finalRevenue = 0;
        }

        res.status(200);
        res.json({
            todayRevenue: finalRevenue + 'MKD'
        });

    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            message: errorMsg
        });
    };
};
getThisMonthRevenue = async (req, res) => {
    try {
        const revenue = await queries.getThisMonthRevenueQuery();

        let array = [];
        let finalRevenue;

        for (var i = 0; i < revenue.length; i++) {
            const price = revenue[i].Price;
            const reducer = (accumulator, currentValue) => accumulator + currentValue;

            array.push(price);
            finalRevenue = array.reduce(reducer);
        };

        if (finalRevenue == undefined) {
            finalRevenue = 0;
        }

        res.status(200);
        res.json({
            revenue: finalRevenue + 'MKD'
        });

    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            message: errorMsg
        });
    }
}

getOnlyTodaysUsers = async (req, res) => {
    // get todays date
    const now = new Date();
    // get todays day month and year
    const day = ("0" + now.getDate()).slice(-2);
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const year = now.getFullYear();
    const finalSignupDate = year + '-' + month + '-' + day;

    try {
        const todaysUsersInfo = await queries.getAllTodaysUsers(finalSignupDate);
        const todaysUsersNumb = todaysUsersInfo.length;
        let todaysUsers;

        if (todaysUsersInfo.length < 1) {
            todaysUsers = 'No new users today.'
        } else {
            todaysUsers = todaysUsersInfo.filter(user => {
                const userObj = {
                    signupDate: user.Registration_date,
                    userId: user.ID,
                    userFullName: user.Firstname + user.Lastname,
                    completedOrders: user.Completed_orders
                }
                return userObj;
            });
        }
        res.status(200);
        res.json({
            todaysUsers,
            todaysUsersNumb
        });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            message: errorMsg
        });
    };
};
getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await queries.getAllRestauransQuery();

        if (restaurants.length < 1) {
            res.status(400);
            res.json({
                message: 'There are not restaurants available.'
            })
        } else {
            res.status(200);
            res.json({
                restaurants
            });
        }
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            errorMsg
        });
    }
};
searchRestaurants = async(req, res) => {
    const restInfo = req.query.restInfo;

    try {   
        const restaurants = await queries.searchRestaurantsQuery(restInfo);
        res.status(200).json({ restaurants });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ errorMsg });
    }
}
getSingleRestaurant = async(req, res) => {
    const restId = req.query.restId;

    try {
        const restaurantInfo = await queries.getSingleRestaurantQuery(restId);

        res.status(200);
        res.json({ restaurantInfo })
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({ message: errorMsg })
    }
}
searchRestaurant = async (req, res) => {
    const restName = req.body.name;

    const restaurants = await queries.getAllRestauransQuery();
    const restExists = restaurants.some(rest => {
        return restName == rest.Name
    });

    if (restName == '') {
        res.status(400);
        res.json({
            message: 'Please enter restaurant name.'
        });
    } else if (restExists == false) {
        res.status(400);
        res.json({
            message: `Restaurant with name ${restName}, does not exist.`
        });
    } else {
        try {
            const restaurant = await queries.getSingleRestaurantQuery(restName);
            res.status(200);
            res.json({
                restaurant
            });
        } catch (error) {
            const errorMsg = error.message;
            res.status(500);
            res.json({
                message: errorMsg
            });
        };
    };
};
getAllCariers = async (req, res) => {
    try {
        const cariersInfo = await queries.getAllCariersQuery();

        if (cariersInfo.length < 1) {
            res.status(400);
            res.json({
                message: 'There are no cariers available.'
            });
        } else {
            const cariers = cariersInfo.map(carier => {
                const carierObj = {
                    id: carier.ID,
                    fistname: carier.Firstname,
                    lastname: carier.Lastname,
                    email: carier.Email,
                    username: carier.Username,
                    city: carier.City,
                    phoneNumber: carier.Phone_number,
                    IDNumber: carier.Identification_number,
                    raiting: carier.Raiting,
                    hoursAvailable: carier.Hours_available,
                    onlineStatus: carier.Online_status,
                    image: carier.Image
                };
                return carierObj;
            });
            res.status(200);
            res.json({
                cariers
            });
        }
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            errorMsg
        });
    };
};
getSingleCarier = async (req, res) => {
    const carierId = req.query.carrierId;

    const cariers = await queries.getAllCariersQuery();
    const carierExists = cariers.some(carier => {
        return carierId == carier.ID
    });

    if (carierExists == false) {
        res.status(400);
        res.json({
            message: `Carier with ID of ${carierId}, has not been found.`
        })
    } else {
        try {
            const carrier = await queries.getSingleCarierByIdQuery(carierId);
           
            res.status(200);
            res.json({
                carrier
            });
        } catch (error) {
            const errorMsg = error.message;
            res.status(500);
            res.json({
                message: errorMsg
            });
        };
    }
};
getAllOnlineCariers = async (req, res) => {
    const onlineStatus = 'Online';

    try {
        const onlineCariers = await queries.getAllOnlineCariersQuery(onlineStatus);
        const onlineCariersNumber = onlineCariers.length;

        res.status(200);
        res.json({
            onlineCariers,
            onlineCariersNumber
        });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            message: errorMsg
        });
    }
};
getAllBusyCariers = async (req, res) => {
    const carierStatus = 'Busy';

    try {
        const busyCariers = await queries.getAllBusyCariersQuery(carierStatus);
        const busyCariersNumber = busyCariers.length;

        res.status(200);
        res.json({
            busyCariers,
            busyCariersNumber
        });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            message: errorMsg
        });
    }
}
searchCarriers = async(req, res) => {
    const carrierInfo = req.query.carrInfo;

    try {
        const cariersInfo = await queries.searchCarriersQuery(carrierInfo);

        const carriers = cariersInfo.map(carier => {
            const carierObj = {
                id: carier.ID,
                fistname: carier.Firstname,
                lastname: carier.Lastname,
                email: carier.Email,
                username: carier.Username,
                city: carier.City,
                phoneNumber: carier.Phone_number,
                IDNumber: carier.Identification_number,
                raiting: carier.Raiting,
                hoursAvailable: carier.Hours_available,
                onlineStatus: carier.Online_status,
                image: carier.Image
            };
            return carierObj;
        });
        res.status(200).json({ carriers });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ errorMsg });
    }
}
getAllPromotions = async (req, res) => {
    try {
        const promotions = await queries.getAllPromotionsQuery();

        if (promotions.length < 1) {
            res.status(400);
            res.json({
                message: 'There are no promotions available.'
            });
        } else {
            res.status(200);
            res.json({
                promotions
            });
        }
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            errorMsg
        });
    }
};

getSinglePromotionByType = async (req, res) => {
    const promoType = req.query.promoType;

    try {
        const promo = await queries.getSinglePromotionByTypeQuery(promoType);

        res.status(200);
        res.json({
            promo
        });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            errorMsg
        });
    }
}
getAllMeals = async (req, res) => {
    try {
        const meals = await queries.getAllMealsQuery();

        if (meals.length < 1) {
            res.status(400);
            res.json({
                message: 'There are no meals available.'
            })
        } else {
            res.status(200);
            res.json({
                meals
            });
        };
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            errorMsg
        })
    }
};
searchMeals = async(req, res) => {
    const mealInfo = req.query.mealInfo;

    try {
        const meals = await queries.searchMealsQuery(mealInfo);
        res.status(200).json({ meals });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ errorMsg })
    }
}
getSinleMealByName = async (req, res) => {
    const mealid = req.query.mealId;

    try {
        const singleMeal = await queries.getSingleMealByIdQuery(mealid);
        res.status(200);
        res.json({
            singleMeal
        });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            mesage: errorMsg
        });
    }
}
getAllOrders = async (req, res) => {
    // const carrierId = req.username.carierId;
    
    getAllMyActiveOrdersQuery = () => {
        const query = "SELECT * FROM orders ORDER BY ID DESC";
        return new Promise((res, rej) => {
            con.query(query, (error, results, fields) =>{
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    };

    getSingleOrderCartItemsQuery = (orderToken) => {
        const query = "SELECT * FROM add_to_cart WHERE order_token = ? ORDER BY id DESC";
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

    getSingleOrderCarrierInChargeQuery = (carrierId) => {
        const query = 'SELECT * FROM cariers WHERE ID = ?';
        return new Promise((res, rej) => {
            con.query(query, [carrierId], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    const myActiveOrders = await getAllMyActiveOrdersQuery();

    const orderCarriers = [];
    const cartItems = [];
    for(var i = 0; i < myActiveOrders.length; i++){
        const orderToken = myActiveOrders[i].Order_token;
        const orderCarrier = myActiveOrders[i].Carrier_id;

        const singleOrderCartItems = await getSingleOrderCartItemsQuery(orderToken);
        cartItems.push(singleOrderCartItems);

        const singleOrderCarrier = await getSingleOrderCarrierInChargeQuery(orderCarrier);
        // console.log(singleOrderCarrier[0]);  
        orderCarriers.push(singleOrderCarrier[0]);
    }

    console.log(orderCarriers);
    // console.log(cartItems);

    try {
        res.status(200).json({ myActiveOrders, cartItems, orderCarriers });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ message: errorMsg });
    }
};
getAllOrdersNumber = async(req, res) => {
    getOverallOrdersQuery = () => {
        const query = 'SELECT * FROM orders';
        return new Promise((res, rej) => {
            con.query(query, (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }
    const allOrders = await getOverallOrdersQuery();
    const allOrdersNumb = allOrders.length;
    try {
        res.status(200).json({ allOrdersNumb });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ message: errorMsg });
    }
}
getAllPendingOrders = async (req, res) => {
    // const orderStatus = 'Delivered';
    try {
        const orders = await queries.getAllPendingOrdersQuery();
        const ordersNumber = orders.length;

        res.status(200);
        res.json({ ordersNumber });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            message: errorMsg
        });
    }
}
getSingleOrder = async (req, res) => {
    const orderId = req.query.orderId;

    try {
        const singleOrder = await getSingleOrderQuery(orderId);
        const singleOrderRestId = singleOrder[0].Restaurant_id;
        const singleOrderClientId = singleOrder[0].Client_id;

        const singleOrderMealId = singleOrder[0].Meal_id;
        const restInfo = await queries.getSingleRestaurantByIdQuery(singleOrderRestId);
        const restName = restInfo[0].Name;
        const clientInfo = await queries.getSingleClientByIdQuery(singleOrderClientId);
        const clientFullName = clientInfo[0].Firstname + ' ' + clientInfo[0].Lastname;
        const mealInfo = await queries.getSingleMealByIdQuery(singleOrderMealId);
        const mealName = mealInfo[0].Name;


        const singleOrderObj = singleOrder.map(order => {
            const orderObj = {
                ID: order.ID,
                Location: order.Location,
                Payment_method: order.Payment_method,
                Client_name: clientFullName,
                Restaurant_name: restName,
                Order_status: order.Order_Status,
                Amount: order.Amount,
                Price: order.Price,
                Special_requirements: order.Special_requirements,
                Meal_name: mealName,
                Date_ordered: order.Date_ordered,
                Time_ordered: order.Time_ordered,
            };
            return orderObj;
        })



        res.status(200);
        res.json({
            singleOrderObj
        });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            message: errorMsg
        });
    }
}
getOnlyTodaysOrders = async (req, res) => {
    const now = new Date();
    const day = ("0" + (now.getDate())).slice(-2);
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const year = now.getFullYear();
    const finalDate = year + '-' + month + '-' + day;

    try {
        let todayOrders = await queries.getOnlyTodayOrderQuery(finalDate);
        let todayOrdersNumb = todayOrders.length;
        res.status(200);
        res.json({
            todayOrdersNumb
        });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            message: errorMsg
        });
    };
};
getAllLiveOrders = async (req, res) => {
    try {
        const activeOrders = await queries.getAllActiveOrdersQuery();
        const activeOrdersNumb = activeOrders.length;
        res.status(200);
        res.json({
            activeOrdersNumb,
            activeOrders
        })
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            message: errorMsg
        });
    };
};
getAllCategories = async (req, res) => {
    try {
        const categories = await queries.getAllCategoriesQuery();
        res.status(200);
        res.json({
            categories
        });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            message: errorMsg
        });
    }
}
getSingleCategory = async (req, res) => {
    const catId = req.query.catId;
    try {
        const singleCategory = await queries.getSingleCategoryQuery(catId);
        res.status(200);
        res.json({
            singleCategory
        });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            message: errorMsg
        });
    }
}

getSinglePromotion = async (req, res) => {
    const promoId = req.query.promoId;

    try {
        const promotion = await queries.getSinglePromotionQuery(promoId);

        res.status(200);
        res.json({
            promotion
        });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            errorMsg
        });
    }
}
getsingleCarrierRevenue = async(req, res) => {
    const carrierId = req.query.carrierId;
    const value = req.query.value;
    
    console.log(carrierId);
    console.log(value);

    let array = [];
    let finalRevenue;

    if(value == 1){
        getSingleCarrierTodayRevenueQuery = (carrierId) => {
            const query = 'SELECT * FROM orders WHERE DATE(Date_ordered) = CURDATE() AND Carrier_id = ?';
            return new Promise((res, rej) => {
                con.query(query, [carrierId], (error, results, fields) => {
                    if(error){
                        rej(error)
                    } else {
                        res(results)
                    }
                })
            })
        };

        const revenue = await getSingleCarrierTodayRevenueQuery(carrierId);

        if(revenue.length < 1) {
            finalRevenue = 0;
        }

        for(var i = 0; i < revenue.length; i++) {
            const price = revenue[i].Price;
            const reducer = (accumulator, currentValue) => accumulator + currentValue;

            array.push(price);
            finalRevenue = array.reduce(reducer);
        };

    } else if(value == 2){
        getSingleCarrierThisWeelRevenueQuery = (carrierId) => {
            const query = "SELECT * FROM Orders WHERE YEARWEEK(`Date_ordered`, 1) = YEARWEEK(CURDATE(), 1) AND Carrier_id = ? AND Order_status = 'Delivered'";
            return new Promise((res, rej) => {
                con.query(query, [carrierId], (error, results, fields) => {
                    if(error){
                        rej(error) 
                    } else {
                        res(results)
                    }
                })
            })
        }

        const revenue = await getSingleCarrierThisWeelRevenueQuery(carrierId);

        if(revenue.length < 1) {
            finalRevenue = 0;
        }

        for(var i = 0; i < revenue.length; i++) {
            const price = revenue[i].Price;
            const reducer = (accumulator, currentValue) => accumulator + currentValue;

            array.push(price);
            finalRevenue = array.reduce(reducer);
        };
    } else if(value == 3){
        getSingleCarrierThisMonthRevenueQuery = (carrierId) => {
            const query = "SELECT Price FROM orders WHERE MONTH(Date_ordered) = MONTH(CURDATE()) AND YEAR(Date_ordered) = YEAR(CURDATE()) AND Carrier_id = ?";
            return new Promise((res, rej) => {
                con.query(query, [carrierId], (error, results, fields) => {
                    if(error){
                        rej(error)
                    } else {
                        res(results)
                    }
                })
            })
        }

        const revenue = await getSingleCarrierThisMonthRevenueQuery(carrierId);

        if(revenue.length < 1) {
            finalRevenue = 0;
        }

        for(var i = 0; i < revenue.length; i++) {
            const price = revenue[i].Price;
            const reducer = (accumulator, currentValue) => accumulator + currentValue;

            array.push(price);
            finalRevenue = array.reduce(reducer);
        };
    }

    try {
        res.status(200).json({ finalRevenue });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ message: errorMsg });
    }
}
getSingleCarrierDailyRevenue = async(req, res) => {
    const carrierId = req.query.carrierId;

    let array = [];
    let finalRevenue;

    getSingleCarrierTodayRevenueQuery = (carrierId) => {
        const query = 'SELECT * FROM orders WHERE DATE(Date_ordered) = CURDATE() AND Carrier_id = ?';
        return new Promise((res, rej) => {
            con.query(query, [carrierId], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    };

    const revenue = await getSingleCarrierTodayRevenueQuery(carrierId);

    if(revenue.length < 1) {
        finalRevenue = 0;
    }

    for(var i = 0; i < revenue.length; i++) {
        const price = revenue[i].Price;
        const reducer = (accumulator, currentValue) => accumulator + currentValue;

        array.push(price);
        finalRevenue = array.reduce(reducer);
    };

    try {
        res.status(200).json({ finalRevenue });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ message: errorMsg });
    }
}


// post requests
addNewRestaurant = async (req, res) => {

    const restaurantInfo = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        location: req.body.location,
        // workingHours: req.body.workingHours,
        foodCategory: req.body.foodCategory,
        phoneNumber: req.body.phoneNumber,
        openingHour: req.body.openingHour,
        closingHour: req.body.closingHour,
        email: req.body.email,
        image: req.body.imageName,
        status: 'Online'
    };

    const restaurants = await queries.getAllRestauransQuery();
    const restNameExists = restaurants.some(rest => {
        return restaurantInfo.name == rest.Name
    });
    const restUsernameExists = restaurants.some(rest => {
        return restaurantInfo.username == rest.Username
    });

    if (restaurantInfo.name == '' || restaurantInfo.username == '' || restaurantInfo.password == '' || restaurantInfo.location == '' || restaurantInfo.workingHours == '' || restaurantInfo.foodCategory == '') {
        res.status(400);
        res.json({
            message: 'All fields need to be filled with informaton.'
        });
    } else if (restNameExists == true) {
        res.status(400);
        res.json({
            message: `Restaurant with name ${restaurantInfo.name}, already exists.`
        });
    } else if (restUsernameExists == true) {
        res.status(400);
        res.json({
            message: `Restaurant with username ${restaurantInfo.username}, already exists.`
        });
    } else {
        try {
            // const getCategoryId = await queries.getFoodCategoryIdQuery(restaurantInfo.foodCategory);
            // const categoryId = getCategoryId[0].ID;

            // const passHash = bcrypt.hashSync(restaurantInfo.password, 10);
            await queries.addNewRestaurantQuery(restaurantInfo);
            res.status(200);
            res.json({
                message: 'retaurant has been registered'
            });
        } catch (error) {
            const errorMsg = error.message;
            res.status(500);
            res.json({
                errorMsg
            });
        };
    };
};
removeRestaurant = async (req, res) => {
    const restId = req.body.restId;
    try {
        await queries.deleteRestaurantQuery(restId);
        res.status(200);
        res.json({ message: 'restaurant deleted' });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            message: errorMsg
        });
    }
}
addNewCarier = async (req, res) => {
    const password = generator.generate({
        length: 10,
        numbers: true
    });

    const carierInfo = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        idNumb: req.body.idNumb,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        phNumber: req.body.phNumber,
        // city: req.body.city,
        hoursAvailable: req.body.hoursAvailable,
        location: req.body.locations,
        imageName: req.body.imageName,
        onlineStatus: 'Offline',
        status: 'Free',
        fullName: req.body.firstname + req.body.lastname
    };

    const cariers = await queries.getAllCariersQuery();
    const carierUsernameExists = cariers.some(carier => {
        return carierInfo.username == carier.Username
    });
    const carierEmailExists = cariers.some(carier => {
        return carierInfo.email == carier.Email
    });
    const carierIdNumbExists = cariers.some(carier => {
        return carierInfo.idNumber == carier.Identification_number
    });

    if (carierInfo.name == '' || carierInfo.lastname == '' || carierInfo.email == '' || carierInfo.username == '' || carierInfo.password == '' || carierInfo.city == '' || carierInfo.phoneNumber == '' || carierInfo.idNumber == '') {
        res.status(400);
        res.json({
            message: 'All fields need to be filled with informaton.'
        });
    } else if (helper.mediumRegex.test(carierInfo.password) == false) {
        res.status(400);
        res.json({
            message: 'Password needs to be at least six characters long, needs to contain at least one uppercase character and one number.'
        })
    } else if (carierUsernameExists == true) {
        res.status(400);
        res.json({
            message: `Carier with username ${carierInfo.username}, already exists.`
        })
    } else if (carierEmailExists == true) {
        res.status(400);
        res.json({
            message: `Carier with email ${carierInfo.email}, already exists.`
        })
    } else if (carierIdNumbExists == true) {
        res.status(400);
        res.json({
            message: `Carier with ID number ${carierInfo.idNumber}, already exists.`
        })
    } else {
        try {
            // const passHash = bcrypt.hashSync(carierInfo.password, 10);
            await queries.addNewCarierQuery(carierInfo);
            res.status(200);
            res.json({
                message: 'New carier added.'
            });
        } catch (error) {
            const errorMsg = error.message;
            res.status(500);
            res.json({
                errorMsg
            });
        }
    };
};
addNewMeal = async (req, res) => {
    const mealInfo = {
        name: req.body.name,
        price: req.body.price,
        deliveryTime: req.body.deliveryTime,
        category: req.body.category,
        ingridients: req.body.ingridients,
        restaurant: req.body.restaurant,
        desc: req.body.description,
        image: req.body.imageName,
        deliveryPrice: 30,
        calories: req.body.calories,
        proteins: req.body.proteins,
        carbohydrates: req.body.carbohydrates,
        fat: req.body.fat,
        status: 'Active',
        comments: 0,
        orders: 0,
        views: 0
    };

    const foodCategory = req.body.category;
    updateCategoryMealsNumQuery = (foodCategory) => {
        const query = 'UPDATE food_category SET Meals = Meals + 1 WHERE Category = ?';
        return new Promise((res, rej) => {
            con.query(query, [foodCategory], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    };
    await updateCategoryMealsNumQuery(foodCategory);

    // console.log(mealInfo);

    const restaurantIdInfo = await queries.getSingleRestaurantIdByNameQuery(mealInfo.restaurant);
    const restaurantId = restaurantIdInfo[0].ID;


    // if (mealInfo.name == '' || mealInfo.price == '' || mealInfo.deliveryTime == '' || mealInfo.ingridientsId == '' || mealInfo.menuId == '') {
    //     res.status(400);
    //     res.json({
    //         message: 'Please enter all fields.'
    //     })
    // } else {
        try {
            await queries.addNewMealQuery(mealInfo, restaurantId);
            res.status(200);
            res.json({
                message: 'New meal added.'
            });
        } catch (error) {
            const errorMsg = error.message;
            res.status(200);
            res.json({
                errorMsg
            });
        }
    // }
};

addNewPromotion = async (req, res) => {
    const promoInfo = {
        exDate: req.body.ex_date,
        promoLimit: req.body.limit,
        code: req.body.code,
        promoType: req.body.promo_type,
        promoFreebly: req.body.promo_freebly,
        promoDiscount: req.body.promo_discount
    };
    const now = new Date();
    const day = ("0" + now.getDate()).slice(-2);
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const year = now.getFullYear();
    const dateCreated = year + '-' + month + '-' + day;


    const promotions = await queries.getAllPromotionsQuery();
    const promoExists = promotions.some(promo => {
        return promoInfo.code == promo.Code
    });

    if (promoInfo.percentage == '' || promoInfo.code == '' || promoInfo.exDate == '' || promoInfo.amount == '' || promoInfo.promoType == '' || promoInfo.promoDesc == '') {
        res.status(400);
        res.json({ message: 'Please enter all fields.' });
    } 
    
    if (promoExists == true) {
        res.status(400);
        res.json({ message: `Promotion with code ${promoInfo.code}, already exists.` })
    } else {
        try {
            await queries.addNewPromotionQuery(promoInfo, dateCreated);
            res.status(200);
            res.json({ message: 'promo added' });
        } catch (error) {
            const errorMsg = error.message;
            res.status(500);
            res.json({ errorMsg })
        }
    }
};
addNewCategory = async (req, res) => {
    // const catName = req.body.name;
    // const image = req.body.image;

    const categoryObj = {
        catName: req.body.name,
        image: req.body.image,
        views: 0,
        orders: 0,
        position: 0,
        meals: 0
    }

    if (categoryObj.catName == '') {
        res.status(400);
        res.json({
            message: 'Please enter category name.'
        })
    } else {

        try {
            await queries.addNewCategoryQuery(categoryObj);
            res.status(200);
            res.json({
                message: 'category added'
            })
        } catch (error) {
            const errorMsg = error.message;
            res.status(500);
            res.json({
                errorMsg
            });
        }
    }
}


// put requests
editRestaurant = async (req, res) => {
    const restId = req.body.restId;
    console.log(restId);

    // console.log(req.body);
    const restaurantInfo = {
        restName: req.body.restName,
        restLocation: req.body.restLocation,
        restUsername: req.body.restusername,
        restPass: req.body.restPass,
        restNumb: req.body.restNumb,
        restEmail: req.body.restEmail,
        restOpen: req.body.restOpen,
        restClose: req.body.restClose,
        restCategory: req.body.category,
        image: req.body.image
    };
    console.log(restaurantInfo);

    const restaurants = await queries.getSingleRestaurantQuery(restId);

    const editRest = restaurants.filter(rest => {
        if (restaurantInfo.restName == '') {
            restaurantInfo.restName = rest.Name
        } else {
            rest.Name = restaurantInfo.restName
        }

        if (restaurantInfo.restUsername == '') {
            restaurantInfo.restUsername = rest.Username
        } else {
            rest.Username = restaurantInfo.restUsername
        }

        if (restaurantInfo.restLocation == '') {
            restaurantInfo.restLocation = rest.Location
        } else {
            rest.Location = restaurantInfo.restLocation
        }

        if(restaurantInfo.restPass == ''){
            restaurantInfo.restPass = rest.Password
        } else {
            rest.Password = restaurantInfo.restPass
        }

        if(restaurantInfo.restNumb == ''){
            restaurantInfo.restNumb = rest.Phone_number
        } else {
            rest.Phone_number = restaurantInfo.restNumb
        }

        if(restaurantInfo.restEmail == ''){
            restaurantInfo.restEmail = rest.Email
        } else {
            rest.Email = restaurantInfo.restEmail
        }

        if(restaurantInfo.restOpen == ''){
            restaurantInfo.restOpen = rest.Opens
        } else {
            rest.Opens = restaurantInfo.restOpen
        }

        if(restaurantInfo.restClose == ''){
            restaurantInfo.restClose = rest.Closes
        } else {
            rest.Closes = restaurantInfo.restClose
        }

        if(restaurantInfo.restCategory == ''){
            restaurantInfo.restCategory = rest.Food_category
        } else {
            rest.Food_category = restaurantInfo.restCategory
        }

        if(restaurantInfo.image == undefined){
            restaurantInfo.image = rest.Image
        } else {
            rest.Image = restaurantInfo.image
        }
        
        return rest;
    });

    const finalResults = editRest[0];

    try {
        await queries.editRestaurantQuery(finalResults, restId);
        res.status(200);
        res.json({
            message: 'rest edited'
        })
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            errorMsg
        })
    }
};
changeRestOnlineStatus = async(req, res) => {
    const slider = req.query.slider;
    const restId = req.query.restId;
    // console.log(req.query);

    let restStatus;
    let mealStatus;

    if(slider == 'checked'){
        restStatus = 'Offline'
        mealStatus = 'Paused'
    } else {
        restStatus = 'Online'
        mealStatus = 'Active'
    }

    changeRestOnlineStatusQuery = (restStatus, restId) => {
        const query = "UPDATE restaurants SET Status = ? WHERE ID = ?";
        return new Promise((res, rej) => {
            con.query(query, [restStatus, restId], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }
    changeRestMealsStatus = (mealStatus, restId) => {
        const query = 'UPDATE meals SET Status = ? WHERE Restaurant_id = ?';
        return new Promise((res, rej) => {
            con.query(query, [mealStatus, restId], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    };

    try {
        await changeRestOnlineStatusQuery(restStatus, restId);
        await changeRestMealsStatus(mealStatus, restId);
        res.status(200).json({ mess: 'status changed' });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({ errorMsg });
    }
}
editCarier = async (req, res) => {
    const carrierId = req.body.carrierId;

    const carrierInfo = {
        name: req.body.firstname,
        lastname: req.body.lastname,
        idNumber: req.body.idNumber,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        hoursAvailable: req.body.hoursAvailable,
        phoneNumber: req.body.phNumber,
        locations: req.body.locations
    };

    const carrier = await queries.getSingleCarierByIdQuery(carrierId);

    const editCarr = carrier.filter(carrier => {
        if(carrierInfo.name == ''){
            carrierInfo.name = carrier.Firstname
        } else {
            carrier.Firstname = carrierInfo.name
        }

        if(carrierInfo.lastname == ''){
            carrierInfo.lastname = carrier.Lastname
        } else {
            carrier.Lastname = carrierInfo.lastname
        }

        if(carrierInfo.email == ''){
            carrierInfo.email = carrier.Email
        } else {
            carrier.Email = carrierInfo.email
        }

        if(carrierInfo.username == ''){
            carrierInfo.username = carrier.Username 
        } else {
            carrier.Username = carrierInfo.username
        }

        if(carrierInfo.idNumber == ''){
            carrierInfo.idNumber = carrier.Identification_number
        } else {
            carrier.Identification_number = carrierInfo.idNumber
        }

        if(carrierInfo.password == ''){
            carrierInfo.password = carrier.Password
        } else {
            carrier.Password = carrierInfo.password
        }

        if(carrierInfo.hoursAvailable == ''){
            carrierInfo.hoursAvailable = carrier.Hours_available
        } else {
            carrier.Hours_available = carrierInfo.hoursAvailable
        }

        if(carrierInfo.phoneNumber == ''){
            carrierInfo.phoneNumber = carrier.Phone_number
        } else {
            carrier.Phone_number = carrierInfo.phoneNumber
        }

        if(carrierInfo.locations == ''){
            carrierInfo.locations = carrier.City
        } else {
            carrier.City = carrierInfo.locations
        }

        return carrier;
    });

    const finalResults = editCarr[0];

    try {
        await queries.editCarierQuery(finalResults, carrierId);
        res.status(200);
        res.json({
            message: 'carrier edited'
        })
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            errorMsg
        })
    }

};

editMeal = async (req, res) => {
    const mealId = req.body.mealId;
    const mealInfo = {
        name: req.body.mealName,
        price: req.body.mealPrice,
        desc: req.body.mealDesc,
        category: req.body.mealCat,
        rest: req.body.mealRest,
        calories: req.body.mealCal,
        proteins: req.body.mealPro,
        fats: req.body.mealFats,
        carbs: req.body.mealCarbs,
        delTime:req.body.mealDelTime,
        delPrice: req.body.mealDelPrice,
        ingr: req.body.ingridients
    };
    // console.log(mealInfo);

    const meal = await queries.getSingleMealByIdQuery(mealId);

    const editMeal = meal.filter(meal => {
        if(mealInfo.name == ''){ 
            mealInfo.name = meal.Name 
        } else { 
            meal.Name = mealInfo.name 
        }

        if(mealInfo.price == ''){
            mealInfo.price = meal.Price
        } else {
            meal.Price = mealInfo.price
        }

        if(mealInfo.desc == ''){
            mealInfo.desc = meal.Description
        } else {
            meal.Description = mealInfo.desc
        }

        if(mealInfo.category == ''){
            mealInfo.category = meal.Food_category
        } else {
            meal.Food_category = mealInfo.category
        }

        if(mealInfo.rest == ''){
            mealInfo.rest = meal.Restaurant_name
        } else {
            meal.Restaurant_name = mealInfo.rest
        }

        if(mealInfo.calories == ''){
            mealInfo.calories = meal.Calories
        } else {
            meal.Calories = mealInfo.calories
        }

        if(mealInfo.proteins == ''){
            mealInfo.proteins = meal.Proteins
        } else {
            meal.Proteins = mealInfo.proteins
        }

        if(mealInfo.fats == ''){
            mealInfo.fats = meal.Fat
        } else {
            meal.Fat = mealInfo.fats
        }

        if(mealInfo.carbs ==  ''){
            mealInfo.carbs = meal.Carbohydrates
        } else {
            meal.Carbohydrates = mealInfo.carbs
        }

        if(mealInfo.delTime == ''){
            mealInfo.delTime = meal.Delivery_time
        } else {
            meal.Delivery_time = mealInfo.delTime
        }

        if(mealInfo.delPrice == ''){
            mealInfo.delPrice = meal.Delivery_price
        } else {
            meal.Delivery_price =mealInfo.delPrice
        }

        if(mealInfo.ingr == ''){
            mealInfo.ingr = meal.Ingridients
        } else {
            meal.Ingridients = mealInfo.ingr
        }

        return meal;
    })
    const mealFinalInfo = editMeal[0];
    // console.log(mealFinalInfo);

    try {
        await queries.editMealQuery(mealFinalInfo, mealId);
        res.status(200);
        res.json({
            message: 'meal edited'
        })
    } catch (error) {
        // console.log(e)
        const errorMsg = error.message;
        res.status(500);
        res.json({
            errorMsg
        })
    }
};
editPromoCode = async (req, res) =>{
    const promoId = req.query.promoId;
    const data = req.body;

    try {
        await queries.editPromotionQuery(data, promoId);
        res.status(200);
        res.json({ message: 'promo edited' });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({ message: errorMsg });
    }
}


editOrder = async (req, res) => {
    const orderId = req.query.orderId;

    const orderInfoForUpdate = {
        amount: req.body.amount,
        orderStatus: req.body.order_status,
        specialRequirements: req.body.special_requirements,
        mealId: null,
        orderId: null
    };

    const orders = await queries.getAllOrdersQuery();
    const orderExists = orders.some(order => {
        return orderId == order.ID
    });

    const orderDetails = await queries.getOrderDetailsQuery(orderId);
    const editOrderInfo = orderDetails.filter(order => {
        if (orderInfoForUpdate.amount == '') {
            orderInfoForUpdate.amount = order.Amount
        } else {
            order.Amount = orderInfoForUpdate.amount
        }

        if (orderInfoForUpdate.orderStatus == '') {
            orderInfoForUpdate.order = order.Order_status
        } else {
            order.Order_status = orderInfoForUpdate.orderStatus
        }

        if (orderInfoForUpdate.specialRequirements == '') {
            orderInfoForUpdate.specialRequirements = order.Special_requirements
        } else {
            order.Special_requirements = orderInfoForUpdate.specialRequirements
        }

        if (orderInfoForUpdate.mealId == null) {
            orderInfoForUpdate.mealId = order.Meal_id
        } else {
            order.Meal_id = orderInfoForUpdate.mealId
        }

        return order;
    });

    const orderFinalInfo = editOrderInfo[0];

    if (orderExists == false) {
        res.status(400);
        res.json({
            message: `Order with ID of ${orderId}, does not exist.`
        })
    } else {
        try {
            await queries.editOrderDetailsQuery(orderFinalInfo, orderId);
            res.status(200);
            res.json({
                message: 'Order updated.'
            });
        } catch (error) {
            const errorMsg = error.message;
            res.status(500);
            res.json({
                message: errorMsg
            });
        };
    };
};
editCategory = async (req, res) => {
    const catId = req.query.catId;
    const categoryInfo = {
        categoryName: req.body.categoryName,
        catImage: req.body.catImage
    };
    // console.log(req.body);

    const orderDetails = await queries.getSingleCategoryQuery(catId);
    const orderDetailsInfo = orderDetails.filter(category => {
        if (categoryInfo.categoryName == '') {
            categoryInfo.categoryName = category.Category
        } else {
            category.Category = categoryInfo.categoryName
        }

        if (categoryInfo.catImage == undefined) {
            categoryInfo.catImage = category.Image
        } else {
            category.Image = categoryInfo.catImage
        }

        return category;
    });

    const catFinalInfo = orderDetailsInfo[0];

    try {
        await queries.editCategoryQuery(catFinalInfo, catId);

        res.status(200);
        res.json({
            message: 'category edited'
        });
    } catch (error) {
        const errorMsg = error.message;
        res.status(200);
        res.json({
            message: errorMsg
        });
    }
}

// delete requests
deletePromotion = async (req, res) => {
    const promoId = req.query.promoId;
        try {
            await queries.deletePromoQuery(promoId);
            res.status(200);
            res.json({
                message: `promo deleted`
            });
        } catch (error) {
            const errorMsg = error.message;
            res.status(500);
            res.json({
                message: errorMsg
            });
        }
};
deleteMeal = async (req, res) => {
    const mealId = req.query.mealId;
    
    getSingleMealQuery = (mealId) => {
        const query = 'SELECT * FROM meals WHERE ID = ?';
        return new Promise((res, rej) => {
            con.query(query, [mealId], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    const meal = await getSingleMealQuery(mealId);
    const mealCat = meal[0].Food_category;

    changeMealCountOnDeleteQuery = (mealCat) => {
        const query = 'UPDATE food_category SET Meals = Meals - 1 WHERE Category = ?';
        return new Promise((res, rej) => {
            con.query(query, [mealCat], (error, results, fields) => {
                if(error){ 
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        await queries.deleteMealQuery(mealId);
        await changeMealCountOnDeleteQuery(mealCat);

        res.status(200);
        res.json({ message: 'meal deleted' });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({ message: errorMsg });
    }
}
deleteCarrier = async (req, res) => {
    const carrierId = req.query.carrierId;

    try {
        await queries.deleteCarrierQuery(carrierId);
        res.status(200);
        res.json({
            message: 'carrier removed'
        });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            errorMsg
        });
    }
}
deleteCategory = async(req,res) => {
    const catId = req.query.catId;

    try {
        await queries.deleteCategoryQuery(catId);
        res.status(200).json({ message: 'category deleted' });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ message: errorMsg });
    }
}
deleteOrder = async(req, res) => {
    const orderId = req.query.orderId;
    console.log(orderId);

    deleteOrderQuery = (orderId) => {
        const query = 'DELETE FROM orders WHERE ID = ?';
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

    try {
        await deleteOrderQuery(orderId);
        res.status(200).json({ message: 'order deleted' });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ message: errorMsg });
    }
}


getSingleCarrierInfo = async (req, res) => {
    const carrierId = req.query.carrierId;
    try {
        const carrierInfo = await queries.getSingleCarierByIdQuery(carrierName);
        res.status(200);
        res.json({
            carrierInfo
        });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            message: errorMsg
        })
    }
}

searchUsers = async(req, res) => {
    const info = req.query.info;

    searchUsersQuery = (info) => {
        const query = "SELECT * FROM clients WHERE Firstname LIKE CONCAT('%', ?, '%') OR Lastname LIKE CONCAT('%', ?, '%')";
        return new Promise((res, rej) => {
            con.query(query, [info, info], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        const searchedUser = await searchUsersQuery(info);
        res.status(200).json({ searchedUser });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ message: errorMsg });
    }
}
getAllRestApplications = async(req, res) => {
    
    getAllRestaurantsApplicatonsQuery = () => {
        const query = 'SELECT * FROM restaurant_applications';
        return new Promise((res, rej) => {
            con.query(query, (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        const restApplications = await getAllRestaurantsApplicatonsQuery();
        res.status(200).json({ restApplications });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ message: errorMsg });
    }
}
getAllCarrApplications = async(req, res) => {

    getAllCarrierApplicationsQuery = () => {
        const query = 'SELECT * FROM carrier_applications';
        return new Promise((res, rej) => {
            con.query(query, (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        const carrApplications = await getAllCarrierApplicationsQuery();
        res.status(200).json({ carrApplications });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ message: errorMsg });
    }
}
getAllApplications = async(req, res) => {

    getAllApplicationsQuery = () => {
        const query = 'SELECT * FROM applications';
        return new Promise((res, rej) => {
            con.query(query, (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        const applications = await getAllApplicationsQuery();
        res.status(200).json({ applications });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ message: errorMsg });
    }
}
deleteApplication = async(req, res) => {
    const appId = req.query.appId;

    deleteAppQuery = (appId) => {
        const query = 'DELETE FROM applications WHERE ID = ?';
        return new Promise((res, rej) => {
            con.query(query, [appId], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    };

    try {
        await deleteAppQuery(appId);
        res.status(200).json({ message: 'deleted' });
    } catch (error) {
        const errorMsg = error.message;
        res.status(500).json({ message: errorMsg });
    }
}

module.exports = {
    adminLogin,

    getOverallRevenue,
    getTodaysReveue,
    getThisMonthRevenue,

    getAllUsers,
    getOnlyTodaysUsers,
    getSingleUser,
    getSinglePromotion,
    getSinglePromotionByType,
    searchUsers,

    getAllRestaurants,
    getSingleRestaurant,
    addNewRestaurant,
    editRestaurant,
    searchRestaurant,
    removeRestaurant,
    searchRestaurants,
    changeRestOnlineStatus,
    getAllRestApplications,

    addNewCarier,
    getAllOnlineCariers,
    getAllBusyCariers,
    editCarier,
    getAllCariers,
    getSingleCarier,
    deleteCarrier,
    getSingleCarrierInfo,
    searchCarriers,
    getsingleCarrierRevenue,
    getSingleCarrierDailyRevenue,
    getAllCarrApplications,

    addNewMeal,
    editMeal,
    getAllMeals,
    getSinleMealByName,
    deleteMeal,
    searchMeals,

    addNewPromotion,
    getAllPromotions,
    deletePromotion,
    editPromoCode,

    getAllOrders,
    getAllOrdersNumber,
    getSingleOrder,
    getAllLiveOrders,
    getOnlyTodaysOrders,
    editOrder,
    getAllPendingOrders,
    deleteOrder,

    getAllCategories,
    addNewCategory,
    getSingleCategory,
    editCategory,
    deleteCategory,

    getAllApplications,
    deleteApplication,

}