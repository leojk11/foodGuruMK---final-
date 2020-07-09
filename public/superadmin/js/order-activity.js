$(document).ready(function(){
	// get today orders number
	$.ajax({
		url: 'admin/today-orders',
		success: function(response){
			const todayOrdersNumb = response.todayOrdersNumb;
			$('#todays_orders').append(todayOrdersNumb);
		}
	})

	// get live orders number
	$.ajax({
		url: 'admin/live-orders',
		success: function(response){
			const liveOrdersNumb = response.activeOrdersNumb;
			$('#live_orders').append(liveOrdersNumb);
		}
	})

	// get all orders
	fetch('/admin/orders')
		.then((response) => { return response.json() })
		.then((allOrdersJson) => { 
			const orders = allOrdersJson.myActiveOrders;
			const orderCartItems = allOrdersJson.cartItems;
			const orderCarrier = allOrdersJson.orderCarriers;
			console.log(orders);
			console.log(orderCartItems);
			console.log(orderCarrier);
			const allOrdersDiv = $('#all_orders');

			for(var i = 0; i < orders.length; i++){
				// console.log(orderCarrier[i]);
				const orderSnippetDiv = $('<div>').addClass('order_snippet show_full_order').attr('id', "show_full_order");

					const orderTimeDiv = $('<div>').addClass('order_time').append(orders[i].Time_ordered);
					orderSnippetDiv.append(orderTimeDiv);

					const orderIdDiv = $('<div>').addClass('order_id').append('#' + orders[i].ID);
					orderSnippetDiv.append(orderIdDiv);

					const orderPriceDiv = $('<div>').addClass('order_amount').append(orders[i].Price + ' ' + 'ДЕН');
					orderSnippetDiv.append(orderPriceDiv);

					const orderStatusDiv = $('<div>').addClass('order_status delivered').append(orders[i].Order_status);
					orderSnippetDiv.append(orderStatusDiv);
				allOrdersDiv.append(orderSnippetDiv);

				const fullOrderDiv = $('<div>').addClass('full_order').attr('id', 'full_order');
					const fullOrderTable = $('<table>').addClass('full_order_table');
						const fullOrderTbody = $('<tbody>');
							const fullOrderTrLabel = $('<tr>');
								const thMeal = $('<th>').append('Meal');
								const thExcludedIngr = $('<th>').append('Excluded ingridients');
								const qtyTh = $('<th>').append('Quantity');
								const restaurantTh = $('<th>').append('Restaurant');
								const priceTh = $('<th>').append('Price');
							fullOrderTrLabel.append(thMeal);
							fullOrderTrLabel.append(thExcludedIngr);
							fullOrderTrLabel.append(qtyTh);
							fullOrderTrLabel.append(restaurantTh);
							fullOrderTrLabel.append(priceTh);
						fullOrderTbody.append(fullOrderTrLabel);

							const mealsOfOrders = orderCartItems[i];
							for(j = 0; j < mealsOfOrders.length; j ++){
								const mealsTr = $('<tr>');
									const mealNameTd = $('<td>').append(mealsOfOrders[j].meal_name);
									const mealExIngrTd = $('<td>').append(mealsOfOrders[j].excluded_ingr);
									const mealQtyTd = $('<td>').append(mealsOfOrders[j].meal_amount);
									const mealRestTd = $('<td>').append(mealsOfOrders[j].rest_name);
									const mealPriceTd = $('<td>').append(mealsOfOrders[j].total_price);
								mealsTr.append(mealNameTd);
								mealsTr.append(mealExIngrTd);
								mealsTr.append(mealQtyTd);
								mealsTr.append(mealRestTd);
								mealsTr.append(mealPriceTd);

								fullOrderTbody.append(mealsTr);
							}
					fullOrderTable.append(fullOrderTbody);

				fullOrderDiv.append(fullOrderTable);
				const fullBottomDiv = $('<div>').addClass('full_bottom');
					const userInfoDiv = $('<div>').addClass('user_information');
						const userInfoLabelName = $('<div>').addClass('user_info_label').append('Име и презиме');
						const userFullname = $('<div>').addClass('user_fullname').append(orders[i].Client_name);
					userInfoDiv.append(userInfoLabelName);
					userInfoDiv.append(userFullname);

						const userInfoLabelAddress = $('<div>').addClass('user_info_label').append('Адреса');
						const userAddress = $('<div>').addClass('user_address').append(orders[i].Location);
					userInfoDiv.append(userInfoLabelAddress);
					userInfoDiv.append(userAddress);

						const userInfoLabelPhoneNumb = $('<div>').addClass('user_info_label').append('Телефон');
						const userPhone = $('<div>').addClass('user_phone').append(orders[i].Phone_number);
					userInfoDiv.append(userInfoLabelPhoneNumb);
					userInfoDiv.append(userPhone);

						const userInfoLabelPrice = $('<div>').addClass('user_info_label').append('Цена за наплата');
						const userTotalPrice = $('<div>').addClass('user_total_amount').append(orders[i].Price);
					userInfoDiv.append(userInfoLabelPrice);
					userInfoDiv.append(userTotalPrice);
				fullBottomDiv.append(userInfoDiv);

					const orderInfoDiv = $('<div>').addClass('order_information');
						const deliveredByDiv = $('<div>').addClass('delivered_by').append('Carrier in charge');
						const deliveredByImgDiv = $('<div>').addClass('delivered_by_img');
							const deliveredByImg = $('<img>').attr({ 'src':'desktop/fitness-mascot' });
						deliveredByImgDiv.append(deliveredByImg);
							
						const deliveredByName = $('<div>').addClass('del_name_view');
						// console.log(orderCarrier[i])

						if(orderCarrier[i] == null){
							deliveredByName.append('Сеуште никој нема прифатено');
						} else {
							deliveredByName.append(orderCarrier[i].Firstname + ' ' + orderCarrier[i].Lastname);
						}
						
					orderInfoDiv.append(deliveredByDiv);
					orderInfoDiv.append(deliveredByImgDiv);
					orderInfoDiv.append(deliveredByName);
				fullBottomDiv.append(orderInfoDiv);
							
					const orderButtonsDiv = $('<div>').addClass('order_buttons');
						const deleteOrdeBtn = $('<div>').addClass('delete_order_button').append('delete order').attr({ 'id': orders[i].ID });
					orderButtonsDiv.append(deleteOrdeBtn);
				fullBottomDiv.append(orderButtonsDiv);

				fullOrderDiv.append(fullBottomDiv);


				allOrdersDiv.append(fullOrderDiv);
			}

			$('.show_full_order').click( function(event) {
				$(this).next(".full_order").slideToggle();
			});

			$('.delete_order_button').click(function(){
				const orderId = this.id;

				$.ajax({
					url: 'admin/delete-order?orderId='+ orderId,
					method: 'delete',
					success: function(response){
						if(response.message == 'order deleted'){
							location.reload();
						}
					}
				})
			})

		})

});