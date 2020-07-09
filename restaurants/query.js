const con = require('../DB/database');

// get requests
getAllRestaurantsUsernamesQuery = () => {
    const query = 'SELECT Username FROM restaurants';
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
getSingleRestaurantOrdersQuery = (restId, orderStatus) => {
    const query = 'SELECT * FROM add_to_cart JOIN orders ON orders.Order_token = add_to_cart.order_token WHERE rest_id = ? AND status = ?';
    return new Promise((res, rej) => {
        con.query(query, [restId, orderStatus], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
}
getSingleRestaurantOrdersAndOrderDetailsQuery = (restId) => {
    const query = 'SELECT * FROM orders LEFT JOIN order_details ON orders.ID = order_details.Order_id WHERE Restaurant_id = ?';
    return new Promise((res, rej) => {
        con.query(query, [restId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
getSingleRestaurantRevenueQuery = (restId) => {
    const query = 'SELECT Price FROM restaurant_payment_history WHERE Restaurant_id = ?';
    return new Promise((res, rej) => {
        con.query(query, [restId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
getSingleRestaurantTodayRevenueQuery = (restId, date) => {
    const query = 'SELECT Price FROM restaurant_payment_history WHERE Restaurant_id = ? AND Date = ?';
    return new Promise((res, rej) => {
        con.query(query, [restId, date], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        })
    })
}
///////////////////////////////////////////////////////
// finish getting all restaurant active orders query //
///////////////////////////////////////////////////////
// all single restaurant active orders
getSingleRestaurantActiveOrdersQuery = (restId, orderStatus) => {
    const query = 'SELECT * FROM orders LEFT JOIN order_details ON order_details.Order_id = orders.ID WHERE Restaurant_id = ? AND Order_status = ?';
    return new Promise((res, rej) => {
        con.query(query, [1, orderStatus], (error, results, fiedls) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
// get single restaurant password
getSingleRestaurantPasswordQuery = (restId) => {
    const query = 'SELECT Password FROM restaurants WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [restId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};

restaurantLoginQuery = (restUsername) => {
    const query = 'SELECT * FROM restaurants WHERE Username = ?';
    return new Promise((res, rej) => {
        con.query(query, [restUsername], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            };
        });
    });
};
// patch requests
// rest reset password
resetPasswordQuery = (password, restId) => {
    const query = 'UPDATE restaurants SET Password = ? WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [password, restId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};



/// new ///
getMyInfoQuery = (restId) => {
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
getMyAllTimeRevenueQuery = (restId, status) => {
    const query = 'SELECT SUM(total_price) AS allTimeRevenue FROM add_to_cart WHERE rest_id = ? AND status = ?';
    return new Promise((res, rej) => {
        con.query(query, [restId, status], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}
getMyTodayRevenueQuery = (restId, date) => {
    const query = "SELECT SUM(total_price) AS revenueByDate FROM add_to_cart WHERE rest_id = ? AND status = 'Delivered' AND date_ordered = ?"
    return new Promise((res, rej) => {
        con.query(query, [restId, date], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}
getMyMealsQuery = (restId) => {
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
getMyOrdersQuery = (restId) => {
    const query = 'SELECT * ,group_concat( meal_id order by add_to_cart.id asc SEPARATOR \',\') as meal_id, group_concat( meal_amount order by add_to_cart.id asc SEPARATOR \',\') as amount FROM add_to_cart JOIN orders ON orders.session_id = add_to_cart.session_id WHERE add_to_cart.rest_id = ? AND (status = "Accepted" OR status = "Ordered" OR status = "Accepted by carrier") GROUP BY add_to_cart.order_token ORDER BY orders.ID DESC';
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
getMyLastOrderQuery = (restId) => {
    const query = 'SELECT * ,group_concat( meal_id order by add_to_cart.id asc SEPARATOR \',\') as meal_id, group_concat( meal_amount order by add_to_cart.id asc SEPARATOR \',\') as amount FROM add_to_cart JOIN orders ON orders.session_id = add_to_cart.session_id WHERE add_to_cart.rest_id = ? AND status = "Ordered" GROUP BY add_to_cart.order_token ORDER BY orders.ID DESC LIMIT 1';
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
getSingleOrderFromRestaurantQuery = (orderId) => {
    const query = 'SELECT * FROM restaurant_orders WHERE ID = ?';
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
}
getSingleRestaurantInfoQuery = (restId) => {
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
//Count unique order_token
getMyTodayOrdersQuery = (restId, status, todayDate) => {
    const query = 'SELECT COUNT(DISTINCT  order_token)AS dailyOrders FROM add_to_cart WHERE  rest_id = ? AND status = ? AND date_ordered = ?';
    return new Promise((res, rej) => {
        con.query(query, [restId, status, todayDate], (error, results,fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}
getMyAllTimeOrdersQuery = (restId, status) => {
    const query = 'SELECT COUNT(DISTINCT  order_token)AS allTimeOrders FROM add_to_cart WHERE  rest_id = ? AND status = ?';
    return new Promise((res, rej) => {
        con.query(query, [restId, status], (error, results,fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}
getMyPendingOrdersQuery = (resId, orderStatus) => {
    const query = 'SELECT COUNT(DISTINCT  order_token)AS pendingOrders FROM add_to_cart WHERE  rest_id = ? AND status = ?';
    return new Promise((res, rej) => {
        con.query(query, [resId, orderStatus], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
};


/// patch ///
acceptOrderQuery = (orderStatus, orderId) => {
    const query = 'UPDATE orders SET Order_status = ? WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [orderStatus, orderId], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}
completeOrderQuery = (orderStatus, orderId) => {
    const query = 'UPDATE orders SET Order_status = ? WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [orderStatus, orderId], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}
sendOrderToCarriersQuery = (orderInfo) => {
    const query = 'INSERT INTO carrier_orders(Restaurant, Client_adress, Client_name, Client_phone_number, Meal, Order_status, Payment_method, Price) VALUES(?,?,?,?,?,?,?,?)';
    return new Promise((res, rej) => {
        con.query(query, [orderInfo.restaurant, orderInfo.clientAdress, orderInfo.clientName, orderInfo.clientNumber, orderInfo.meals, orderInfo.orderStatus, orderInfo.paymentMethod, orderInfo.price], (error, results, fields) => {
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
};
getCartOrdersForSpecificOrderTokenAndRestaurant = (orderToken, restId ) => {
    const query = 'SELECT * FROM add_to_cart WHERE order_token = ? AND rest_id = ?';
    return new Promise((res, rej) => {
        con.query(query, [orderToken, restId], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
};
getCartOrdersForSpecificOrderToken = (orderToken) => {
    const query = 'SELECT * FROM add_to_cart WHERE order_token = ?';
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
updateStatusForCartOrderForSpecificRestaurantAndToken = (orderStatus, orderToken, restId) => {
    const query = 'UPDATE add_to_cart SET status = ? WHERE order_token = ? AND rest_id = ?';
    return new Promise((res, rej) => {
        con.query(query, [orderStatus, orderToken, restId], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}
editRestaurantInfoQuery = (restaurantInfo, id) => {
    const query = 'UPDATE restaurants SET Location = ?, Status = ?, Image =?, Phone_number =?, Opens =?, Closes = ? WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [restaurantInfo.location, restaurantInfo.status, restaurantInfo.image, restaurantInfo.phoneNumber, restaurantInfo.opens, restaurantInfo.closes, id], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};

editRestaurantWorkDaysQuery = (workDays, id) => {
    const query = 'UPDATE restaurant_work_days SET Monday = ?, Tuesday = ?, Wednesday =? , Thursday =?, Friday =?, Saturday = ?, Sunday = ? WHERE restaurant_id = ?';
    return new Promise((res, rej) => {
        con.query(query, [workDays.Monday, workDays.Tuesday, workDays.Wednesday, workDays.Thursday, workDays.Friday, workDays.Saturday, workDays.Sunday, id], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};

getMyWorkingDaysQuery = (restId) => {
    const query = 'SELECT * FROM restaurant_work_days WHERE restaurant_id = ?';
    return new Promise((res, rej) => {
        con.query(query, [restId], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
};
addWorkDaysQuery = (restId, workDays) => {
    const query = 'INSERT INTO restaurant_work_days(restaurant_id, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday) VALUES(?,?,?,?,?,?,?,?)';
    return new Promise((res, rej) => {
        con.query(query, [restId, workDays.monday, workDays.tuesday, workDays.wednesday, workDays.thursday, workDays.friday, workDays.saturday, workDays.sunday], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}
editMealStatusQuery = (stauts, mealId) => {
    
    const query = 'UPDATE meals SET Status = ? WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [stauts, mealId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
getNumberOfActiveMealsQuery = (restId, status) => {
    const query = 'SELECT COUNT(Status)AS Active FROM meals WHERE Restaurant_id = ? AND Status = ?'
    return new Promise((res, rej) => {
        con.query(query, [restId, status], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
};
getNumberOfPausedMealsQuery = (restId, status) => {
    const query = 'SELECT COUNT(Status)AS Paused FROM meals WHERE Restaurant_id = ? AND Status = ?'
    return new Promise((res, rej) => {
        con.query(query, [restId, status], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
};
getSearchedMealsQuery = (searchTerm, restId) => {
    const query = "SELECT * FROM meals WHERE Name LIKE CONCAT('%', ?,  '%') AND Restaurant_id = ?"
    return new Promise((res, rej) => {
        con.query(query, [searchTerm, restId], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
};

getFilteredRevenueByDateQuery = (restId, date) => {
    const query = "SELECT SUM(total_price) AS revenueByDate FROM add_to_cart WHERE rest_id = ? AND status = 'Delivered' AND date_ordered = ?"
    return new Promise((res, rej) => {
        con.query(query, [restId, date], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
};
module.exports = {
    restaurantLoginQuery,

    getAllRestaurantsUsernamesQuery,
    getSingleRestaurantOrdersQuery,
    getSingleRestaurantOrdersAndOrderDetailsQuery,
    getSingleRestaurantActiveOrdersQuery,
    getSingleRestaurantPasswordQuery,

    getSingleRestaurantRevenueQuery,
    getSingleRestaurantTodayRevenueQuery,

    getNumberOfActiveMealsQuery,
    getNumberOfPausedMealsQuery,
    getFilteredRevenueByDateQuery,

    resetPasswordQuery,
    acceptOrderQuery,
    // sendOrderQuery,
    addWorkDaysQuery,


    /// new ///
    getMyInfoQuery,
    getMyAllTimeRevenueQuery,
    getMyTodayRevenueQuery,
    getMyMealsQuery,
    getMyOrdersQuery,
    getMyLastOrderQuery,
    getMyAllTimeOrdersQuery,
    getSingleOrderFromRestaurantQuery,
    getSingleRestaurantInfoQuery,
    getMyTodayOrdersQuery,
    getMyPendingOrdersQuery,
    getMyWorkingDaysQuery,
    getSearchedMealsQuery,

    getSingleOrderQuery,
    //Get Cart
    getCartOrdersForSpecificOrderTokenAndRestaurant,
    getCartOrdersForSpecificOrderToken,

    //UpdateCartStatus
    updateStatusForCartOrderForSpecificRestaurantAndToken,
    editRestaurantInfoQuery,
    editRestaurantWorkDaysQuery,
    editMealStatusQuery,

    // acceptOrderQuery,
    sendOrderToCarriersQuery,
    getSingleMealQuery,
    completeOrderQuery
};