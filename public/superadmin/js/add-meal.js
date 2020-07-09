$(document).ready(function(){
	// add new meal
	$('#add_meal').click(function(event){
        // event.preventDefault();
        const name = $('#name').val();
        const price = $('#price').val();
        const category = $('#select_cat').val();
        const restaurant = $('#select_rest').val();
        const description = $('#description').val();
        const deliveryTime = $('#delivery_time').val();

        const deliveryPrice = $('#delivery_price').val();
        const calories= $('#calories').val();
        const proteins = $('#proteins').val();
        const carbohydrates = $('#carbohydrates').val();
        const fat = $('#fat').val();

        // const addHereIngridietns = $('.added_ingridiant');

        var input = $('#real-file')[0];
        var file = input.files[0];
        var imageName = file.name;
        console.log(file.name);

        var inputs = $('.added_ingridiant'),
        ingridients  = [].map.call(inputs, function( input ) {
            return input.value;
        }).join( ',' );

        $.ajax({
            url: 'admin/new-meal',
            method: 'post',
            data: {
                name,
                price,
                category,
                restaurant,
                description,
                ingridients: ingridients,
                deliveryTime,
                deliveryPrice,
                calories,
                proteins,
                carbohydrates,
                fat,
                imageName
            },
            success: function(response){
                console.log(response);
            }
        })
    })

    $('.added_ingridiant').on('keypress', async e =>{
        if(e.which == 13){
            $('#addRow').click();
        }
    })
    // if(e.which == 13){
});