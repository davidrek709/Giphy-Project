$( document ).ready(function() {

var actions = ["Pandas", "Cats", "Dogs", "Lion", "Penguin", "Wolf"];
// for loop set
function displayGifButtons(){
    $("#gifButtonsView").empty(); 
    for (var i = 0; i < actions.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("action");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", actions[i]);
        gifButton.text(actions[i]);
        $("#gifButtonsView").append(gifButton);
    }
}
// Function to add a new action button
function addNewButton(){
    $("#addGif").on("click", function(){
    var action = $("#action-input").val().trim();
    if (action == ""){
      return false; 
    }
    actions.push(action);

    displayGifButtons();
    return false;
    });
}

function removeLastButton(){
    $("removeGif").on("click", function(){
    actions.pop(action);
    displayGifButtons();
    return false;
    });
}
// display functionality 
function displayGifs(){
    var action = $(this).attr("data-name");
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + action + "&api_key=O9ULKQPpSekZ3YW8mSXTWwSWA3SkJ7DT";
    console.log(queryURL); 
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        console.log(response); 
        $("#gifsView").empty(); 
        var results = response.data; 
        if (results == ""){
          alert("There isn't a gif for this selected button");
        }
        for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>"); 
            gifDiv.addClass("gifDiv");
           
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
            gifImage.attr("data-state", "still"); 
            gifImage.addClass("image");
            gifDiv.append(gifImage);
          
            $("#gifsView").prepend(gifDiv);
        }
    });
}

displayGifButtons(); 
addNewButton();
removeLastButton();
// onclick functional and animating gifs
$(document).on("click", ".action", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});
// last check no error or console.log messages
