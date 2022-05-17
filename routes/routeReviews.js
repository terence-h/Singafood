"use strict"

const reviewsdb = require('../models/reviews/reviewsDB');

var reviewsDBObject = new reviewsdb();

function routeReviews(app){
    app.route('/reviews')
        //.post(reviewsDBObject.addReview) // Route to add review (127.0.0.1:8080/reviews)
        .get(reviewsDBObject.getAllReviews); // Route to get all reviews (127.0.0.1:8080/reviews)
    
    app.route('/reviews/:restID')
        .get(reviewsDBObject.getRestaurantReviews)
        .post(reviewsDBObject.addReview); // Route to add review (127.0.0.1:8080/restaurants/1/reviews/3/postreview)

    app.route('/reviews/:restID/:id')
        .delete(reviewsDBObject.deleteReview) // Route to delete user review (127.0.0.1:8080/restaurants/1/reviews/3)
        .put(reviewsDBObject.updateReview); // Route to update user review (127.0.0.1:8080/restaurants/2/reviews/4)
}

module.exports = {routeReviews};