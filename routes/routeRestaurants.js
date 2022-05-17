"use strict"

const restaurantdb = require('../models/restaurants/restaurantsDB');

var restaurantsDBObject = new restaurantdb();

function routeRestaurants(app){
    app.route('/restaurants') // Route to get all restaurants (127.0.0.1:8080/restaurants)
        .get(restaurantsDBObject.getAllRestaurants);

    app.route('/restaurants/:id') // Route to get specified restaurant by ID (127.0.0.1:8080/restaraunts/1)
        .get(restaurantsDBObject.getRestaurant);

    app.route('/search') // Route to search restaurant name (127.0.0.1:8080/search)
        .get(restaurantsDBObject.searchRestaurants);
    
    app.route('/filter') // Route to filter restaurant cuisine, price & region (127.0.0.1:8080/filter)
        .get(restaurantsDBObject.filterRestaurants);
}

module.exports = {routeRestaurants};