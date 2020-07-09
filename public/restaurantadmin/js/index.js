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
    url: 'restaurant/my-today-orders',
    success: function(todayOrdersJson){
        const todayOrdersNum = todayOrdersJson;
            const todayOrdersNumDiv = $('#today_orders_num')
            todayOrdersNumDiv.append(todayOrdersNum);
    }
})
$.ajax({
    url: 'restaurant/my-all-time-orders',
    success: function(allTimeOrdersJson){
        $('#all_time_orders').append(allTimeOrdersJson);
    }
})
$.ajax({
    url: 'restaurant/my-all-time-revenue',
    success: function(myRevJson){
        const myRev = myRevJson.allTimeRevenueNum
            $('#rest_revenue').append(myRev + ' ' + 'ден.');
    }
})
$(document).ready(function () {
    $("#click_5").click(function (e) {
        $(".top-meals-daily-click").css('display', 'flex');
        $(".top-meals-weekly-click").css('display', 'none');
        $("#change_5").addClass("clicked_1");
        $("#change_5").removeClass("unclicked_1");
        $("#change_6").addClass("unclicked_1");
        $("#change_6").removeClass("clicked_1");
        e.preventDefault();
    });
    $("#click_6").click(function (e) {
        // $(".daily-sales-click").css('display','flex');
        // $(".overall-sales-click").css('display','none');
        $(".top-meals-daily-click").css('display', 'none');
        $(".top-meals-weekly-click").css('display', 'flex');
        $("#change_6").addClass("clicked_1");
        $("#change_6").removeClass("unclicked_1");
        $("#change_5").addClass("unclicked_1");
        $("#change_5").removeClass("clicked_1");

        e.preventDefault();
    });
    //////////////// ~ Daily sales ~ /////////////////
    $("#click_4").click(function (e) {
        $(".daily-sales-click").css('display', 'none');
        $(".overall-sales-click").css('display', 'flex');
        $("#change_4").addClass("clicked_1");
        $("#change_4").removeClass("unclicked_1");
        $("#change_3").addClass("unclicked_1");
        $("#change_3").removeClass("clicked_1");

        e.preventDefault();
    });
    $("#click_3").click(function (e) {
        $(".daily-sales-click").css('display', 'flex');
        $(".overall-sales-click").css('display', 'none');
        $("#change_3").addClass("clicked_1");
        $("#change_3").removeClass("unclicked_1");
        $("#change_4").addClass("unclicked_1");
        $("#change_4").removeClass("clicked_1");

        e.preventDefault();
    });
    //////////////// ~ Daily orders ~ /////////////////
    $("#click_1").click(function (e) {

        $("#change_2").removeClass("clicked_1");
        $("#change_2").addClass("unclicked_1");
        $("#change_1").removeClass("unclicked_1");
        $("#change_1").addClass("clicked_1");
        $(".daily-click").css('display', 'flex');
        $(".frametime-click").css('display', 'none');
        e.preventDefault();
    });

    $("#click_2").click(function (e) {
        $(".daily-click").css('display', 'none');
        $(".frametime-click").css('display', 'flex');
        $("#change_1").removeClass("clicked_1");
        $("#change_1").addClass("unclicked_1");
        $("#change_2").removeClass("unclicked_1");
        $("#change_2").addClass("clicked_1");

        e.preventDefault();
    });
    ////////////////////////////////////////////////////
});