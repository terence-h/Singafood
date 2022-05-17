"use strict"

const db = require('../../db-connection');

class restaurantsDB{
    getAllRestaurants(request, respond){
        // SQL syntax for retrieving all restaurants information
        // var sql = "SELECT * FROM restaurants";
        var sql ="SELECT r.*, GROUP_CONCAT(c.cuisineType SEPARATOR ' | ') as cuisineFiltered FROM cuisine as c\
        INNER JOIN restcuisine AS rc ON (rc.cuisineID = c.id)\
        INNER JOIN restaurants AS r ON (r.id = rc.restID) GROUP BY r.id, r.name;"

        db.query(sql, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }

    getRestaurant(request, respond){
        // SQL syntax for retrieving specified restaurant by ID
        var sql = "SELECT r.*, GROUP_CONCAT(c.cuisineType SEPARATOR ' | ') as cuisineFiltered FROM cuisine as c\
        INNER JOIN restcuisine AS rc ON (rc.cuisineID = c.id)\
        INNER JOIN restaurants AS r ON (r.id = rc.restID) WHERE r.id = ? GROUP BY r.id, r.name"

        db.query(sql, request.params.id, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }

    searchRestaurants(request, respond){
        // Get user inputs for searching
        var searchName = request.query['name']; // Restaurant name
        var searchRegion = request.query['region']; // Restaurant region

        if(searchRegion.length > 3){ // If user selected a region (all is considered not selected)
            var sql = "SELECT r.*, GROUP_CONCAT(c.cuisineType SEPARATOR ' | ') as cuisineFiltered FROM cuisine as c \
            INNER JOIN restcuisine AS rc ON (rc.cuisineID = c.id) \
            INNER JOIN restaurants AS r ON (r.id = rc.restID) WHERE r.name LIKE '%" + searchName + "%' \
            AND r.region LIKE '" + searchRegion + "'" + " GROUP BY r.id, r.name";
        }
        else{ // Only restaurant name was searched
            var sql = "SELECT r.*, GROUP_CONCAT(c.cuisineType SEPARATOR ' | ') as cuisineFiltered FROM cuisine as c \
            INNER JOIN restcuisine AS rc ON (rc.cuisineID = c.id) \
            INNER JOIN restaurants AS r ON (r.id = rc.restID) \
            WHERE r.name LIKE '%" + searchName + "%'" + " GROUP BY r.id, r.name";
        }

        db.query(sql, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }

    filterRestaurants(request, respond){
        // Get user inputs for filtering
        var filterId = request.query['cuisine']; // Cuisine ID
        var filterRegion = request.query['region']; // Restaurant region
        var filterPrice = request.query['price']; // Restaurant price range
        
        if(!filterId && !filterRegion && !filterPrice){
            var sql = "SELECT r.*, GROUP_CONCAT(c.cuisineType SEPARATOR ' | ') as cuisineFiltered FROM cuisine as c \
            INNER JOIN restcuisine AS rc ON (rc.cuisineID = c.id) INNER JOIN restaurants AS r ON (r.id = rc.restID)" + " GROUP BY r.id, r.name;";
        }
        else if(filterId){ // If user selected a cuisine
            filterId = filterId.split(""); // Split cuisine into an array with own individual index to filter multiple cuisine

            var sql = "SELECT r.*, GROUP_CONCAT(c.cuisineType SEPARATOR ' | ') as cuisineFiltered FROM cuisine as c \
            INNER JOIN restcuisine AS rc ON (rc.cuisineID = c.id) INNER JOIN restaurants AS r ON (r.id = rc.restID)"; 

            if(filterRegion && !filterPrice){ // filter 5 (cuisine id + region)
                sql += " WHERE r.region LIKE '" + filterRegion + "'" + " AND";
            }
            else if(!filterRegion && filterPrice){ // filter 6 (cuisine id + price)
                sql += " WHERE r.priceRange = " + filterPrice + " AND";
            }
            else if(filterRegion && filterPrice){ // filter 7 (cuisine id + region + price)
                sql += " WHERE r.region LIKE '" + filterRegion + "'" + " AND r.priceRange = " + filterPrice + " AND";
            }
            else{ // filter 1 (cuisine only)
                sql += " WHERE";
            }

            switch(filterId.length){ // Format SQL syntax based on how many cuisine is selected
                case 1:
                    sql += " rc.cuisineID IN (" + filterId + ")" + " GROUP BY r.id, r.name";
                    break;
                case 2:
                    sql += " rc.cuisineID IN (" + filterId[0] + "," + filterId[1] + ")" + " GROUP BY r.id, r.name";
                    break;
                case 3:
                    sql += " rc.cuisineID IN (" + filterId[0] + "," + filterId[1] + "," + filterId[2] + ")" + " GROUP BY r.id, r.name";
                    break;  
            }
        }
        else if(!filterId){
            if(filterRegion && !filterPrice){ // filter 2 (region only)
                var sql = "SELECT r.*, GROUP_CONCAT(c.cuisineType SEPARATOR ' | ') as cuisineFiltered FROM cuisine as c \
                INNER JOIN restcuisine AS rc ON (rc.cuisineID = c.id) \
                INNER JOIN restaurants AS r ON (r.id = rc.restID)\
                WHERE r.region LIKE '" + filterRegion + "'" + " GROUP BY r.id, r.name";
            }
            else if(!filterRegion && filterPrice){ // filter 3 (price range only)
                var sql = "SELECT r.*, GROUP_CONCAT(c.cuisineType SEPARATOR ' | ') as cuisineFiltered FROM cuisine as c \
                INNER JOIN restcuisine AS rc ON (rc.cuisineID = c.id) \
                INNER JOIN restaurants AS r ON (r.id = rc.restID) \
                WHERE r.priceRange = " + filterPrice + " GROUP BY r.id, r.name";
            }
            else if(filterRegion && filterPrice){ // filter 4 (region + price)
                var sql = "SELECT r.*, GROUP_CONCAT(c.cuisineType SEPARATOR ' | ') as cuisineFiltered FROM cuisine as c \
                INNER JOIN restcuisine AS rc ON (rc.cuisineID = c.id) \
                INNER JOIN restaurants AS r ON (r.id = rc.restID) \
                WHERE r.region LIKE '" + filterRegion + "'" + " AND r.priceRange = " + filterPrice + " GROUP BY r.id, r.name";
            }
        }
        
        db.query(sql, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }
}

module.exports = restaurantsDB;