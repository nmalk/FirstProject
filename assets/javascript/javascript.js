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

  var queryURL;
  var queryParams;
  var selector = "";
  var limit = 10;
  var areButtons = false;

  $(".menu1-item").click(function () {
    $("#menu1").text($(this).attr("id"));
    selector = $("#menu1").text();
    $("#results-here").empty();
    $("#buttons-here").empty();
    areButtons = false;
    // $("#search-here").empty();
    // if(selector === "Recipes"){
    //   $("#search-here").append("<input id='search-bar' type='search' placeholder='Food Goes Here: General or Specific!!!' style='color: ivory'>");
    //   $("#search-here").append("<button id='search-button' class='btn btn-lg btn-success' type='submit'>Search</button>");
    // }
    // if(selector === "Restaurants Near You"){
    //   $("#search-here").append("<input id='search-bar' type='search' placeholder='Food Goes Here: General or Specific!!!' style='color: ivory'>");
    //   $("#search-here").append("<input id='location-bar' type='search' placeholder='Location Here: General or Specific!!!' style='color: ivory'>");
    //   $("#search-here").append("<button id='search-button' class='btn btn-lg btn-success' type='submit'>Search</button>");    
    // }
    // if(selector === "Cooking Classes"){
    //   $("#search-here").append("<input id='location-bar' type='search' placeholder='Location Here: General or Specific!!!' style='color: ivory'>");
    //   $("#search-here").append("<button id='search-button' class='btn btn-lg btn-success' type='submit'>Search</button>");     
    // }
  });
  
  $("#buttons-here").click(function () {
    event.preventDefault();
    $("#results-here").empty();
    $("#search-bar").empty();
    $("#location-bar").empty();
    $("#buttons-here").empty();
    areButtons = false;
  });
  
  // $("#moreResults-button").click(function () {
  //   event.preventDefault();
  //   limit = limit + 10;
  //   console.log(limit);
  //   $("#results-here").empty();
  //   if (selector === "Restaurants Near You") {
  //     RestaurantsNearYou();
  //   }
  //   if (selector === "Cooking Classes") {
  //     CookingClasses();
  //   }
  //   if (selector === "Recipes") {
  //     RecipeSearch();
  //   }
  // });
  
  $("#search-button").on("click", function (event) {
    event.preventDefault();
    $("#results-here").empty();
    if (!areButtons){
      $("#buttons-here").append("<button id='clear-button' class='btn btn-lg btn-success' type='submit'>Clear Results</button>");
    //   $("#buttons-here").append("<button id='moreResults-button' class='btn btn-lg btn-success' type='submit'>More Results</button>");
      areButtons = true;
    }
    if (selector === "Restaurants Near You") {
      RestaurantsNearYou();
    }
    if (selector === "Cooking Classes") {
      CookingClasses();
    }
    if (selector === "Recipes") {
      RecipeSearch();
    }
  });
  
  function CookingClasses() {
    event.preventDefault();
    takeClasses();
    console.log(classParams, classURL);
    $.ajax({
      url: classURL,
      method: "GET",
      data: classParams,
      dataType: 'json'
    }).done(function (classKi) {
      console.log(classKi);
      var result1 = classKi.events;
      for (var k = 0; k < limit; k++) {
        var result1Img = "<img id='img' class='card-img-top' class='center' src='cookingClass1.png' alt='Card image cap'></img>";
        var result1Title = "<h5 class='list-group-item' class='card-title'>" + result1.event[k].title + "</h5>";
        var result1Start = "<li class='list-group-item'>" + result1.event[k].start_time + "</li>";
        var result1Address = "<li class='list-group-item'>" + result1.event[k].venue_address + " " + result1.event[k].city_name + " " + result1.event[k].region_name + "</li>";
        var result1Link = "<a class='list-group-item' href=" + result1.event[k].url + ">" + result1.event[k].title;
        var classLife = $("<div class='result-card-body' class='col-sm-4'>" + result1Img + result1Title + result1Start + result1Address + result1Link + "</div>");
        $("#results-here").append(classLife);
      }
    });
    event.preventDefault();
  };
  
  function RestaurantsNearYou() {
    event.preventDefault();
    var area = $("#location-bar").val().trim();
    var term = $("#search-bar").val().trim();
    var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + term + "&location=" + area + "&limit=" + limit;
    $.ajax({
      url: myurl,
      headers: {
        'Authorization': 'Bearer CQyjp-RgawIwg5t4KxXPXZXhlSR-U-ItI3WxHS5Y9uehwp8WZQU71Nu6bLcUXWNkCtdzGllnazEF9OqL8xSvT3oympMUnurCPhOefXHqxxa0QtK2jp0BTK_gKbYPXXYx',
      },
      method: 'GET',
      dataType: 'json',
      success: function (response) {
        for (i = 0; i < limit; i++) {
          var resultImg = "<img id='img' class='card-img-top' class='center' src=" + response.businesses[i].image_url + " alt='Card image cap'></img>";
          var resultName = "<h5 class='list-group-item' class='card-title'>" + response.businesses[i].name + "</h5>";
          var resultRating = "<li class='list-group-item'> Rating: " + response.businesses[i].rating + " Stars</li>";
          var resultAddress = "<li class='list-group-item'>" + response.businesses[i].location.address1 + " " + response.businesses[i].location.city + " " + response.businesses[i].location.zip_code + "</li>";
          var resultLink = "<a class='list-group-item' href=" + response.businesses[i].url + "class='card-link'>" + response.businesses[i].name + "'s Yelp Page</a><p><p>"
          var restaurantDiv = $("<div class='result-card-body' class='col-sm-4'>" + resultImg + resultName + resultRating + resultAddress + resultLink + "</div>");
          $("#results-here").append(restaurantDiv);
        };
      }
    });
  };
  
  function RecipeSearch() {
    event.preventDefault();
    hello();
    $.ajax({
      url: queryURL,
      method: "GET",
      data: queryParams
    })
      .then(function (response) {
        for (var i = 0; i < limit; i++) {
          var images = "<img class='card-img-top' class='center' src=" + response.hits[i].recipe.image + " alt='Card image cap'></img>";
          var recipeLink = "<a class='list-group-item' href=" + response.hits[i].recipe.url + "class='card-link'>" + response.hits[i].recipe.label + "</a><p><p>"
          var foodLife = $("<div class='result-card-body' class='col-sm-4'>" + images + recipeLink + "</div>");
          $("#results-here").append(foodLife);
        }
      });
  }
  
  function hello() {
    queryURL = "https://api.edamam.com/search?";
    queryParams = {
      "app_id": "8cf95bef",
      "app_key": "ac167b48917875f7343e97f1423f5902"
    };
    queryParams.q = $("#search-bar").val().trim();
  }
  
  function takeClasses() {
    var area = $("#location-bar").val().trim();
    classURL = "https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?q=cooking&l="+ area +"&within=10&units=miles&c=cooking"
    classParams = {
      "app_key": "Xgj2Vg7ptjMQR6q2"
    };
    classParams.q = "cooking"
  }






  
//   $("#search-button").on("click", function (event) {
  
//     event.preventDefault();
  
//     var area = "washington dc";
  
//     var term = $("#search-bar").val().trim();
    
//     var limit = 9;
//     var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + term + "&location=" + area + "&limit=" + limit;
  
//     $.ajax({
//         url: myurl,
//         headers: {
//             'Authorization': 'Bearer CQyjp-RgawIwg5t4KxXPXZXhlSR-U-ItI3WxHS5Y9uehwp8WZQU71Nu6bLcUXWNkCtdzGllnazEF9OqL8xSvT3oympMUnurCPhOefXHqxxa0QtK2jp0BTK_gKbYPXXYx',
//         },
//         method: 'GET',
//         dataType: 'json',
//         success: function (response) {
  
//             console.log(response);
  
//             for (i=0; i<limit; i++) {                   
            
//             var resultImg = "<img id='resuls-here' class='card-img-top' class='center' src=" + response.businesses[i].image_url + " alt='Card image cap'></img>";
//             var resultName = "<h5 class='card-title'>" + response.businesses[i].name + "</h5>";
//             var resultRating = "<li class='list-group-item'> Rating: " + response.businesses[i].rating + " Stars</li>";
//             var resultAddress = "<li class='list-group-item'>" + response.businesses[i].location.address1 + " " + response.businesses[i].location.city + " " + response.businesses[i].location.zip_code + "</li>";
//             var resultLink = "<a href=" + response.businesses[i].url + "class='card-link'>" + response.businesses[i].name + "'s Yelp Page</a><p><p>"
  
//             var resultDiv = $("<div class='result-card-body' class='col-sm-4'>" + resultImg + resultName + resultRating + resultAddress + resultLink + "</div>");
  
//             $("#results-here").append(resultDiv);    
  
//             }
  
//         }
//     });
//   });
//   $(".menu1-item").click(function() {
//     $("#menu1").text($(this).attr("id"));
//    });












  
  
  