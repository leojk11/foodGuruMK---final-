$(document).ready(function(){

	// get today revenue
	fetch('/admin/today-revenue')
		.then((response) => { return response.json() })
		.then((todaysRevenue) => { 
			const todayRevenue = todaysRevenue.todayRevenue;
			$('#todays_revenue').append(todayRevenue);
		});

	// get today orders number
	fetch('/admin/today-orders')
		.then((response) => { return response.json() })
		.then((todaysOrders) => {
			const todayOrdersnumb = todaysOrders.todayOrdersNumb;
			$('#todays_orders').append(todayOrdersnumb);
		});

	// get overall revenue
	fetch('/admin/revenue')
		.then((response) => { return response.json() })
		.then((revenue) => {
			const overallRevenue = revenue.revenue;
			$('#overall_revenue').append(overallRevenue);
		}) 

	// get overall orders number
	fetch('/admin/all-orders-numb')
		.then((response) => { return response.json() })
		.then((myJson) => {
			const allOrdersNumb = myJson.allOrdersNumb;
			$('#overall_orders').append(allOrdersNumb);
		})

	// get all new todays users
	fetch('/admin/today-users')
		.then((response) => { return response.json() })
		.then((todaysUsers) => {
			const todaysNewUsersNumb = todaysUsers.todaysUsersNumb;
			$('#todays_users').append(todaysNewUsersNumb);
		})

	// get this month revenue	
	fetch('/admin/month-revenue')
		.then((response) => { return response.json() })
		.then((monthRevenueJson) => {
			const thisMonthRevenue = monthRevenueJson.revenue;
			$('#month_revenue').append(thisMonthRevenue);
		});
});