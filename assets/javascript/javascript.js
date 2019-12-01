function deferVideo() {

    event.preventDefault();
  
    //defer html5 video loading
    $("video source").each(function () {
        var sourceFile = $(this).attr("data-src");
        $(this).attr("src", sourceFile);
        var video = this.parentElement;
        video.load();
        // uncomment if video is not autoplay
        //video.play();
    });
  
  }
  window.onload = deferVideo;
  
  $("#search-button").on("click", function (event) {
  
    event.preventDefault();
  
    var area = "washington dc";
  
    var term = $("#search-bar").val().trim();
    
    var limit = 9;
    var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + term + "&location=" + area + "&limit=" + limit;
  
    $.ajax({
        url: myurl,
        headers: {
            'Authorization': 'Bearer CQyjp-RgawIwg5t4KxXPXZXhlSR-U-ItI3WxHS5Y9uehwp8WZQU71Nu6bLcUXWNkCtdzGllnazEF9OqL8xSvT3oympMUnurCPhOefXHqxxa0QtK2jp0BTK_gKbYPXXYx',
        },
        method: 'GET',
        dataType: 'json',
        success: function (response) {
  
            console.log(response);
  
            for (i=0; i<limit; i++) {                   
            
            var resultImg = "<img id='resuls-here' class='card-img-top' class='center' src=" + response.businesses[i].image_url + " alt='Card image cap'></img>";
            var resultName = "<h5 class='card-title'>" + response.businesses[i].name + "</h5>";
            var resultRating = "<li class='list-group-item'> Rating: " + response.businesses[i].rating + " Stars</li>";
            var resultAddress = "<li class='list-group-item'>" + response.businesses[i].location.address1 + " " + response.businesses[i].location.city + " " + response.businesses[i].location.zip_code + "</li>";
            var resultLink = "<a href=" + response.businesses[i].url + "class='card-link'>" + response.businesses[i].name + "'s Yelp Page</a><p><p>"
  
            var resultDiv = $("<div class='result-card-body' class='col-sm-4'>" + resultImg + resultName + resultRating + resultAddress + resultLink + "</div>");
  
            $("#results-here").append(resultDiv);    
  
            }
  
        }
    });
  });
  $(".menu1-item").click(function() {
    $("#menu1").text($(this).attr("id"));
   });