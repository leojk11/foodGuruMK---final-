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

$.ajax({
    url: 'restaurant/my-all-time-revenue',
    success: function(todayRevJson){
        const myTodayRev = todayRevJson.allTimeRevenueNum;
        const todayRevDiv = $('#total_revenue');
        const small = $('<small>').append('ден.');
        todayRevDiv.append(myTodayRev + ' ');
        todayRevDiv.append(small);
    }
})
$.ajax({
    url: 'restaurant/my-today-revenue',
    success: function(todayRevJson){
        const todayRevDiv = $('#today_revenue');
            const small = $('<small>').append('ден.');
            todayRevDiv.append(todayRevJson + ' ');
            todayRevDiv.append(small);
            $('#filter-revenue').text(todayRevJson)
            $('#filter-date').text(new Date().toISOString().slice(0, 10))
    }
})


$('.datepicker').click(()=>{
    $("#datepicker").datepicker(
        {
            onSelect: function(date) 
            {			
                $.ajax({
                    url: 'restaurant/my-filtered-revenue',
                    data: {date},
                    success: function(filteredRevenue){
                        $('#filter-revenue').text(filteredRevenue[0].revenueByDate)
                        $('#filter-date').text(date)
                    }
                })
                $('#dialog').dialog('close')
            },
            dateFormat: "yy-mm-dd",			
        }
    );
    $("#dialog").dialog();			
})

$.ajax({
    url: 'restaurant/my-two-week-revenue',
    success: function(twoWeekRev){
        var count = 0;
    for( let i = 0; i < twoWeekRev.length; i++){
        let invoiceTable = $('.invoice-table')
        let mainInvoice = $('<div>').addClass('main-invoice decor')
        let dateOfEarned = $('<div>').addClass( 'earned').append(twoWeekRev[i].date)
        let earned = $('<div>').addClass( 'earned').append(twoWeekRev[i].revenue);
        mainInvoice.append(dateOfEarned );
            mainInvoice.append(earned);
        invoiceTable.append(mainInvoice);
        count += twoWeekRev[i].revenue
    };
    $('#total-sum').text(count + ' ден.')
    }
})
