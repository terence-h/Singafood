$(document).ready(function () {

    // Remove restId cookie as it is not used
    document.cookie = "restId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Show toast notification that user is not logged in and not allowed to access the user dashboard
    if(localStorage.getItem("notloggedinDashboard")) {
        notify('error', 'Unauthorized access!', 'You need to be logged in to access the user dashboard!');
        localStorage.removeItem("notloggedinDashboard");
    }

});

// Return search querys on URL (/search?region=xxx&name=yyy)
function getSearchQuery() {
    // Create 2 array to store queries
    var region = [], name = []

    // Push each indiviudal query into the array
    data = $('searchForm').find('select:not([name="region"])').serialize();
    $('form').find('select[name="region"]').each(function () {
        region.push(this.value);
    });

    data = $('searchForm').find('input:not([name="name"])').serialize();
    $('form').find('input[name="name"]').each(function () {
        name.push(this.value);
    });

    // Format the search route (?region=xxx&name=yyy)
    data += '?region=' + region.join('') + '&name=' + name.join('');
    return data;
}

// Format the queries
function getFilterQuery() {
    // Create 3 array to store queries
    var cuisineId = [], region = [], price = []

    // Push each indiviudal query into the array
    data = $('filterForm').find('input:not([name="cuisine"])').serialize();
    $('form').find('input[name="cuisine"]:checked').each(function () {
        cuisineId.push(this.value);
    });

    data = $('filterForm').find('input:not([name="region"])').serialize();
    $('form').find('input[name="region"]:checked').each(function () {
        region.push(this.value);
    });

    data = $('filterForm').find('input:not([name="price"])').serialize();
    $('form').find('input[name="price"]:checked').each(function () {
        price.push(this.value);
    });

    // Format the filter route (?cuisine=xxx&region=yyy&price=zzz)
    data += '?cuisine=' + cuisineId.join('') + '&region=' + region.join('') + '&price=' + price.join('');
    return data;
}

// Disable checking more boxes if cuisine checkbox has 3 checked and refresh restaurants list
function limitFilterAndRefresh() {
    $('input[name="cuisine"]').filter(':not(:checked)').prop('disabled', $('input[name="cuisine"]').filter(':checked').length >= 3);
    getFilterData();
}

// Reset disable limit when filters are cleared and refresh restaurants list (onchange not called when reset filters is clicked)
function resetLimitAndRefresh() {
    $('input[name="cuisine"]').prop('disabled', false);
    getRestaurantData();
}

// Show all restaurants when page loads or reset filter is clicked
function getRestaurantData() {
    var request = new XMLHttpRequest();
    // Run our restaurants route to get all restaurants
    request.open('GET', restaurants_url, true);

    // This function will be called when data returns from the web api
    request.onload = function () {
        // Get all the restaurants records into our restaurant array
        restaurants_array = JSON.parse(request.responseText);

        // Call the function so as to display all restaurants
        displayRestaurants();
    };
    request.send();
}

// Get search results when search form is submitted (enter key)
function getSearchData() {
    var request = new XMLHttpRequest();

    // Run our restaurants route to get search results (getSearchQuery in 'functions.js')
    request.open('GET', search_url + getSearchQuery(), true);

    // This function will be called when data returns from the web api
    request.onload = function () {
        // Get all the search results into the array
        restaurants_array = JSON.parse(request.responseText);

        // We'll still use displayRestaurants function as we only filtered out using our '/search' route
        displayRestaurants();
    };
    // This command starts the calling of the restaurants review web api
    request.send();
}

// Filter restaurants when any changes are made in the form
function getFilterData() {
    var request = new XMLHttpRequest();

    // Run our restaurants route to get all restaurants
    request.open('GET', filter_url + getFilterQuery(), true);

    // This function will be called when data returns from the web api
    request.onload = function () {
        // Get all the restaurants records into our restaurant array
        restaurants_array = JSON.parse(request.responseText);

        // Call the function so as to display all restaurants
        displayRestaurants();
    };
    request.send();
}

// Set a cookie to represent the restaurant id for information
function setSpecifiedRestaurant(restId) {
    document.cookie = "restId=" + restId
    window.location.replace("restaurant.html");
}

// Display restaurants based on the data received from the previous function
function displayRestaurants() {
    var table = document.getElementById("restaurantsTable");
    var restaurantCount = 0;
    var message = "";

    table.innerHTML = "";
    totalRestaurants = restaurants_array.length;

    for (var count = 0; count < totalRestaurants; count++) {
        var restId = restaurants_array[count].id;
        var name = restaurants_array[count].name;
        var price = restaurants_array[count].priceRange;
        var rating = restaurants_array[count].rating;
        var totalReviews = restaurants_array[count].totalReviews;
        var thumbnail = restaurants_array[count].thumb;
        var cuisine = restaurants_array[count].cuisineFiltered;
        rating = rating.toFixed(1); // Show decimal even if whole number (e.g. 2.0, 4.0, 5.0)

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
        
        var cell = '<div class="col-lg-3 mb-4">' +
                        '<div class="card h-100">' +
                            '<div class="hovereffect">' +
                                '<a href="restaurant.html"><img class="card-img-top" src="' + thumbnail + '" alt=""></a>' +
                                '<div class="overlay">' +
                                    // '<a class="info" href="restaurant.html">More Info</a>' +
                                    '<a class="info" href="javascript:setSpecifiedRestaurant(' + restId + ')">More Info</a>' +
                                '</div>' +
                            '</div>' +
                            // '<div class="card-body">' +
                            '<div class="card-body" style="margin-bottom: 10px;">' +
                                '<h4 class="card-title">' +
                                    // '<a href="restaurant.html">' + name + '</a>' +
                                    '<a href="javascript:setSpecifiedRestaurant(' + restId + ')">' + name + '</a>' +
                                '</h4>' +
                                '<p class="card-text">' + cuisine + '</p>' +
                            '</div>' +
                            '<div class="card-footer">' +
                                '<small class="text-muted">' + rating + '&nbsp' + ratingToStar + '&nbsp(' + totalReviews + ') | ' + price + '</small>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
        table.insertAdjacentHTML('beforeend', cell);
        restaurantCount++;
    }
    message = restaurantCount + " restaurants ";
    document.getElementById("summary").textContent = message;
    document.getElementById("parent").textContent = "";
}