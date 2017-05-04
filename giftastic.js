var host = "http://api.giphy.com/v1/gifs/search?q=";
	var apiKey = "&api+key=dc6zaTOxFJmzC";
	var rating = "&rating=pg-13";
	var limit = "&limit=10";
	var keyword = "";
	
	// Array of Pre-gifs
	var topics = ['Stephen Colbert', 'Louis CK', 'Aziz Ansari', 'Dave Chappelle', 'Eddie Murphy', 'Bill Burr', 'Ricky Gervais'];
	
	

	// Ajax run
	function displayGIFs (){
		$('#gifsView').empty();
		var keyword = $(this).attr('data-name');
		var queryURL =  encodeURI(host + keyword + apiKey + limit + rating);

		
		$.ajax({url: queryURL,method: 'GET'}).done(function(response) {
			var results = response.data;
        	console.log(queryURL);
        	console.log(response);
        	console.log(results);

        	for (var i = 0; i < results.length; i++) {
        	
	        	var gifDiv = $('<div class="gif">');

	        	var gifRating = results[i].rating;

				var p = $('<p>').text( "Rating: " + gifRating);

				var image = $('<img>');
				image.attr('id', 'anyImage');
				image.attr('data-still', results[i].images.downsized_still.url);
				image.attr('data-animate', results[i].images.downsized.url);
				image.attr('data-state', 'animate');
				image.attr('src', results[i].images.downsized.url);
				image.on('click',onClick);
		       	gifDiv.append(p);
                gifDiv.append(image);
		       
		       	$('#gifsView').prepend(gifDiv);
	       	};
	    });

		return false;
	}

	

	// Function for adding keyword buttons 
	function renderButtons(){ 
		$('#buttonsView').empty();

		for (var i = 0; i < topics.length; i++){

		    var a = $('<button>'); 
		    a.addClass('gif' + i);
		    a.attr('data-name', topics[i]);
		    a.text(topics[i]);
		    $('#buttonsView').append(a);
		};
	};

	

	// Click event to add new butttonnnn
	$('#addKeyword').on('click', function(){
		keyword = $("#keyword-input").val().trim();
		console.log(keyword);
		topics.push(keyword);
		renderButtons();
		$("#keyword-input").val('');
		
		return false;
	});


	// Function for changing animation of gif
	function onClick(){
    	state = $(this).attr('data-state');
        console.log(state);

        if (state === 'still') {
            var animateUrl = $(this).attr('data-animate');
            console.log(animateUrl);
            $(this).attr('src', animateUrl);
            $(this).attr('data-state', 'animate');
        } else {
            var stillUrl = $(this).attr('data-still');
            console.log(stillUrl);
            $(this).attr('src', stillUrl);
            $(this).attr('data-state', 'still');
        };
    };


    // Click event that calls the displayGIFs function
	$(document).on('click', 'button', displayGIFs);

	
	
	// Loads pre-set keyword buttons in the array
	renderButtons();

	

