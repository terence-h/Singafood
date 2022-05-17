"use strict"

const db = require('../db-connection');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(request, file, callback) {
        callback(null, './public/images/users/')
    },
    filename: function(request, file, callback) {
        // Store file with date and time to prevent duplicate file name
        // callback(null, new Date().toISOString().replace(/:|\./g,'') + ' - ' + file.originalname)
        callback(null, file.originalname)
    }
});

const fileFilter = function(request, file, callback) { 
    // reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true);
    }
    else {
        callback("Error! Invalid file format.", false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB max
    },
    fileFilter: fileFilter // only accept jpeg and png
});

const usersdb = require('../models/users/usersDB');

var usersDBObject = new usersdb();

function routeUsers(app) {
    app.route('/register') // Route to register account (127.0.0.1:8080/register)
        .post(usersDBObject.addUser);

    app.route('/user/:id')
        .delete(usersDBObject.deleteUser) // Route to delete account (127.0.0.1:8080/user/1)
        .put(usersDBObject.updateUser); // Route to update user information (127.0.0.1:8080/user/1)

    app.route('/user/resetPassword')
        .post(usersDBObject.resetPassword); // Route to reset account password (127.0.0.1:8080/resetPassword)

    app.route('/login')
        .post(usersDBObject.loginUser); // Route to login account (127.0.0.1:8080/login)

    app.route('/logout')
        .post(usersDBObject.logoutUser); // Route to logout account (127.0.0.1:8080/logout)

    app.post("/user/profilepicture/:id", upload.single('profilePicture'), function (request, respond, next) {
        
        if (!request.file) {
            console.log("Please upload a file");
            respond.send('Please upload a file');
        }
        else{
            // SQL syntax for updating user account
            var sql = "UPDATE users SET profilePicture = ? WHERE id = ?";

            var userid = request.params.id;

            // Add location path to filename for SQL purpose
            var path = "images/users/" + request.file.filename;

            db.query(sql, [path, userid], function (error, result) {
                if (error) {
                    throw error;
                }
                else {
                    respond.json(result);
                }
            });
        }
    });
}

module.exports = { routeUsers };