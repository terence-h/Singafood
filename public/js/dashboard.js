$(document).ready(function () {
    // Remove restId cookie as it is not used
    document.cookie = "restId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // If user updated their profile and got redirected, flash successful update and remove the stored item to prevent duplicate message
    if(localStorage.getItem("editProfileRefresh")) {
        notify('success', 'Success!', 'User profile updated successfully');
        showUserInfo();
        localStorage.removeItem("editProfileRefresh");
    }
    else {
        showUserInfo();
    }
});

// Used in dashboard.html. Show user information on the profile tab
function showUserInfo(){
    document.getElementById("userAddress").innerHTML = localStorage.getItem("userAddress");
    document.getElementById("userEmail").innerHTML = localStorage.getItem("userEmail");
    document.getElementById("userFirstName").innerHTML = localStorage.getItem("userFirstName");
    document.getElementById("userLastName").innerHTML = localStorage.getItem("userLastName");
    document.getElementById("userGender").innerHTML = localStorage.getItem("userGender");
    
    // Only calls when user edits their profile;
    switch (localStorage.getItem("userGender")) {
        case "1":
            document.getElementById("userGender").innerHTML = "Male";
            break;
        case "2":
            document.getElementById("userGender").innerHTML = "Female";
            break;
    }
    
    document.getElementById("userContact").innerHTML = localStorage.getItem("userContact");
    document.getElementById("userProfilePicture").src = localStorage.getItem("userProfilePicture");
}

// Profile Tab content when not in edit profile mode
function viewProfileDiv(){
    var table = document.getElementById("profileInfo");
    
    table.innerHTML = "";

    var cell =  '<div class="row">' +
                    '<div class="col-md-6">' +
                        '<label>Address</label>' +
                    '</div>' +
                    '<div class="col-md-6">' +
                        '<p id="userAddress"></p>' +
                    '</div>' +
                '</div>' +
                '<div class="row">' +
                    '<div class="col-md-6">' +
                        '<label>First Name</label>' +
                    '</div>' +
                    '<div class="col-md-6">' +
                        '<p id="userFirstName"></p>' +
                    '</div>' +
                '</div>' +
                '<div class="row">' +
                    '<div class="col-md-6">' +
                        '<label>Last Name</label>' +
                    '</div>' +
                    '<div class="col-md-6">' +
                        '<p id="userLastName"></p>' +
                    '</div>' +
                '</div>' +
                '<div class="row">' +
                    '<div class="col-md-6">' +
                        '<label>E-mail</label>' +
                    '</div>' +
                    '<div class="col-md-6">' +
                        '<p id="userEmail"></p>' +
                    '</div>' +
                '</div>' +
                '<div class="row">' +
                    '<div class="col-md-6">' +
                        '<label>Contact</label>' +
                    '</div>' +
                    '<div class="col-md-6">' +
                        '<p id="userContact"></p>' +
                    '</div>' +
                '</div>' +
                '<div class="row">' +
                    '<div class="col-md-6">' +
                        '<label>Gender</label>' +
                    '</div>' +
                    '<div class="col-md-6">' +
                        '<p id="userGender"></p>' +
                    '</div>' +
                '</div>'

             table.insertAdjacentHTML('beforeend', cell);
             showUserInfo(); // Update html content again as it is only set when the page is ready.
}

// Change view profile to update profile.
function updateProfileDiv(){
    var table = document.getElementById("profileInfo");
    
    table.innerHTML = "";

    // var thumbnail = restaurants_array[count].thumb;

    var cell = '<form onsubmit="editUser(); return false;" id="editUserForm">' +
                    '<div class="form-group">' +
                        '<div class="row">' +
                            '<div class="col-md-6">' +
                                '<label>Password</label>' +
                            '</div>' +
                            '<div class="col-md-6">' +
                                '<input type="password" class="form-control" name="editPassword" placeholder="Password" minlength="8" maxlength="60" autocomplete="off"><br>' +
                            '</div>' +
                        '</div>' +
                        '<div class="row">' +
                            '<div class="col-md-6">' +
                                '<label>Address</label>' +
                            '</div>' +
                            '<div class="col-md-6">' +
                                '<textarea class="form-control" rows="3" name="editAddress" placeholder="Address" autocomplete="off"></textarea><br>' +
                            '</div>' +
                        '</div>' +
                        '<div class="row">' +
                            '<div class="col-md-6">' +
                                '<label>First Name</label>' +
                            '</div>' +
                            '<div class="col-md-6">' +
                                '<input type="text" class="form-control" name="editFirstName" placeholder="First Name" autocomplete="off"><br>' +
                            '</div>' +
                        '</div>' +
                        '<div class="row">' +
                            '<div class="col-md-6">' +
                                '<label>Last Name</label>' +
                            '</div>' +
                            '<div class="col-md-6">' +
                                '<input type="text" class="form-control" name="editLastName" placeholder="Last Name" autocomplete="off"><br>' +
                            '</div>' +
                        '</div>' +
                        '<div class="row">' +
                            '<div class="col-md-6">' +
                                '<label>E-mail</label>' +
                            '</div>' +
                            '<div class="col-md-6">' +
                                '<input type="email" class="form-control" name="editEmail" placeholder="Email" autocomplete="off"><br>' +
                            '</div>' +
                        '</div>' +
                        '<div class="row">' +
                            '<div class="col-md-6">' +
                                '<label>Contact</label>' +
                            '</div>' +
                            '<div class="col-md-6">' +
                                '<input type="number" class="form-control" name="editContact" placeholder="Contact" min="80000000" max="99999999" autocomplete="off"><br>' +
                            '</div>' +
                        '</div>' +
                        '<div class="row">' +
                            '<div class="col-md-6">' +
                                '<label>Gender </label>' +
                            '</div>' +
                            '<div class="col-md-6">' +
                                '<div class="custom-control custom-radio custom-control-inline">' +
                                '<label class="form-check">' +
                                    '<input class="custom-control-input" type="radio" name="editGender" value="1">' +
                                    '<span class="custom-control-label">Male</span>' +
                                '</label>' +
                            '</div>' +
                            '<div class="custom-control custom-radio custom-control-inline">' +
                                '<label class="form-check">' +
                                    '<input class="custom-control-input" type="radio" name="editGender" value="2">' +
                                    '<span class="custom-control-label">Female</span>' +
                                '</label>' +
                            '</div>' +
                        '</div>' +
                    '</div><br>' +
                    '<div style="max-width: 150px; margin:auto;">' +
                        '<button type="submit" class="btn btn-success btn-block btn-round">Update</button>' +
                        '<button type="button" class="btn btn-danger btn-block btn-round" onclick="viewProfileDiv()">Cancel</button>' +
                    '</div>' +
                '</form>'
                
             table.insertAdjacentHTML('beforeend', cell);
}

// var response = confirm("Are you sure you want to update this comment?");
//     if (response == true) {
//         var edit_comment_url = comment_url + "/" + comment_array[currentIndex]._id;
//         var updateComment = new XMLHttpRequest(); // new HttpRequest instance to send request to server
//         updateComment.open("PUT", edit_comment_url, true); //The HTTP method called 'PUT' is used here as we are updating data
//         updateComment.setRequestHeader("Content-Type", "application/json");
//         comment_array[currentIndex].username = document.getElementById("editnickname").value;
//         comment_array[currentIndex].review = document.getElementById("edituserComments").value;
//         comment_array[currentIndex].rating = rating;
//         updateComment.onload = function () {
//             fetchComments();
//         };
//         updateComment.send(JSON.stringify(comment_array[currentIndex]));
//     }

// Edit user information
function editUser() {
    var request = new XMLHttpRequest(),
        userInfo = new Object();

    var passwordVal = $('#editUserForm').find('input[name="editPassword"]').val(),
        addressVal = $('#editUserForm').find('textarea[name="editAddress"]').val(),
        firstNameVal = $('#editUserForm').find('input[name="editFirstName"]').val(),
        lastNameVal = $('#editUserForm').find('input[name="editLastName"]').val(),
        emailVal = $('#editUserForm').find('input[name="editEmail"]').val(),
        contactVal = $('#editUserForm').find('input[name="editContact"]').val(),
        genderVal = $('#editUserForm').find('input[name="editGender"]:checked').val();

    if(passwordVal) { 
        userInfo.password = passwordVal
        localStorage.setItem("userPassword", passwordVal);
    }
    if(addressVal) {
        // Convert linebreaks in the textarea into HTML syntax (<br>) so it will display it as well
        addressVal = addressVal.replace(/\n|\r\n|\r/g, "<br>");
        userInfo.address = addressVal
        localStorage.setItem("userAddress", addressVal);
    }
    if(firstNameVal) {
        userInfo.firstName = firstNameVal
        localStorage.setItem("userFirstName", firstNameVal);
    }
    if(lastNameVal) {
        userInfo.lastName = lastNameVal
        localStorage.setItem("userLastName", lastNameVal);
    }
    if(emailVal) {
        userInfo.email = emailVal
        localStorage.setItem("userEmail", emailVal);
    }
    if(contactVal) {
        userInfo.contact = contactVal
        localStorage.setItem("userContact", contactVal);
    }
    if(genderVal) {
        var genderSyntax;

        switch (genderVal) {
            case "1":
                genderSyntax = "Male";
                break;
            case "2":
                genderSyntax = "Female";
                break;
        }

        userInfo.gender = genderVal
        localStorage.setItem("userGender", genderSyntax);
    }

    // Run our users route to log user out
    request.open("PUT", user_url + localStorage.getItem("userid"), true);
    request.setRequestHeader("Content-Type", "application/json");

    // When the XHR state changes (0 - unsent | 1 - when open() is called | 2 - when send() is called | 3 - responseText | 4 - done)
    request.onreadystatechange = function() {
        // When XHR state is done and HTTP status code is 200
        if(request.readyState == 4 && request.status == 200) {
            localStorage.setItem("editProfileRefresh", "yes");
            location.reload();
        }
    }

    // Send user data in JSON formatt to our route
    request.send(JSON.stringify(userInfo));
}

// Edit profile picture
function editProfilePicture() {
    var request = new XMLHttpRequest(),
        userInfo = new FormData();

    // Get filename, extension and filter out the browser built in protection ("C:\fakepath")
    var pictureVal = document.getElementById("userProfilePicture-id").value
    pictureVal = pictureVal.match(/[^\\/]*$/)[0];

    // Store image location for display purpose
    localStorage.setItem("userProfilePicture", "images/users/" + pictureVal);
    userInfo.append("profilePicture", document.getElementById("userProfilePicture-id").files[0]);

    // Run our profile picture URL with user ID
    request.open("POST", user_url + "profilepicture/" + localStorage.getItem("userid"), true);

    // When the XHR state changes (0 - unsent | 1 - when open() is called | 2 - when send() is called | 3 - responseText | 4 - done)
    request.onreadystatechange = function() {
        // When XHR state is done and HTTP status code is 200
        if(request.readyState == 4 && request.status == 200) {
            localStorage.setItem("editProfileRefresh", "yes");
            location.reload();
        }
    }
    
    request.send(userInfo);
}

// Delete user
function deleteUser(){
    var request = new XMLHttpRequest(),
        userInfo = new Object();

    // userInfo.password = document.getElementById("deletePassword").value
    userInfo.password = $('#deleteFormInfo').find('input[name="password"]').val()

    if(userInfo.password == localStorage.getItem("userPassword")) {
        // Run our users route to log user out
        request.open("DELETE", user_url + localStorage.getItem("userid"), true);

        // When the XHR state changes (0 - unsent | 1 - when open() is called | 2 - when send() is called | 3 - responseText | 4 - done)
        request.onreadystatechange = function() {
            // When XHR state is done and HTTP status code is 200
            if(request.readyState == 4 && request.status == 200) {
                // Redirect to homepage after logged out
                if(!getCookie("user_id")) {
                    localStorage.setItem("deleteAccountRefresh", "yes");
                    window.location.replace('/');
                }
                else {
                    notify('error', 'Error', 'Incorrect password!');
                }
            }
        }
        // Send user data in JSON formatt to our route
        request.send(JSON.stringify(userInfo));
    }
    else {
        notify('error', 'Error', 'Incorrect password!');
    }
}