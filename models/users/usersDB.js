"use strict"

const db = require('../../db-connection');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const user = require('./users');

const saltRounds = 10;

// E-mail account used to send reset password details
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'automated.singafood@gmail.com',
        pass: 'strictlycdev150'
    }
});

class usersDB {
    getAllUsers(request, respond) {
        var sql = "SELECT * FROM users";

        db.query(sql, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    async addUser(request, respond) {
        // Set JSON body to users.js constructor for get/set
        var userObject = new user(null, request.body.username, request.body.password, request.body.address, request.body.firstName,
            request.body.lastName, request.body.email, request.body.gender, request.body.contact);

        var sql;

        // Parameters for SQL syntax
        var values = [userObject.getUsername(), await bcrypt.hash(userObject.getPassword(), saltRounds), userObject.getAddress(), userObject.getFirstName(),
        userObject.getLastName(), userObject.getEmail(), userObject.getGender(), userObject.getContact()];

        sql = "SELECT username, email, contact FROM users WHERE username = ? OR email = ? OR contact = ?";

        db.query(sql, [values[0], values[5], values[7]], function (error, result) {
            if (error) {
                throw error;
            }
            else {
                if (result.length < 1) {
                    // SQL syntax for inserting user account
                    sql = "INSERT INTO users (username, password, address, firstName, lastName, email, gender, contact) VALUES(?,?,?,?,?,?,?,?)";

                    db.query(sql, values, function (error, result) {
                        if (error) {
                            throw error;
                        }
                        else {
                            respond.clearCookie('resetPassword');
                            respond.json(result);
                        }
                    });
                }
                else {
                    // Duplicate username, email or contact found
                    respond.end();
                }
            }
        });
    }

    deleteUser(request, respond) {
        var userID = request.params.id

        var sql = "DELETE FROM reviews WHERE userID = ?;DELETE FROM users WHERE id = ?";

        db.query(sql, [userID, userID], function (error, result) {
            if (error) {
                throw error;
            }
            else {
                request.session.destroy(); // Destroy session
                respond.clearCookie('user_id'); // Clear user logged in cookie
                respond.json(result);
            }
        });
    }

    async updateUser(request, respond) {
        // Set JSON body to users.js constructor for get/set
        var password = request.body.password,
            userObject = new user(request.params.id, request.body.username, request.body.address, request.body.firstName,
            request.body.lastName, request.body.email, request.body.gender, request.body.contact);

        // SQL syntax for updating user account
        var sql = "UPDATE users SET ";

        // Prevent bcrypt from hashing empty password field as it causes crashes.
        if (!password) {
            // Parameters for SQL syntax
            var values = [userObject.getPassword(), userObject.getAddress(), userObject.getFirstName(), userObject.getLastName(),
            userObject.getEmail(), userObject.getGender(), userObject.getContact(), userObject.getId()];
        }
        else {
            // Parameters for SQL syntax
            var values = [await bcrypt.hash(userObject.getPassword(), saltRounds), userObject.getAddress(), userObject.getFirstName(), userObject.getLastName(),
            userObject.getEmail(), userObject.getGender(), userObject.getContact(), userObject.getId()];
        }

        // Create an empty array to store the values array depending on the amount of user inputs
        var finalValues = [];

        if (values[0]) { // If password is not null
            // Push user input into finalValues array
            finalValues.push(values[0]);

            // Add SQL syntax to the back of the variable
            sql += ", password = ?";
        }
        if (values[1]) { // If address is not null
            // Push user input into finalValues array
            finalValues.push(values[1]);

            // Add SQL syntax to the back of the variable
            sql += ", address = ?";
        }
        if (values[2]) { // If firstName is not null
            // Push user input into finalValues array
            finalValues.push(values[2]);

            // Add SQL syntax to the back of the variable
            sql += ", firstName = ?";
        }
        if (values[3]) { // If lastName is not null
            // Push user input into finalValues array
            finalValues.push(values[3]);

            // Add SQL syntax to the back of the variable
            sql += ", lastName = ?";
        }
        if (values[4]) { // If email is not null
            // Push user input into finalValues array
            finalValues.push(values[4]);

            // Add SQL syntax to the back of the variable
            sql += ", email = ?";
        }
        if (values[5]) { // If gender is not null
            // Push user input into finalValues array
            finalValues.push(values[5]);

            // Add SQL syntax to the back of the variable
            sql += ", gender = ?";
        }
        if (values[6]) { // If contact is not null
            // Push user input into finalValues array
            finalValues.push(values[6]);

            // Add SQL syntax to the back of the variable
            sql += ", contact = ?";
        }

        // Exclude the first comma to prevent SQL syntax error
        if (sql.indexOf(",") == 17) {
            sql = sql.slice(0, 17) + sql.slice(18, sql.length);
        }

        // Push user ID to update the row
        sql += " WHERE id = ?";
        finalValues.push(values[7]);

        db.query(sql, finalValues, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    async resetPassword(request, respond) {
        // Set JSON body to users.js constructor for get/set
        var email = request.body.email,
            userObject = new user(request.params.id, request.body.username, request.body.password, request.body.address, request.body.firstName,
                request.body.lastName, email);

        // SQL syntax for validating user inputs matches with SQL database
        var sql = "SELECT * FROM users WHERE username = ? AND email = ?";

        // Generate random password
        var randomPassword = Math.random().toString(36).slice(-8);
        console.log("Random password: " + randomPassword);

        // Parameters for SQL syntax and store hashed password
        var values = [await bcrypt.hash(randomPassword, saltRounds), userObject.getUsername(), userObject.getEmail()];

        db.query(sql, [values[1], values[2]], function (error, result) {
            if (error) {
                throw error;
            }
            else {
                // If username & email matches
                if (result.length > 0) {
                    sql = "UPDATE users SET password = ? WHERE email = ?";

                    db.query(sql, [values[0], values[2]] , function (error, result) {
                        if (error) {
                            throw error;
                        }
                        else {
                            console.log("password reset successful");
                            var mailOptions = {
                                from: 'automated.singafood@gmail.com',
                                to: email,
                                subject: 'Reset account password',
                                text: 'This is an auto generated response to reset your password. Your new password is: ' + randomPassword
                            };

                            // Send email with random password on it
                            transporter.sendMail(mailOptions, function (error, result) {
                                if (error) {
                                    throw error;
                                }
                                else {
                                    console.log("email sent successful");
                                    respond.json(result);
                                }
                            });
                            respond.end();
                        }
                    });
                }
                else {
                    respond.end();
                }
            }
        });
    }

    loginUser(request, respond) {
        // Set JSON body to users.js constructor for get/set
        var userObject = new user(request.params.id, request.body.username, request.body.password);

        // SQL syntax for resetting user password
        var sql = "SELECT * FROM users WHERE username = ? AND password = ?";

        var getUserPassword = "SELECT password FROM users WHERE username = ?"

        // Parameters for SQL syntax
        var values = [userObject.getUsername(), userObject.getPassword()];

        db.query(getUserPassword, values[0], function (error, rows) {
            if (!request.session.userinfo) {
                if (rows.length > 0) { // If there are matching username with password
                    bcrypt.compare(values[1], rows[0].password, function (error, result) { // Compare hashed password
                        if (result) { // matched (note: do not put with previous if statement as it gives wrong send message)
                            db.query(sql, [values[0], rows[0].password], function (error, result) {
                                request.session.loggedin = true;
                                respond.json(result);
                            });
                        }
                        else { // Wrong password
                            respond.send('Wrong username/password');
                            respond.end();
                        }
                    });
                }
                else { // Wrong username
                    respond.send('Wrong username/password');
                    respond.end();
                }
            }
            else { // Already logged in
                respond.send('Already logged in');
                respond.end();
            }
        });
    }

    logoutUser(request, respond) {
        request.session.destroy(); // Destroy session
        respond.clearCookie('user_id'); // Clear user logged in cookie
        respond.send('Logged out');
        respond.end();
    }
}
module.exports = usersDB;