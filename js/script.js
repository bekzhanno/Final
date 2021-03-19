$(document).ready(function(){
	$('#registration_btn').on('click', function(){
		let firstname, lastname, email, password;
		firstname = $('#reg_firstname').val();
		lastname = $('#reg_lastname').val();
		email = $('#reg_email').val();
		password = $('#reg_password').val();
		if(firstname != '' && lastname != '' && email != '' && password != ''){
			$.getJSON("../db.json", function(data){
				let lastId;
				if(data['users'].length != 0){
					let lastObj = data['users'][data['users'].length - 1];
					lastId = lastObj.id;
				} else {
					lastId = 0;
				}

				let newUser = {
					id: lastId + 1,
					firstname: firstname,
					lastname: lastname,
					email: email,
					password: password
				}
				data['users'].push(newUser);
				var newData = JSON.stringify(data);
				jQuery.post('http://final/saveJSON.php', {
				    newData: newData
				});
				alert("Registration was succesfully completed");
				window.location.href = "login.html";
			});
		} else {
			alert('Fill in all gaps');
		}
	});

	$('#authorization_btn').on('click', function(){
		let email, password;
		email = $('#auth_email').val();
		password = $('#auth_password').val();
		if(email != '' && password != ''){
			$.getJSON("../db.json", function(data){
				$.each(data['users'], function(index, object){
					if(object.email == email && object.password == password){
						window.location.href = 'index.html';
					}
				});
			});
		} else {
			alert('Fill in all gaps');
		}
	});

	$('.response-block-category h1').on('click',function(){
		let block = $(this).parent().find('p');
		let category = $(this).html().toLowerCase();
		$.getJSON( "http://localhost:3000/"+category, function( data ) {
		  var objects = '';
		  $.each( data, function( index, field ) {
		  	objects += '<div class="response-obj">';
		  	$.each(field, function( key, value ) {
		  		objects += '<div class="response-obj-field">'+
                '<div class="response-key">'+key+'</div>'+
                '<div class="response-value">'+value+'</div>'+
              '</div>';
		  	});
		  	objects += '</div>';
		  });
		  block.html(objects);
		});
	});
});