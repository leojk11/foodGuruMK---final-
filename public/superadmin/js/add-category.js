$(document).ready(function(){
	$('#new_category').click(function(event){
        // event.preventDefault();
        const nameInput = $('#name');

        var input = $('#real-file')[0];
        var file = input.files[0];
        var fileName = file.name;

        const data = { name: nameInput.val(), image: fileName };

        const options = { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(data) };

        fetch('/admin/new-category', options)
            .then((response) => { return response.json() })
            .then((myJson) => { /*console.log(myJson)*/ })
    })
});