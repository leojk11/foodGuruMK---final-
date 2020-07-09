$(document).ready(function(){
    var url = document.location.href,
    params = url.split('?')[1].split('&'),
    data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }

    const catId = data.catId;

    $.ajax({
        url: 'admin/single-food-category',
        data: {
            catId: catId
        },
        success: function(response){
            const category = response.singleCategory;

            $('#first_cat_name').append(category[0].Category);
            $('#single_cat_name').attr('value', category[0].Category);
            $('#custom-button').attr('src', '/superadmin/getCategoryImage?image=' + category[0].Image);
        }
    });

    $('#save_cat_edit').click(function(event){ 
        // event.preventDefault();
        const singleCatName = $('#single_cat_name').val();

        var input = $('#real-file')[0];
        var file = input.files[0];
        // console.log(file.name);

        let imageName;
        if(file != undefined){
            imageName = file.name;
            imageName.toString();

            // const formData = $('#edit-cat-form');

            // var xhr = new XMLHttpRequest();
            // // Add any event handlers here...
            // xhr.open('POST', 'categoriesImage', true);
            // xhr.send(formData);
        }
        

        $.ajax({
            url: 'admin/edit-category?catId=' + catId,
            method: 'put',
            data: { catImage: imageName, categoryName: singleCatName },
            success: function(response){
                console.log(response);
                if(response.message == 'category edited'){
                    // location.href = 'superadmin/manage-categories';
                }
            }
        });
    })
});