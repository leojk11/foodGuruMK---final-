const con = require('../DB/database');

//////////////////
// GET REQUESTS //
//////////////////
getAllAdminUsernameQuery = () => {
    const query = 'SELECT Username FROM admins';
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
getOverallRevenueQuery = () => {
    const query = 'SELECT Price FROM orders';
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
getTodaysRevenueQuery = (date) => {
    const query = 'SELECT Price FROM orders WHERE Date_ordered = ?';
    return new Promise((res, rej) => {
        con.query(query, [date], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
getThisMonthRevenueQuery = () => {
    const query = 'SELECT Price FROM orders WHERE MONTH(Date_ordered) = MONTH(CURDATE()) AND YEAR(Date_ordered) = YEAR(CURDATE())';
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
getAllUsersQuery = () => {
    const query = 'SELECT * FROM clients';
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
getSingleUserQuery = (userName) => {
    const query = 'SELECT * FROM clients WHERE Firstname = ?';
    return new Promise((res, rej) => {
        con.query(query, [userName], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}
getSingleClientByIdQuery = (clientId) => {
    const query = 'SELECT * FROM clients WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [clientId], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        })
    })
}
getSingleUserIdQuery = (username) => {
    const query = 'SELECT ID FROM clients WHERE Username = ?';
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
getAllTodaysUsers = (signupDate) => {
  const query = 'SELECT * FROM clients WHERE Registration_date = ?';
      return new Promise((res, rej) => {
        con.query(query, [signupDate],(error, results, fields) => {
          if(error) {
            rej(error);
          } else {
            res(results);
          }
        });
    });
};
getAllActiveOrdersQuery = (orderStatus) => {
    const query = 'SELECT * FROM orders WHERE Order_status <>\'Done\'';
    return new Promise((res, rej) => {
        con.query(query, [orderStatus], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            };
        });
    });
};
getAllRestauransQuery = () => {
    const query = 'SELECT * FROM restaurants';
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
getSingleRestaurantQuery = (restId) => {
    const query = 'SELECT * FROM restaurants WHERE ID = ?';
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
searchRestaurantsQuery = (info) => {
    // const query = 'SELECT * FROM restaurants WHERE Name = ?';
    const query = "SELECT * FROM restaurants WHERE Name LIKE CONCAT('%', ?, '%')";
    return new Promise((res, rej) => {
        con.query(query, [info], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
}
getSingleRestaurantByIdQuery = (restId) => {
    const query = 'SELECT * FROM restaurants WHERE ID = ?';
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
getSingleRestaurantIdByNameQuery = (restName) => {
    const query = 'SELECT ID FROM restaurants WHERE Name = ?';
    return new Promise((res, rej) => {
        con.query(query, [restName], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
getAllCariersQuery = () => {
    const query = 'SELECT * FROM cariers';
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
getSingleCarierByIdQuery = (carierId) => {
    const query = 'SELECT * FROM cariers WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [carierId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
getSingleCarierQuery = (username) => {
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
searchCarriersQuery = (info) => {
    const query = "SELECT * FROM cariers WHERE Firstname LIKE CONCAT('%', ?, '%') OR Lastname LIKE CONCAT('%', ?, '%') OR Fullname LIKE CONCAT('%', ?, '%')";
    return new Promise((res, rej) => {
        con.query(query, [info, info, info], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    }); 
}
getAllOnlineCariersQuery = (onlineStatus) => {
    const query = 'SELECT * FROM cariers WHERE Online_status = ?';
    return new Promise((res, rej) => {
        con.query(query, [onlineStatus], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
getAllBusyCariersQuery = (carierStatus) => {
    const query = 'SELECT * FROM cariers WHERE Status = ?';
    return new Promise((res, rej) => {
        con.query(query, [carierStatus], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};

getFoodCategoryIdQuery = (name) => {
    const query = 'SELECT ID FROM food_category WHERE Category = ?';
    return new Promise((res, rej) => {
        con.query(query, [name], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
getAllMealsQuery = () => {
    const query = 'SELECT * FROM meals ORDER BY ID DESC';
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
searchMealsQuery = (info) => {
    // const query = 'SELECT * FROM meals WHERE Name = ?';
    const query = "SELECT * FROM meals WHERE Name LIKE CONCAT('%', ?, '%') OR Restaurant_name LIKE CONCAT('%', ?, '%')";
    return new Promise((res, rej) => {
        con.query(query, [info, info], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
}
getSingleMealQuery = (name) => {
    const query = 'SELECT * FROM meals WHERE Name = ?';
    return new Promise((res, rej) => {
        con.query(query,[name], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
getSingleMealByIdQuery = (id) => {
    const query = 'SELECT * FROM meals WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [id], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
getAllPromotionsQuery = () => {
    const query = 'SELECT * FROM promotions';
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
///////////////////////////////////////
// finish getting single PROMO query //
///////////////////////////////////////

getAllOrdersQuery = () => {
    const query = 'SELECT * FROM orders';
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
getAllPendingOrdersQuery = (orderStatus) => {
    const query = 'SELECT * FROM orders WHERE Order_status <>\'Done\'';
    return new Promise((res, rej) => {
        con.query(query, [orderStatus], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
getSingleOrderQuery = (orderId) => {
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
};
getOrderDetailsQuery = (orderId) => {
    const query = 'SELECT * FROM order_details WHERE Order_id = ?';
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
getOnlyTodayOrderQuery = (date) => {
    const query = 'SELECT * FROM orders WHERE Date_ordered = ?';
    return new Promise((res, rej) => {
        con.query(query, [date], (error, results, fields) => {
            if(error) {
                rej(error);
            } else {
                res(results)
            }
        });
    });
};
getAllCategoriesQuery = () => {
    const query = 'SELECT * FROM food_category';
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
getSingleCategoryQuery = (catId) => {
    const query = 'SELECT * FROM food_category WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [catId], (error, results, fields) => {
            if(error){
                rej(error) 
            } else {
                res(results)
            };
        });
    });
};

getSinglePromotionQuery = (orderId) => {
    const query = 'SELECT * FROM promotions WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [orderId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            };
        });
    });
};

getSinglePromotionByTypeQuery = (promoType) => {
    const query = 'SELECT * FROM promotions WHERE Promo_type = ?';
    return new Promise((res, rej) => {
        con.query(query, [promoType], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            };
        });
    });
};

///////////////////
// POST REQUESTS //
///////////////////
adminLoginQuery = (username) => {
    const query = 'SELECT * FROM admins WHERE Username = ?';
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
addNewRestaurantQuery = (restaurantInfo) => {
    const query = "INSERT INTO restaurants(Name, Username, Password, Location, Food_category, Food_category_id, Image, Phone_number, Opens, Closes, Email, Status) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
    return new Promise((res, rej) => {
        con.query(query, [restaurantInfo.name, restaurantInfo.username, restaurantInfo.password, restaurantInfo.location, restaurantInfo.foodCategory, 1, restaurantInfo.image, restaurantInfo.phoneNumber, restaurantInfo.openingHour, restaurantInfo.closingHour, restaurantInfo.email, restaurantInfo.status], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
addNewCarierQuery = (carierInfo) => {
    const query = 'INSERT INTO cariers(Firstname, Lastname, Email, Username, Password, City, Phone_number, Identification_number, Hours_available, Image, Online_status, Status, Fullname) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)';
    return new Promise((res, rej) => {
        con.query(query, [carierInfo.firstname, carierInfo.lastname, carierInfo.email, carierInfo.username, carierInfo.password, carierInfo.location, carierInfo.phNumber, carierInfo.idNumb, carierInfo.hoursAvailable, carierInfo.imageName, carierInfo.onlineStatus, carierInfo.status, carierInfo.fullName], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
addNewMealQuery = (mealInfo, restId) => {
    console.log(mealInfo);
    const query = 'INSERT INTO meals(Name, Price, Delivery_time, Ingridients, Restaurant_id, Restaurant_name, Description, Food_category, Image, Delivery_price, Calories, Proteins, Carbohydrates, Fat, Status, Orders, Comments, Views) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    return new Promise((res, rej) => {
        con.query(query, [mealInfo.name, mealInfo.price, mealInfo.deliveryTime, mealInfo.ingridients, restId, mealInfo.restaurant, mealInfo.desc, mealInfo.category, mealInfo.image, mealInfo.deliveryPrice, mealInfo.calories, mealInfo.proteins, mealInfo.carbohydrates, mealInfo.fat, mealInfo.status, mealInfo.orders, mealInfo.comments, mealInfo.views], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
addNewPromotionQuery = (promoInfo, dateCreated) => {
    const query = 'INSERT INTO promotions(Promo_discount, Code, ex_date, Promo_type, Promo_freebly, Limitt, Date_created) VALUES(?,?,?,?,?,?,?)';
    return new Promise((res, rej) => {
        con.query(query, [promoInfo.promoDiscount, promoInfo.code, promoInfo.exDate, promoInfo.promoType, promoInfo.promoFreebly, promoInfo.promoLimit, dateCreated], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        });
    });
};  
addNewCategoryQuery = (catObj) => {
    const query = 'INSERT INTO food_category(Category, Image, Views, Orders, Meals) VALUES(?,?,?,?,?)';
    return new Promise((res, rej) => {
        con.query(query, [catObj.catName, catObj.image, catObj.views, catObj.orders, catObj.meals], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};

///////////////////
// PUT REQUESTS //
//////////////////
editRestaurantQuery = (results, restId) => {
    const query = 'UPDATE restaurants SET Name = ?, Username = ?, Location = ?, Password = ?, Phone_number = ?, Email = ?, Opens = ?, Closes = ?, Food_category = ?, Image = ? WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [results.Name, results.Username,  results.Location, results.Password, results.Phone_number, results.Email, results.Opens, results.Closes, results.Food_category, results.Image, restId], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
editCarierQuery = (info, carrierId) => {
    const query = 'UPDATE cariers SET Firstname = ?, Lastname = ?, Email = ?, Username = ?, Password = ?, City = ?, Phone_number = ?, Identification_number = ?, Hours_available = ? WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [info.Firstname, info.Lastname, info.Email, info.Username, info.Password, info.City, info.Phone_number, info.Identification_number, info.Hours_available, carrierId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
editMealQuery = (info, mealId) => {
    // console.log(info.mealName)
    const query = 'UPDATE meals SET Name = ?, Price = ?, Description = ?, Food_category = ?, Restaurant_name = ?, Calories = ?, Proteins = ?, Fat = ?, Carbohydrates = ?, Delivery_time = ?, Delivery_price = ?, Ingridients = ? WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [info.Name, info.Price, info.Description, info.Food_category, info.Restaurant_name, info.Calories, info.Proteins, info.Fat, info.Carbohydrates, info.Delivery_time, info.Delivery_price, info.Ingridients, mealId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
editPromotionQuery = (data, id) => {
    const query = 'UPDATE promotions SET Promo_discount = ?, Code = ?, ex_date = ?, Promo_type = ?, Promo_freebly = ?, Limitt = ? WHERE id = ?';
    return new Promise((res, rej) => {
        con.query(query, [data.Promo_discount, data.Code, data.ex_date, data.Promo_type, data.Promo_freebly, data.Limitt, id], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
editOrderDetailsQuery = (orderInfo, orderId) => {
    // console.log(orderInfo);
    const query = 'UPDATE order_details SET Amount = ?, Price = ?, Order_status = ?, Special_requirements = ?, Meal_id = ? WHERE Order_id = ?';
    return new Promise((res, rej) => {
        con.query(query, [orderInfo.Amount, orderInfo.Price, orderInfo.Order_status, orderInfo.Special_requirements, orderInfo.Meal_id, orderId],(error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results);
            }
        })
    })
};
editCategoryQuery = (catFinalInfo, catId) => {
    const query = 'UPDATE food_category SET Category = ?, Image = ? WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [catFinalInfo.Category, catFinalInfo.Image, catId], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            };
        });
    });
};

/////////////////////
// PATCH REQUERSTS //
/////////////////////
carierPasswordResetQuery = () => {
    const query = 'UPDATE cariers SET Password = ? WHERE Username = ?';
    return new Promise((res, rej) => {
        con.query(query, [], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};

/////////////////////
// DELETE REQUESTS //
/////////////////////
deletePromoQuery = (promoId) => {
    const query = 'DELETE FROM promotions WHERE id = ?';
    return new Promise((res, rej) => {
        con.query(query, [promoId], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
deleteRestaurantQuery = (restId) => {
    const query = 'DELETE FROM restaurants WHERE ID = ?';
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
deleteMealQuery = (mealId) => {
    const query = 'DELETE FROM meals WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [mealId], (error, results, fields) => {
            if(error){
                rej(error)
            } else {
                res(results)
            }
        });
    });
};
deleteCarrierQuery = (id) => {
    const query = 'DELETE FROM cariers WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [id], (error, results, fields) => {
            if(error){
                rej(error) 
            } else {
                res(results)
            }
        });
    });
};
deleteCategoryQuery = (catId) => {
    const query = 'DELETE FROM food_category WHERE ID = ?';
    return new Promise((res, rej) => {
        con.query(query, [catId], (error, results, fields) => {
            if(error){
                rej(error) 
            } else {
                res(results)
            }
        });
    });
}

getCarrierInfoByFullnameQuery = (carrierFullname) => {
    const query = 'SELECT * FROM cariers WHERE Fullname = ?';
    return new Promise((res, rej) => {
        con.query(query, [carrierFullname], (error, results, fields) => {
            if(error) {
                rej(error)
            } else {
                res(results)
            }
        });
    });
};

module.exports = {
    adminLoginQuery,
    getAllAdminUsernameQuery,

    getOverallRevenueQuery,
    getTodaysRevenueQuery,
    getThisMonthRevenueQuery,

    getAllUsersQuery,
    getAllTodaysUsers,
    getSingleUserIdQuery,
    getSingleClientByIdQuery,
    getSingleUserQuery,

    getAllRestauransQuery,
    getSingleRestaurantQuery,
    editRestaurantQuery,
    getSingleRestaurantByIdQuery,
    getSingleRestaurantIdByNameQuery,
    deleteRestaurantQuery,
    searchRestaurantsQuery,

    getAllCariersQuery,
    getSingleCarierQuery,
    getSingleCarierByIdQuery,
    getAllOnlineCariersQuery,
    getAllBusyCariersQuery,
    editCarierQuery,
    carierPasswordResetQuery,
    deleteCarrierQuery,
    getCarrierInfoByFullnameQuery,
    searchCarriersQuery,

    getFoodCategoryIdQuery,
    addNewRestaurantQuery,
    addNewCarierQuery,

    addNewMealQuery,
    getAllMealsQuery,
    getSingleMealQuery,
    getSingleMealByIdQuery,
    editMealQuery,
    deleteMealQuery,
    searchMealsQuery,

    addNewPromotionQuery,
    getAllPromotionsQuery,
    getSinglePromotionQuery,
    editPromotionQuery,
    getSinglePromotionByTypeQuery,
    deletePromoQuery,

    getAllOrdersQuery,
    getSingleOrderQuery,
    getOrderDetailsQuery,
    getOnlyTodayOrderQuery,
    editOrderDetailsQuery,
    getAllActiveOrdersQuery,
    getAllPendingOrdersQuery,

    getAllCategoriesQuery,
    getSingleCategoryQuery,
    addNewCategoryQuery,
    editCategoryQuery,
    deleteCategoryQuery

}
