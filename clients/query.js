const con = require('../DB/database');


// get requests
getAllUsersQuery = () => {
    const query = 'SELECT * FROM clients';
    return new Promise((res, rej) => {
        con.query(query, (error, results, fields) => {
            if(error) {
                rej(error);
            } else {
                res(results);
            }
        });
    });
};
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
getAllEmailsQuery = () => {
    const query = 'SELECT Email FROM clients';
    return new Promise((res, rej) => {
        con.query(query, (error, results, fields) => {
            if(error) {
                rej(error);
            } else {
                res(results)
            }
        });
    });
};

getAllUsernamesQuery = () => {
    const query = 'SELECT Username FROM clients';
    return new Promise((res, rej) => {
        con.query(query, (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};

getSpecifiUserCompletedOrdersAmountQuery = (userId) => {
    const query = 'SELECT Completed_orders FROM clients WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [userId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};

getCartQuery = (userId) => {
    const query = 'SELECT * FROM cart WHERE Client_id = ?';
    return new Promise((res, rej) => {
        con.query(query, [userId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
getSpecificCartItemAmountQuery = (mealId, clientId) => {
    const query = 'SELECT Amount FROM cart_items WHERE Meal_id = ? AND Client_id = ?';
    return new Promise((res, rej) => {
        con.query(query, [mealId, clientId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
getPriceFormSpecificItemInCartQuery = (mealId, userId) => {
    const query = 'SELECT Meal_price FROM cart_items WHERE Meal_id = ? AND Client_id = ?';
    return new Promise((res, rej) => {
        con.query(query, [mealId, userId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
getMealIdFromCartItemsQuery = (userId) => {
    const query = 'SELECT Meal_id FROM cart_items WHERE Client_id = ?';
    return new Promise((res, rej) => {
        con.query(query, [userId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
getRestaurantIdFromMealsByMealIdQuery = (mealId) => {
    const query = 'SELECT Restaurant_id FROM meals WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [mealId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
getSingleCartItemQuery = (status, userId) => {
    const query = 'SELECT * FROM add_to_cart WHERE status = ? AND session_id = ?';
    return new Promise((res, rej) => {
        con.query(query, [status, userId],(error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};

getSingleOrderIdQuery = (userId) => {
    const query = 'SELECT ID FROM orders WHERE Client_id = ?';
    return new Promise((res, rej) => {
        con.query(query, [userId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};

getTodaysLoggedInUserCartItemsInfoQuery = (userId, date) => {
    const query = 'SELECT * FROM cart_items WHERE Client_id = ? AND Created_on = ?';
    return new Promise((res, rej) => {
        con.query(query, [userId, date], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};

getMyOrders = (userId) => {
    const query = 'SELECT ID, Time_ordered, Date_ordered, Order_status, Meals, Price FROM orders WHERE user_id = ? ORDER BY ID DESC';
    return new Promise((res, rej) => {
        con.query(query, [userId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};





getSingleClientTodaysOrderQuery = (clientId, date) => {
    const query = 'SELECT * FROM orders WHERE Client_id = ? AND Date_ordered = ?';
    return new Promise((res, rej) => {
        con.query(query, [clientId, date], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};



// post requests
registerQuery = (userInfo, passHash) => {
    const query = 'INSERT INTO clients(Firstname, Lastname, Email, Password, Phone_number, Registration_date, Status, Refeeral_code, Completed_orders, Rank) VALUES(?,?,?,?,?,CURDATE(),?,?,?,?)';
    return new Promise((res, rej) => {
        con.query(query, [userInfo.name, userInfo.lastname, userInfo.email, userInfo.password, userInfo.telNumber, userInfo.status, userInfo.refeeral, userInfo.ordersCompleted, userInfo.rank], (error, results, fields) => {
            if(error) {
                rej(error);
            } else {
                res(results)
            };
        });
    });
};
loginQuery = (username) => {
    const query = 'SELECT * FROM clients WHERE Email = ?';
    return new Promise((res, rej) => {
        con.query(query, [username], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
// createCartQuery = (date, clientId) => {
//     const query = 'INSERT INTO cart(Created_on, Client_id) VALUES(?,?)';
//     return new Promise((res, rej) => {
//         con.query(query, [date, clientId], (error, results, feilds) => {
//             if(error) {
//                 rej(error)
//             } else {
//                 res(results)
//             }
//         });
//     });
// };
addItemToCartQuery = (date, userId, cartId, cartItemsInfo, price) => {
    const query = 'INSERT INTO cart_items(Created_on, Amount, Client_id, Cart_id, Meal_id, Meal_price, Status) VALUES(?,?,?,?,?,?,?)';
    return new Promise((res, rej) => {
        con.query(query, [date, cartItemsInfo.amount, userId, cartId, cartItemsInfo.mealId, price, status], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
makeOrderQuery = (orderInfo, orderToken) => {
    // console.log(orderInfo);
    const query = 'INSERT INTO orders(Location, Payment_method, Date_ordered, Client_name, Promotion_id, Order_status, Price, Special_requirements, Meals, Time_ordered, Phone_number, Session_id, Order_token, user_id) VALUES(?,?,CURRENT_DATE(),?,?,?,?,?,?,CURRENT_TIMESTAMP(),?,?,?,?)';
    return new Promise((res, rej) => {
        con.query(query, [orderInfo.clientAdress, orderInfo.paymentMethod, orderInfo.clientName, orderInfo.promotion, orderInfo.orderStatus, orderInfo.totalPrice, orderInfo.specReq, orderInfo.meals, orderInfo.clientPhoneNumb, orderInfo.sessionId, orderToken, orderInfo.userId], (error, results, fields) => {
            if(error) {
                rej(error)
                console.log(error);
            } else {
                res(results)
            }
        });
    });
};
udateOrderStatusOnCartItemsQuery = (status, orderToken, sessionId) => {
    const query = 'UPDATE add_to_cart SET status = ?, order_token = ? WHERE session_id = ?';
    return new Promise((res, rej) => {
        con.query(query, [status, orderToken, sessionId], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}
addOrderDetailsQuery = (orderDetailsInfo) => {
    const query = 'INSERT INTO order_details(Amount, Price, Special_requirements, Meal_id, Order_id) VALUES(?,?,?,?,?)';
    return new Promise((res, rej) => {
        con.query(query, [orderDetailsInfo.cartItemAmount, orderDetailsInfo.finalPrice, orderDetailsInfo.specialRequirements, orderDetailsInfo.mealId, orderDetailsInfo.orderId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
addOrderToClientOrderHistoryQuery = (price, orderId, userId) => {
    const query = 'INSERT INTO client_order_history(Price, Date, Order_id, Client_id) VALUES(?,CURRENT_DATE(),?,?)';
    return new Promise((res, rej) => {
        con.query(query, [price, orderId, userId],(error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
addOrderToClientPaymentHistoryQuery = (price, userId) => {
    const query = 'INSERT INTO client_payment_history(Price, Date, Client_id) VALUES(?,CURRENT_DATE(),?)';
    return new Promise((res, rej) => {
        con.query(query, [price, userId], (error, results, fields) => {
            if(error) {
                rej(error)
                console.log(error);
            } else {
                res(results)
            }
        });
    });
};

addOrderToRestaurantOrderHistoryQuery = (price, orderId, restId) => {
    const query = 'INSERT INTO restaurant_order_history(Price, Date, Order_ID, Restaurant_id) VALUES(?,CURRENT_DATE(),?,?)';
    return new Promise((res, rej) => {
        con.query(query, [price, orderId, restId], (error, results, fields) => {
            if(error) {
                rej(error)
               
            } else {
                res(results)
            }
        });
    });
};
addOrderToRestaurantPaymentHistoryQuery = (price, restId) => {
    const query = 'INSERT INTO restaurant_payment_history(Price, Date, Restaurant_id) VALUES(?,CURRENT_DATE(),?)';
    return new Promise((res, rej) => {
        con.query(query, [price, restId], (error, results, fields) => {
            if(error) {
                rej(error)
                console.log(error);
            } else {
                res(results)
            }
        });
    });
};



//patch request
changeAmountQuery = (amount, userId, mealId, date) => {
    const query = 'UPDATE cart_items SET Amount = ? WHERE Client_id = ? AND Meal_id = ? AND Created_on = ?';
    return new Promise((res, rej) => {
        con.query(query, [amount, userId, mealId, date], (error, results, feilds) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
changePriceQuery = (updateMealPrice, userId, mealId, date) => {
    const query = 'UPDATE cart_items SET Meal_price = ? WHERE Client_id = ? AND Meal_id = ? AND Created_on = ?';
    return new Promise((res, rej) => {
        con.query(query, [updateMealPrice, userId, mealId, date], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
countCompletedUserOrderQuery = (orderCounter, userId) => {
    const query = 'UPDATE clients SET Completed_orders = ? WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [orderCounter, userId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};

//delete requests
removeFromCartQuery = (cartItemId) => {
    const query = ' ';
    return new Promise((res, rej) => {
        con.query(query, [cartItemId],(error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};






//// new
getAllCategoriesQuery = () => {
    const query = 'SELECT * FROM food_Category';
    return new Promise((res, rej) => {
        con.query(query, (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
getAllMealsQuery = (status) => {
    const query = 'SELECT * FROM meals WHERE Status = ? ORDER BY ID DESC LIMIT 12';
    return new Promise((res, rej) => {
        con.query(query, [status], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
getFeaturedMealQuery = () => {
    const query = 'SELECT * FROM meals WHERE ID = 11';
    return new Promise((res, rej) => {
        con.query(query, (error, results, fields) => {
            if(error){
                console.log(error)
                rej(error)
            } else {
                // console.log(results)
                res(results)
            }
        });
    });
};
getMealsChosenByChiefQuery = () => {
    const query = 'SELECT * FROM meals ORDER BY RAND() LIMIT 3';
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
getSingleMealNameQuery = (mealId) => {
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
getMealsFromCatQuery = (mealCat, status) => {
    const query = 'SELECT * FROM meals WHERE Food_Category = ? AND Status = ?';
    return new Promise((res, rej) => {
        con.query(query, [mealCat, status], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}
getRestaurantIdByRestNameQuery = (restName) => {
    const query = 'SELECT ID FROM restaurants WHERE Name = ?';
    return new Promise((res, rej) => {
        con.query(query, [restName], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}
getRestIdFromByMealNameQuery = (mealId) => {
    const query = 'SELECT Restaurant_id FROM meals WHERE ID = ?';
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
getOrderedMealsPriceQuery = (mealName) => { 
    const query = 'SELECT Price FROM meals WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [mealName], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}

testOrderPlacementQuery = (orderObj) => {
    const query = 'INSERT INTO orders_test(Client_name, Client_adress, Client_phone_number, Meal, Restaurant) VALUES(?,?,?,?,?)';
    return new Promise((res, rej) => {
        con.query(query, [orderObj.clientName, orderObj.clientAdress, orderObj.clientPhoneNumber, orderObj.meal, orderObj.restaurant],(error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}

getAllOrdersInfo = (restaurantName, clientName) => {
    // console.log(restaurantName)
    const query = 'SELECT * FROM orders_test WHERE Restaurant = ? AND Client_name = ?';
    return new Promise((res, rej) => {
        con.query(query, [restaurantName, clientName], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}
getAllMealsFromSingleRestaurantQuery = (restId) => {
    const query = 'SELECT * FROM meals WHERE Restaurant_id = ?';
    return new Promise((res, rej) => {
        con.query(query, [restId], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}


/// cart ///
getAllCartsQuery = () => {
    const query = 'SELECT * FROM add_to_cart';
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
getSpecificCartQuery = (sessionId) => {
    const query = 'SELECT * FROM add_to_cart WHERE Client_id = ?';
    return new Promise((res, rej) => {
        con.query(query, [sessionId], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}
getSingleRestaurantQuery = (restId) => {
    const query = 'SELECT * FROM restaurants WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [restId], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}
addToCartQuery = (orderInfo) => {
    // console.log(orderInfo)
    const query = 'INSERT INTO add_to_cart(meal_id, meal_amount,excluded_ingr, total_price, rest_id, session_id , status, meal_name, rest_name, user_id, date_ordered) VALUES(?,?,?,?,?,?,?,?,?,?, CURRENT_DATE())';
    return new Promise((res, rej) => {
        con.query(query, [orderInfo.mealId, orderInfo.amount, orderInfo.exIngridients, orderInfo.price, orderInfo.restaurantName, orderInfo.sessionId, orderInfo.status, orderInfo.mealName, orderInfo.restName, orderInfo.userId], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}
deleteFromCartQuery = (cartItemId) => {
    const query = 'DELETE FROM add_to_cart WHERE id = ?';
    return new Promise((res, rej) => {
        con.query(query, [cartItemId], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}

addOrderToRestaurantOrdersQuery = (orderInfo) => {
    // console.log(orderInfo)
    const query = 'INSERT INTO restaurant_orders(Order_time, Order_value, Order_status, Client_phone_number, Order_details, Exclusions, Special_requirements, Restaurant, Client_name, Client_adress, Date_ordered) VALUES(?,?,?,?,?,?,?,?,?,?,?)';
    return new Promise((res, rej) => {
        con.query(query, [orderInfo.time, orderInfo.totalPrice, orderInfo.orderStatus, orderInfo.clientPhoneNumber, orderInfo.meals, orderInfo.exclusions, orderInfo.specialReq, orderInfo.restaurant, orderInfo.clientFullName, orderInfo.clientAdress, orderInfo.date], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}
addOrderToMainOrdersQuery = (orderInfo) => {
    const query = 'INSERT INTO orders(Location, Payment_method, Date_ordered, Client_name, Restaurant_id, Order_status, Price, Meals, Time_ordered, Phone_number) VALUES(?,?,?,?,?,?,?,?,?,?)';
    return new Promise((res, rej) => {
        con.query(query, [orderInfo.clientAdress, orderInfo.paymentMethod, orderInfo.date, orderInfo.clientFullName, orderInfo.restaurant, orderInfo.orderStatus, orderInfo.totalPrice, orderInfo.meals, orderInfo.time, orderInfo.clientPhoneNumber], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}



getSingleOrderBySessIdQuery = (sessionId) => {
    const query = 'SELECT * FROM orders WHERE Session_id = ?';
    return new Promise((res, rej) => {
        con.query(query, [sessionId], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}
addNewAddressQuery = (addressInfo) => {
    const query = 'INSERT INTO user_address(name, location, user_id) VALUES(?,?,?)';
    return new Promise((res, rej) => {
        con.query(query, [addressInfo.name, addressInfo.location, addressInfo.userId], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}
getMyAddressesQuery = (userId) => {
    const query = 'SELECT * FROM user_address WHERE user_id = ?';
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
deleteAddressQuery = (addressId) => {
    const query = 'DELETE FROM user_address WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [addressId], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}
getyMyProfileQuery = (userId) => {
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
editMyProfileQuery = (info, userId) => {
    const query = 'UPDATE clients SET Firstname = ?, Lastname = ?, Email = ?, Password = ? WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [info.Firstname, info.Lastname, info.Email, info.Password, userId], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}
getRestaurantMealsQuery = (restId) => {
    const query = 'SELECT * FROM meals WHERE Restaurant_id = ?';
    return new Promise((res, rej) => {
        con.query(query, [restId], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}
countMealViewsQuery = (views, mealId) => {
    const query = 'UPDATE meals SET Views = ? WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [views, mealId], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}
countMealOrdersQuery = (orders, mealId) => {
    const query = 'UPDATE meals SET Orders = ? WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [orders, mealId], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}
searchMealsOrRestaurants = (searched) => {
    const query = "SELECT * FROM meals WHERE Name LIKE CONCAT('%', ?, '%') OR Restaurant_name LIKE CONCAT('%', ?, '%')";
    return new Promise((res, rej) => {
        con.query(query, [searched, searched], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}
module.exports = {
    getAllUsersQuery,
    getAllUsernamesQuery,
    getAllEmailsQuery,

    getMyOrders,
    getSingleClientTodaysOrderQuery,

    registerQuery,
    loginQuery,

    makeOrderQuery,
    addOrderDetailsQuery,
    addOrderToClientOrderHistoryQuery,
    addOrderToClientPaymentHistoryQuery,
    addOrderToRestaurantOrderHistoryQuery,
    addOrderToRestaurantPaymentHistoryQuery,
    countCompletedUserOrderQuery,
    getSpecifiUserCompletedOrdersAmountQuery,

    getMealIdFromCartItemsQuery,
    getRestaurantIdFromMealsByMealIdQuery,
    getTodaysLoggedInUserCartItemsInfoQuery,


    // new
    getAllCategoriesQuery,
    getFeaturedMealQuery,
    getAllMealsQuery,
    getMealsChosenByChiefQuery,
    getSingleMealQuery,
    getMealsFromCatQuery,
    getSingleMealNameQuery,
    getRestaurantIdByRestNameQuery,
    getRestIdFromByMealNameQuery,
    getOrderedMealsPriceQuery,
    testOrderPlacementQuery,
    getAllOrdersInfo,
    getSingleUserQuery,
    getSingleCartItemQuery,
    getSingleRestaurantQuery,

    getAllMealsFromSingleRestaurantQuery,

    getAllCartsQuery,
    getSpecificCartQuery,
    addToCartQuery,
    deleteFromCartQuery,

    addOrderToRestaurantOrdersQuery,
    addOrderToMainOrdersQuery,

    getSingleOrderBySessIdQuery,
    udateOrderStatusOnCartItemsQuery,

    /// user dashboard ///
    addNewAddressQuery,
    getMyAddressesQuery,
    getyMyProfileQuery,
    editMyProfileQuery,
    deleteAddressQuery,

    getRestaurantMealsQuery,
    countMealViewsQuery,
    countMealOrdersQuery,
    searchMealsOrRestaurants
}
