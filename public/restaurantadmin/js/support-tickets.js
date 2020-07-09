//Profile info
$.ajax({
    url: 'restaurant/my-profile',
    success: function(response){
        const restaurantName = response.singleRestInfo[0].restName
        const restaurantLogoName = response.singleRestInfo[0].restLogo
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
$(".mobile-btn").click(function () {
    $(".mobile-menu").slideToggle();
    $(".mobile-menu").css("background-color", "#4a4a4a")
});
$(document).ready(function () {
    $("#show_full_order").click(function () {
        $("#full_order").slideToggle(385);
    });
});

