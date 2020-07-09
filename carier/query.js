const con = require('../DB/database');

// get requests
getAllOrdersQuery = (orderStatus) => {
    const query = 'select * ,group_concat( meal_id order by add_to_cart.id asc SEPARATOR \',\') as meal_id, group_concat( meal_amount order by add_to_cart.id asc SEPARATOR \',\') as amount, group_concat( rest_name order by add_to_cart.id asc SEPARATOR \',\') as restaurants from add_to_cart JOIN orders ON orders.Order_token = add_to_cart.order_token WHERE orders.Order_status = \'In progress\' group by add_to_cart.session_id';
    return new Promise((res, rej) => {
        con.query(query, [orderStatus], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
getRestaurantsByIdQuery = (restId) => {
    const query = 'SELECT Name FROM restaurants WHERE ID = ?';
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
getSingleOrderInfoQuery = (orderId) => {
    const query = 'select * ,group_concat( meal_id order by add_to_cart.id asc SEPARATOR \',\') as meal_id, group_concat( meal_amount order by add_to_cart.id asc SEPARATOR \',\') as amount, group_concat( rest_name order by add_to_cart.id asc SEPARATOR \',\') as restaurants from add_to_cart JOIN orders ON orders.Order_token = add_to_cart.order_token WHERE orders.ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [orderId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};

getFullOrderQuery = (orderId) => {
    const query = 'SELECT * FROM orders WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [orderId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
}
getSingleOrderCartItemsQuery = (orderId) => {
    const query = "SELECT *, GROUP_CONCAT(meal_name ORDER BY add_to_cart.id ASC SEPARATOR ',') AS meals_names, GROUP_CONCAT(meal_amount ORDER BY add_to_cart.id ASC SEPARATOR ',') AS meals_amount FROM add_to_cart INNER JOIN orders ON orders.Order_token = add_to_cart.order_token WHERE orders.ID = 9 GROUP BY add_to_cart.rest_id";
    return new Promise((res, resj) => {
        con.query(query, [orderId], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}
getSingleOrderMoreInfoQuery = (sessionId) => {
    const query = 'SELECT * FROM orders INNER JOIN add_to_cart ON orders.order_token = add_to_cart.order_token WHERE orders.Session_id = ?';
    return new Promise((res, rej) => {
        con.query(query, [sessionId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
}
getSingleClientByIdQuery = (clientId) => {
    const query = 'SELECT Firstname, Lastname FROM clients WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [clientId], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
getSingleMealByIdQuery = (mealId) => {
    const query = 'SELECT * FROM meals WHERE ID = ?';
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
getMyRevenueQuery = (carrierId) => {
    const query = "SELECT Price FROM orders WHERE Carrier_id = ? AND Order_status = 'Delivered'";
    return new Promise((res, rej) => {
        con.query(query, [carrierId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
getMyTodayRevenueQuery = (date, carrierId) => {
    const query = 'SELECT Price FROM orders WHERE Date_ordered = ? AND Carrier_id = ?';
    // const query = "SELECT * FROM orders WHERE Date_ordered > DATE(NOW()) and Date_ordered < NOW()";
    return new Promise((res, rej) => {
        con.query(query, [date, carrierId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
getMyThisMonthRevenueQuery = (carrierId) => {
    const query = "SELECT Price FROM orders WHERE MONTH(Date_ordered) = MONTH(CURDATE()) AND YEAR(Date_ordered) = YEAR(CURDATE()) AND Carrier_id = ? AND Order_status = 'Delivered'"
    return new Promise((res, rej) => {
        con.query(query, [carrierId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
getMyThisWeekRevenueQuery = (carrierId) => {
    const query = "SELECT * FROM orders WHERE YEARWEEK(`Date_ordered`, 1) = YEARWEEK(CURDATE(), 1) AND Carrier_id = ? AND Order_status = 'Delivered'";
    return new Promise((res, rej) => {
        con.query(query, [carrierId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
}
getMyOrdersQuery = (carrierId) => {
    const query = 'SELECT * FROM carrier_order_history WHERE Carrier_id = ?';
    return new Promise((res, rej) => {
        con.query(query, [carrierId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
getMyTodayOrdersQuery = (carrierId, date) => {
    const query = 'SELECT * FROM carrier_order_history WHERE Carrier_id = ? AND Date = ?';
    return new Promise((res, rej) => {
        con.query(query, [carrierId, date], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
getLoggedInCarrierNameQuery = (carrierId) => {
    const query = 'SELECT * FROM cariers WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [carrierId], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            };
        });
    });
};


// login query
carierLoginQuery = (username) => {
    const query = 'SELECT * FROM cariers WHERE Username = ?';
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
markAsOnlineQuery = (orderStatus, carrierId) => {
    const query = 'UPDATE cariers SET Online_status = ? WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [orderStatus, carrierId], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}
// get carier password query
getSingleCarrierPasswordQuery = (username) => {
    const query = 'SELECT Password FROM cariers WHERE Username = ?';
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
carierResetPasswordQuery = (password, username) => {
    const query = 'UPDATE cariers SET Password = ? WHERE Username = ?';
    return new Promise((res, rej) => {
        con.query(query, [password, username], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};

////////////////////////////
// finish accepting order //
////////////////////////////
carrierAcceptOrderQuery = (acceptOrderObj) => {
    const query = 'UPDATE orders SET Order_status = ?, Carrier_id = ? WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [acceptOrderObj.orderStatus, acceptOrderObj.carrierId, acceptOrderObj.orderId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results);
            }
        });
    });
};
changeStatusQuery = (status, carrierId) => {
    const query = 'UPDATE cariers SET Status = ? WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [status, carrierId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results);
            }
        });
    });
}
saveOrderToCarrierHistoryQuery = (saveOrderInfo, carrierId) => {
    query = 'INSERT INTO carrier_order_history(Order_id, From_location, To_location, Meal, Price, Carrier_id, Date) VALUES(?,?,?,?,?,?,CURRENT_DATE())';
    return new Promise((res, rej) => {
        con.query(query, [saveOrderInfo.orderId, saveOrderInfo.restName, saveOrderInfo.finalDestination, saveOrderInfo.mealName, saveOrderInfo.price, carrierId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
carierPickupOrderQuery = (orderStatus, orderId) => {
    const query = 'UPDATE orders SET Order_status = ? WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [orderStatus, orderId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    }) ;
};
cancelOrderQuery = (orderStatus, orderId) => {
    const query = 'UPDATE orders SET Order_status = ? WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [orderStatus, orderId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
getSingleRestaurantQuery = (restId) => {
    const query = 'SELECT * FROM restaurants WHERE ID IN (?)';
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
getSingleCarrierQuery = (carrierId) => {
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

module.exports = {
    getAllOrdersQuery,
    getRestaurantsByIdQuery,
    getSingleOrderInfoQuery,
    getSingleClientByIdQuery,
    getSingleMealByIdQuery,
    getMyRevenueQuery,
    getMyTodayRevenueQuery,
    getMyThisWeekRevenueQuery,
    getMyThisMonthRevenueQuery,
    getMyOrdersQuery,
    getMyTodayOrdersQuery,

    saveOrderToCarrierHistoryQuery,

    carierLoginQuery,
    markAsOnlineQuery,
    getSingleCarrierPasswordQuery,
    carierResetPasswordQuery,
    carrierAcceptOrderQuery,
    cancelOrderQuery,
    
    getLoggedInCarrierNameQuery,
    getSingleRestaurantQuery,
    changeStatusQuery,
    getSingleCarrierQuery,

    /// new ///
    getSingleOrderMoreInfoQuery,
    getSingleOrderCartItemsQuery,
    getFullOrderQuery
}