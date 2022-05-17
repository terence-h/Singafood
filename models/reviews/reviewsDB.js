"use strict"

const db = require('../../db-connection');
const Review = require('./reviews');

class reviewsDB{
    getAllReviews(request, respond){
        var sql = "SELECT * FROM reviews";

        db.query(sql, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }

    getRestaurantReviews(request, respond){
        var sql = "SELECT * FROM reviews \
        INNER JOIN users ON (reviews.userID = users.id) \
        WHERE reviews.restID = ?;"

        db.query(sql, request.params.restID, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }

    addReview(request, respond){
        var now = new Date(); // Get current date & time

        // Convert ISO time (UTC) into local time then convert into SQL DATETIME syntax
        now = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 19).replace('T', ' ');

        // Set JSON body to reviews.js constructor for get/set
        var reviewObject = new Review(null, request.params.restID, request.body.userID, request.body.comment, request.body.rating, now);

        // SQL syntax for inserting review and update restaurant overall average ratings
        var sql = "INSERT INTO reviews (restID, userID, comment, rating, datePosted) VALUES(?,?,?,?,?); UPDATE restaurants SET rating = (SELECT ROUND(AVG(rating), 1) FROM reviews WHERE restID = ?), totalReviews = totalReviews + 1 WHERE id = ?;";
        
        // Parameters for SQL syntax
        var values = [reviewObject.getRestId(), reviewObject.getUserId(), reviewObject.getComment(), reviewObject.getRating(), now, reviewObject.getRestId(), reviewObject.getRestId()];
       
        db.query(sql, values, function (error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }

    deleteReview(request, respond){
        // Set JSON body to reviews.js constructor for get/set
        var reviewObject = new Review(request.params.id, request.params.restID);
        
        // SQL syntax for deleting review and update restaurant overall average ratings
        var sql = "DELETE FROM reviews WHERE id = ?; UPDATE restaurants SET rating = (SELECT ROUND(AVG(rating), 1) FROM reviews WHERE restID = ?), totalReviews = totalReviews - 1 WHERE id = ?;";
        
        // Parameters for SQL syntax
        var restID = reviewObject.getRestId();

        db.query(sql, [reviewObject.getId(), restID, restID], function (error, result) {
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
          });
    }

    updateReview(request, respond){
        // Set JSON body to reviews.js constructor for get/set
        var reviewObject = new Review(request.params.id, request.params.restID, request.body.userID, request.body.comment, request.body.rating);

        // SQL syntax for updating review and restaurant overall average ratings
        var sql = "UPDATE reviews SET ";
        
        // Parameters for SQL syntax
        var values = [reviewObject.getComment(), reviewObject.getRating(), reviewObject.getId(), reviewObject.getRestId()];
        
        // Create an empty array to store the values array depending on the amount of user inputs
        var finalValues = [];

        if(values[0]){ // If comments is not null
            // Push user input into finalValues array
            finalValues.push(values[0]);

            // Add SQL syntax to the back of the variable
            sql += ", comment = ?";
        }
        if(values[1]){ // If rating is not null
            // Push user input into finalValues array
            finalValues.push(values[1]);

            // Add SQL syntax to the back of the variable
            sql += ", rating = ?";
        }

        // Exclude the first comma to prevent SQL syntax error
        if(sql.indexOf(",") == 19){
            sql = sql.slice(0, 19) + sql.slice(20, sql.length);
        }

        // Push review ID to update the row & update the average ratings of the restaurant
        sql += " WHERE id = ?; UPDATE restaurants SET rating = (SELECT ROUND(AVG(rating), 1) FROM reviews WHERE restID = ?) WHERE id = ?;";
        finalValues.push(values[2], values[3], values[3]);

        db.query(sql, finalValues, function (error, result) {
            if(error){
                throw error;
            }
            else{
                
                respond.json(result);
            }
        });
    }
}

module.exports = reviewsDB;