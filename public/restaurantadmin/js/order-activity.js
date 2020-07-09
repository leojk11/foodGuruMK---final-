//Profile info
$.ajax({
    url: 'restaurant/my-profile',
    success: function(myProfile){
        const restaurantName = myProfile.singleRestInfo[0].restName
        const restaurantLogoName = myProfile.singleRestInfo[0].restLogo
        const restLogo = $('#rest-logo').attr('src', '/restaurants/rest-logo?image=' +
            restaurantLogoName);
        $('#rest_name').text(restaurantName)
    }
})
$.ajax({
    url: 'restaurant/my-profile',
    success: function(myProfile){
        const restaurantName = myProfile.singleRestInfo[0].restName
        const restaurantLogoName = myProfile.singleRestInfo[0].restLogo
        $('#rest_name-mob').text(restaurantName)
    }
})
$.ajax({
    url: 'restaurant/my-profile',
    success: function(myProfile){
        const restaurantName = myProfile.singleRestInfo[0].restName
        const restaurantLogoName = myProfile.singleRestInfo[0].restLogo
        const restLogo = $('#rest-logo-mob').attr('src', '/restaurants/rest-logo?image=' +
            restaurantLogoName);
        $('#rest_name-mob').text(restaurantName)
    }
})
$(".mobile-btn").click(function () {
    $(".mobile-menu").slideToggle();
    $(".mobile-menu").css("background-color", "#4a4a4a")
});
//Today orders
$.ajax({
    url: 'restaurant/my-today-orders',
    success: function(todayOrdersJson){
        $('#today_orders_num').append(todayOrdersJson);
    }
})
//Pending orders
$.ajax({
    url: 'restaurant/my-pending-orders',
    success: function(pendingOrdersNumb){
        $('#pending_orders_numb').append(pendingOrdersNumb);
    }
})
//Display orders
$.ajax({
    url: 'restaurant/my-orders',
    success: function(myOrdersJson){
        const myOrders = myOrdersJson.order;
            console.log(myOrders)
            const allOrdersDiv = $('.order-table-bg');

            for (var i = 0; i < myOrders.length; i++) {
                const orderWrapperDiv = $('<div>').addClass('open-order-more');

                const mainOrderDiv = $('<div>').addClass('main-order show_full_order').attr('id', 'show_full_order');
                const orderTimeDiv = $('<div>').addClass('order-time').append(myOrders[i].orderTime);
                mainOrderDiv.append(orderTimeDiv);
                const orderIdDiv = $('<div>').addClass('order-time').append('#' + myOrders[i].orderId);
                mainOrderDiv.append(orderIdDiv);
                const orderValueDiv = $('<div>').addClass('order-time').append(myOrders[i].orderValue + ' ' + 'ДЕН');
                mainOrderDiv.append(orderValueDiv);
                const waitingIconDiv = $('<div>').addClass('waitingicon');
                const orderStatusDiv = $('<div>').addClass('order-time withicon');
                orderStatusDiv.append(waitingIconDiv);
                orderStatusDiv.append(myOrders[i].orderStatus);
                mainOrderDiv.append(orderStatusDiv);
                orderWrapperDiv.append(mainOrderDiv);

                const fullOrderDiv = $('<div>').addClass('full_order').attr('id', 'full_order');
                const fullOrderWraperDiv = $('<div>').addClass('full_order_wrapper');
                const moreInfoDiv = $('<div>').addClass('more-info');
                const clientNumbDiv = $('<div>').addClass('client-num');
                const clientNumbLabel = $('<label>').append('Client phone number');
                const clientNumb = $('<b>').append(myOrders[i].Client_phone_number)
                const clientNumberDiv = $('<div>').addClass('number-client').append(myOrders[i].clientPhNumber);
                clientNumbDiv.append(clientNumbLabel);
                clientNumbDiv.append(clientNumberDiv);
                moreInfoDiv.append(clientNumbDiv);

                const orderDetailsDiv = $('<div>').addClass('order-details');
                const clientOrderDiv = $('<div>').addClass('cient_order');
                const detailsDiv = $('<div>').addClass('details');
                const orderDetailsLabel = $('<div>').addClass('text-order').append('Order details');
                detailsDiv.append(orderDetailsLabel);

                const orderMealsArrayStr = myOrders[i].Order_details;
                const ingridients = myOrders[i].orderDetails;
                const allIgridients = ingridients.split(',');

                for (var j = 0; j < allIgridients.length; j++) {

                    const singleMealOrdered = $('<li>').append(allIgridients[j]);
                    detailsDiv.append(singleMealOrdered);
                }
                clientOrderDiv.append(detailsDiv);

                const exclusionsDetailDiv = $('<div>').addClass('details');
                const exclusionsDetailsLabel = $('<div>').addClass('text-order').append('Exclusions');
                exclusionsDetailDiv.append(exclusionsDetailsLabel);
                const exclusions = myOrders[i].exclusions;
                const allExclusions = exclusions.split(',');

                for (var j = 0; j < allExclusions.length; j++) {

                    const singleMealOrdered = $('<li>').append(allExclusions[j]);
                    exclusionsDetailDiv.append(singleMealOrdered);
                }
                clientOrderDiv.append(exclusionsDetailDiv);

                const specialReqDiv = $('<div>').addClass('speacl-detals');
                const specialReqLabel = $('<div>').addClass('text-order').append('Special requests');
                specialReqDiv.append(specialReqLabel);

                const specReq = myOrders[i].specReq;
                const allspecReq = specReq.split(',');

                for (var j = 0; j < allspecReq.length; j++) {

                    const singleMealOrdered = $('<li>').append(allspecReq[j]);
                    specialReqDiv.append(singleMealOrdered);
                }
                clientOrderDiv.append(specialReqDiv);

                orderDetailsDiv.append(clientOrderDiv);

                const buttonsDiv = $('<div>').addClass('start-completed-order');
                const acceptOrderButton = $('<div>').addClass('button-s-c start-order').attr('id', myOrders[i].orderId);
                const acceptOrderButtonIcon = $('<i>').addClass('fas fa-truck-moving');
                acceptOrderButton.append(acceptOrderButtonIcon);
                acceptOrderButton.append('Accept order');
                buttonsDiv.append(acceptOrderButton);

                const orderCompletedButton = $('<div>').addClass('button-s-c order-completed').attr('id', myOrders[i].orderId);
                const orderCompletedButtonIcon = $('<i>').addClass('far fa-check-circle');
                orderCompletedButton.append(orderCompletedButtonIcon);
                orderCompletedButton.append('Order completed');
                buttonsDiv.append(orderCompletedButton);

                moreInfoDiv.append(orderDetailsDiv);
                moreInfoDiv.append(buttonsDiv);
                fullOrderWraperDiv.append(moreInfoDiv);
                fullOrderDiv.append(fullOrderWraperDiv)
                orderWrapperDiv.append(fullOrderDiv);
                allOrdersDiv.append(orderWrapperDiv);
            }

            $('.open-order-more').on('click', '.show_full_order',function (event) {
                event.preventDefault()
                $(this).next(".full_order").slideToggle();
            })
            $('.start-order').click(function (event) {

                const orderId = this.id;
                //Accept Order
                $.ajax({
                    url: 'restaurant/accept-order?orderId=' + orderId,
                    method: 'patch',
                    success: function(){}})

            });
            $('.order-completed').click(function (event) {
                const orderId = this.id;
                //Complete order
                $.ajax({
                    url: 'restaurant/complete-order?orderId=' + orderId,
                    method: 'patch',
                    success: function(){}})
            })
    }
})

const socket = io()
//Join private room
$.ajax({
    url: 'restaurant/my-profile',
    success: function(myProfile){
        var restaurantName = myProfile.singleRestInfo[0].restName
        socket.emit('joinOrder', restaurantName)
    }
})
        // After order show
        socket.on('message', msg =>{
            setTimeout(function(){
                $('.notification-div').toggle()
                $('.notification-div').delay(15000).fadeOut('slow');
                var obj = document.createElement("audio");
                obj.src = "/restaurants/notification"; 
                obj.play();
                // delete obj;
                $.ajax({
                    url: 'restaurant/my-last-order',
                    success: function(lastOrder){
                        const myOrders = lastOrder;
            console.log(myOrders)
            const allOrdersDiv = $('.order-table-bg');

            for (var i = 0; i < myOrders.length; i++) {
                const orderWrapperDiv = $('<div>').addClass('open-order-more');

                const mainOrderDiv = $('<div>').addClass('main-order show_full_order').attr('id', 'show_full_order');
                const orderTimeDiv = $('<div>').addClass('order-time').append(myOrders[i].orderTime);
                mainOrderDiv.append(orderTimeDiv);
                const orderIdDiv = $('<div>').addClass('order-time').append('#' + myOrders[i].orderId);
                mainOrderDiv.append(orderIdDiv);
                const orderValueDiv = $('<div>').addClass('order-time').append(myOrders[i].orderValue + ' ' + 'ДЕН');
                mainOrderDiv.append(orderValueDiv);
                const waitingIconDiv = $('<div>').addClass('waitingicon');
                const orderStatusDiv = $('<div>').addClass('order-time withicon');
                orderStatusDiv.append(waitingIconDiv);
                orderStatusDiv.append(myOrders[i].orderStatus);
                mainOrderDiv.append(orderStatusDiv);
                orderWrapperDiv.append(mainOrderDiv);

                const fullOrderDiv = $('<div>').addClass('full_order').attr('id', 'full_order');
                const fullOrderWraperDiv = $('<div>').addClass('full_order_wrapper');
                const moreInfoDiv = $('<div>').addClass('more-info');
                const clientNumbDiv = $('<div>').addClass('client-num');
                const clientNumbLabel = $('<label>').append('Client phone number');
                const clientNumb = $('<b>').append(myOrders[i].Client_phone_number)
                const clientNumberDiv = $('<div>').addClass('number-client').append(myOrders[i].clientPhNumber);
                clientNumbDiv.append(clientNumbLabel);
                clientNumbDiv.append(clientNumberDiv);
                moreInfoDiv.append(clientNumbDiv);

                const orderDetailsDiv = $('<div>').addClass('order-details');
                const clientOrderDiv = $('<div>').addClass('cient_order');
                const detailsDiv = $('<div>').addClass('details');
                const orderDetailsLabel = $('<div>').addClass('text-order').append('Order details');
                detailsDiv.append(orderDetailsLabel);

                const orderMealsArrayStr = myOrders[i].Order_details;
                const ingridients = myOrders[i].orderDetails;
                const allIgridients = ingridients.split(',');

                for (var j = 0; j < allIgridients.length; j++) {

                    const singleMealOrdered = $('<li>').append(allIgridients[j]);
                    detailsDiv.append(singleMealOrdered);
                }
                clientOrderDiv.append(detailsDiv);

                const exclusionsDetailDiv = $('<div>').addClass('details');
                const exclusionsDetailsLabel = $('<div>').addClass('text-order').append('Exclusions');
                exclusionsDetailDiv.append(exclusionsDetailsLabel);
                // if(myOrders[i].Exclusions !== null){
                const exclusions = myOrders[i].exclusions;
                const allExclusions = exclusions.split(',');

                for (var j = 0; j < allExclusions.length; j++) {

                    const singleMealOrdered = $('<li>').append(allExclusions[j]);
                    exclusionsDetailDiv.append(singleMealOrdered);
                }
                clientOrderDiv.append(exclusionsDetailDiv);
                // }

                const specialReqDiv = $('<div>').addClass('speacl-detals');
                const specialReqLabel = $('<div>').addClass('text-order').append('Special requests');
                specialReqDiv.append(specialReqLabel);

                const specReq = myOrders[i].specReq;
                const allspecReq = specReq.split(',');

                for (var j = 0; j < allspecReq.length; j++) {

                    const singleMealOrdered = $('<li>').append(allspecReq[j]);
                    specialReqDiv.append(singleMealOrdered);
                }
                clientOrderDiv.append(specialReqDiv);

                orderDetailsDiv.append(clientOrderDiv);

                const buttonsDiv = $('<div>').addClass('start-completed-order');
                const acceptOrderButton = $('<div>').addClass('button-s-c start-order').attr('id', myOrders[i].orderId);
                const acceptOrderButtonIcon = $('<i>').addClass('fas fa-truck-moving');
                acceptOrderButton.append(acceptOrderButtonIcon);
                acceptOrderButton.append('Accept order');
                buttonsDiv.append(acceptOrderButton);

                const orderCompletedButton = $('<div>').addClass('button-s-c order-completed').attr('id', myOrders[i].orderId);
                const orderCompletedButtonIcon = $('<i>').addClass('far fa-check-circle');
                orderCompletedButton.append(orderCompletedButtonIcon);
                orderCompletedButton.append('Order completed');
                buttonsDiv.append(orderCompletedButton);

                moreInfoDiv.append(orderDetailsDiv);
                moreInfoDiv.append(buttonsDiv);
                fullOrderWraperDiv.append(moreInfoDiv);
                fullOrderDiv.append(fullOrderWraperDiv)
                orderWrapperDiv.append(fullOrderDiv);
                allOrdersDiv.prepend(orderWrapperDiv);
            }
            $('.open-order-more').off('click').on('click', '.show_full_order',function (event) {
                event.preventDefault()
                $(this).next(".full_order").slideToggle();
            })
            $('.start-order').click(function (event) {

                const orderId = this.id;
                //Accept Order
                $.ajax({
                    url: 'restaurant/accept-order?orderId=' + orderId,
                    method: 'patch',
                    success: function(){}})

            });
            $('.order-completed').click(function (event) {
                const orderId = this.id;
                //Complete order
                $.ajax({
                    url: 'restaurant/complete-order?orderId=' + orderId,
                    method: 'patch',
                    success: function(){}})
            })
                    }
                })       

            }, 3000);
        })