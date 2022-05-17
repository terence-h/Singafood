$(document).ready(function () {
    // Replace review button to let the user know that it is required to login to leave a review
    if (!getCookie("user_id")) {
        hideReviewButton();
    }
});

function getRestaurantInfo() {
    var request = new XMLHttpRequest();
    // Run our restaurants route to get all restaurants
    request.open('GET', restaurants_url + getCookie("restId"), true);

    // This function will be called when data returns from the web api
    request.onload = function () {
        // Get all the restaurants records into our restaurant array
        restaurants_array = JSON.parse(request.responseText);

        displayRestaurantInfo()
    };
    request.send();
}

function getRestaurantReviews() {
    var request = new XMLHttpRequest();
    // Run our restaurants route to get all restaurants
    request.open('GET', reviews_url + getCookie("restId"), true);

    // This function will be called when data returns from the web api
    request.onload = function () {
        // Get all the restaurants records into our restaurant array
        reviews_array = JSON.parse(request.responseText);

        displayRestaurantReviews();
    };
    request.send();
}

// Display restaurants based on the data received from the previous function
function displayRestaurantInfo() {
    var table = document.getElementById("restaurant-info");

    table.innerHTML = "";

    var name = restaurants_array[0].name;
    var address = restaurants_array[0].address;
    var price = restaurants_array[0].priceRange;
    var rating = restaurants_array[0].rating;
    var totalReviews = restaurants_array[0].totalReviews;
    var cuisine = restaurants_array[0].cuisineFiltered;
    var description = restaurants_array[0].description;
    rating = rating.toFixed(1); // Show decimal even if whole number (e.g. 2.0, 4.0, 5.0)

    // Replace all vertical bar with comma
    cuisine = cuisine.replace(/\|/g, ",")

    // Display price as $ signs
    switch (price) {
        case 1:
            price = "$";
            break;
        case 2:
            price = "$$";
            break;
        case 3:
            price = "$$$";
            break;
    }

    // Store rating in another variable to make them look like unicode stars
    var ratingToStar;
    switch (true) {
        case (rating < 1):
            ratingToStar = "&#9734; &#9734; &#9734; &#9734; &#9734;";
            break;
        case (rating < 2):
            ratingToStar = "&#9733; &#9734; &#9734; &#9734; &#9734;";
            break;
        case (rating < 3):
            ratingToStar = "&#9733; &#9733; &#9734; &#9734; &#9734;";
            break;
        case (rating < 4):
            ratingToStar = "&#9733; &#9733; &#9733; &#9734; &#9734;";
            break;
        case (rating < 5):
            ratingToStar = "&#9733; &#9733; &#9733; &#9733; &#9734;";
            break;
        case (rating == 5):
            ratingToStar = "&#9733; &#9733; &#9733; &#9733; &#9733;";
            break;
    }

    var cell = '<div class="card card-outline-secondary my-4">' +
                    '<div class="card-header">' +
                        '<h5>' + name + '</h5>' +
                        '<h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + cuisine + '&nbsp;&nbsp;' +
                        '|&nbsp;&nbsp;' + rating + ratingToStar + '&nbsp;(' + totalReviews + ')&nbsp;&nbsp;' +
                        '|&nbsp;&nbsp;' + price + '</h6>' +
                        '<h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + address + '</h6>' +
                    '</div>' +
                    '<div class="card-body">' +
                        '<p>' + description + '</p>' +
                    '</div>' +
                '</div>';

    table.insertAdjacentHTML('beforeend', cell);
}

function displayRestaurantReviews() {
    var table = document.getElementById("reviewCol");

    table.innerHTML = "";
    totalReviews = reviews_array.length;

    // If there's no reviews, show a short text
    if(totalReviews == 0) {
        var cell = '<p class="text-center">There are no reviews for the restaurants</p>'
        table.insertAdjacentHTML('beforeend', cell);
    }
    else { // Display all reviews
        for (var count = 0; count < totalReviews; count++) {
            var comment = reviews_array[count].comment;
            var rating = reviews_array[count].rating;
            var datePosted = reviews_array[count].datePosted;
            var firstName = reviews_array[count].firstName;
            var lastName = reviews_array[count].lastName;
            var profilePicture = reviews_array[count].profilePicture;
            rating = rating.toFixed(1); // Show decimal even if whole number (e.g. 2.0, 4.0, 5.0)

            // Convert the date posted into JS date format
            var dt = datePosted.split(/[- :TZ]/);
            var formattedDatePosted = new Date(Date.UTC(dt[0], dt[1]-1, dt[2], dt[3], dt[4], dt[5]));

            formattedDatePosted = formatDate(formattedDatePosted);

            // Store rating in another variable to make them look like unicode stars
            var ratingToStar;
            switch (true) {
                case (rating < 1):
                    ratingToStar = "&#9734; &#9734; &#9734; &#9734; &#9734;";
                    break;
                case (rating < 2):
                    ratingToStar = "&#9733; &#9734; &#9734; &#9734; &#9734;";
                    break;
                case (rating < 3):
                    ratingToStar = "&#9733; &#9733; &#9734; &#9734; &#9734;";
                    break;
                case (rating < 4):
                    ratingToStar = "&#9733; &#9733; &#9733; &#9734; &#9734;";
                    break;
                case (rating < 5):
                    ratingToStar = "&#9733; &#9733; &#9733; &#9733; &#9734;";
                    break;
                case (rating == 5):
                    ratingToStar = "&#9733; &#9733; &#9733; &#9733; &#9733;";
                    break;
            }
    
            var cell =  '<h6 class="user-rating">' + rating + ratingToStar + '</h6>' +
                        '<p>' + comment + '</p>' +
                        '<img style="height:50px; width: 50px;" src="' + profilePicture + '" alt="" />' +
                        '<small class="text-muted">&nbsp;Posted by <b>' + firstName + ' ' + lastName + '</b> on <i>' + formattedDatePosted + '</i></small>' +
                        '<hr>';
    
            table.insertAdjacentHTML('beforeend', cell);
        }
    }
}

// Set login button to not logged in
function hideReviewButton() {
    var table = document.getElementById("reviewBtn");
    table.innerHTML = "";

    var cell = '<p>You must be logged in to post a review</p>';

    table.insertAdjacentHTML('beforeend', cell);
}

// Get location of restaurant
function initMap() {
    // The location of restaurant
    var locationMap = { lat: 1.3458882, lng: 103.9441225 };
    // The map, centered at locationMap
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 17, center: locationMap });
    // The marker, positioned at locationMap
    var marker = new google.maps.Marker({ position: locationMap, map: map });
}

function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
}