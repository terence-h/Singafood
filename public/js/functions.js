$(document).ready(function () {
    // Toggle data-toggle of navbar on index.html to make visual changes depending on scroll location
    if (window.location.pathname == "/") {
        // Add/remove class depending on the scroll location
        var toggleAffix = function (affixElement, scrollElement, wrapper) {

            var height = affixElement.outerHeight(),
                top = wrapper.offset().top;

            if (scrollElement.scrollTop() >= (top - height)) {
                wrapper.height(height);
                affixElement.addClass("affix");
            }
            else {
                affixElement.removeClass("affix");
            }
        };

        $('[data-toggle="affix"]').each(function () {
            var ele = $(this),
                wrapper = $('<div></div>');

            ele.before(wrapper);
            $(window).on('scroll resize', function () {
                toggleAffix(ele, $(this), wrapper);
            });
            // init
            toggleAffix(ele, $(window), wrapper);
        });
    }

    // If user just logged and got redirected, flash successful log in and remove the stored item to prevent duplicate message
    if (localStorage.getItem("loggedinRefresh")) {
        notify('success', 'Login Successful', 'Welcome back ' + localStorage.getItem("userFirstName") + ' ' + localStorage.getItem("userLastName"));
        localStorage.removeItem("loggedinRefresh");
    }
    else if (localStorage.getItem("registerRefresh")) {
        notify('success', 'Register Successful', 'Thank you for registering to Singafood! Please login with your username and password.');
        localStorage.removeItem("registerRefresh");
    }
    else if (localStorage.getItem("deleteAccountRefresh")) {
        notify('success', 'Account Deleted', 'Account deletion success');
        localStorage.removeItem("deleteAccountRefresh");
        deleteStoredInfo();
    }
    else if (localStorage.getItem("loggedoutRefresh")) {
        notify('success', 'Logged out', 'Hope to see you soon!');
        localStorage.removeItem("loggedoutRefresh");
    }
});

// Navigation bar enlarging & transparency on homepage
window.onscroll = function () {
    // Short delay is set due to inconsistent load times causing it to "think" the element doesn't exist
    this.setTimeout(function() {
        if (window.location.pathname == "/") {
            // If scrolled below 300px, shrink and add a transclucent bar to the navigation bar for better viewing
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                document.getElementById("navbar").style.padding = "10px 35px";
                document.getElementById("navbar").style.backgroundColor = "rgba(52, 58, 64, 1)";
                document.getElementById("logo").style.width = "50px"
                document.getElementById("logo").style.height = "50px"
            } else { // Hide the transclucent and enlarge the navigation bar
                document.getElementById("navbar").style.padding = "30px 50px 30px";
                document.getElementById("navbar").style.backgroundColor = "transparent";
                document.getElementById("logo").style.width = "100px"
                document.getElementById("logo").style.height = "100px"
            }
        }
    }, 30)
};

// Update login/register button to show user logged in and allow user to access their dashboard and logout.
function updateNavBar() {
    var table = document.getElementById("loginStatus");
    table.innerHTML = "";

    if (getCookie("user_id")) {
        var FirstName = localStorage.getItem("userFirstName");
        var LastName = localStorage.getItem("userLastName");

        var cell = '<div id="loginStatus">' +
                        '<div class="dropdown mr-1">' +
                            '<a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Welcome, ' + FirstName + ' ' + LastName + '<span class="caret"></span></a>' +
                            '<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuOffset">' +
                                '<a class="dropdown-item" href="dashboard.html">Profile</a>' +
                                '<a class="dropdown-item" href="#" onclick="deauthenticateUser()">Logout</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
    }
    else {
        var cell = '<div id="loginStatus">' +
                        '<a class="nav-link" href="#" id="login" data-toggle="modal" data-target="#loginForm">Login/Register</a>' +
                    '</div>';
    }
    table.insertAdjacentHTML('beforeend', cell);
}

// Send form input to login route
function authenticateUser() {
    // Create an object to store in JavaScript format
    var credentials = new Object();

    // Store the username and password based on the params in the route
    credentials.username = $('#loginFormInfo').find('input[name="username"]').val();
    credentials.password = $('#loginFormInfo').find('input[name="password"]').val();

    var request = new XMLHttpRequest();

    // Run our users route to authenticate user
    request.open("POST", login_url, true);

    // Set header to JSON format for our login route
    request.setRequestHeader("Content-Type", "application/json");

    // When the XHR state changes (0 - unsent | 1 - when open() is called | 2 - when send() is called | 3 - responseText downloading | 4 - done)
    request.onreadystatechange = function () {

        // When XHR state is done and HTTP status code is 200
        if (request.readyState == 4 && request.status == 200) {

            // Parse user info into JSON format if login is successful as cookie is issued to user.
            if (getCookie("user_id")) {
                userInfo_array = JSON.parse(request.responseText);

                // Convert gender from 1 -> Male and 2 -> Female
                switch (userInfo_array[0].gender) {
                    case "1":
                        userInfo_array[0].gender = "Male";
                        break;
                    case "2":
                        userInfo_array[0].gender = "Female";
                        break;
                }

                // Stored user information to display
                localStorage.setItem("userid", userInfo_array[0].id);
                localStorage.setItem("username", userInfo_array[0].username);
                localStorage.setItem("userPassword", userInfo_array[0].password);
                localStorage.setItem("userAddress", userInfo_array[0].address);
                localStorage.setItem("userFirstName", userInfo_array[0].firstName);
                localStorage.setItem("userLastName", userInfo_array[0].lastName);
                localStorage.setItem("userEmail", userInfo_array[0].email);
                localStorage.setItem("userGender", userInfo_array[0].gender);
                localStorage.setItem("userContact", userInfo_array[0].contact);
                localStorage.setItem("userProfilePicture", userInfo_array[0].profilePicture);
                localStorage.setItem("loggedinRefresh", "yes");
                location.reload();
            }
            else {
                notify('error', 'Login Unsuccessful', 'Wrong username/password');
            }
        }
    }

    // Send user login information in JSON formatt to our route for verification.
    request.send(JSON.stringify(credentials));
}

// Send form input to delete user account
function deauthenticateUser() {
    var request = new XMLHttpRequest();

    // Run our users route to log user out
    request.open("POST", logout_url, true);

    // When the XHR state changes (0 - unsent | 1 - when open() is called | 2 - when send() is called | 3 - responseText | 4 - done)
    request.onreadystatechange = function () {

        // When XHR state is done and HTTP status code is 200
        if (request.readyState == 4 && request.status == 200) {

            // Delete user info and redirect to homepage after logged out
            deleteStoredInfo();
            localStorage.setItem("loggedoutRefresh", "yes");
            window.location.replace('/');
        }
    }

    // Send user data in JSON formatt to our route
    request.send();
}

// Send form input to login route
function registerUser() {
    // Create an object to store in JavaScript format
    var userInfo = new Object();

    // Store the user inputs to send it to our route
    userInfo.username = $('#registerFormInfo').find('input[name="username"]').val();
    userInfo.password = $('#registerFormInfo').find('input[name="password"]').val();
    userInfo.address = $('#registerFormInfo').find('textarea[name="address"]').val();
    userInfo.firstName = $('#registerFormInfo').find('input[name="firstName"]').val();
    userInfo.lastName = $('#registerFormInfo').find('input[name="lastName"]').val();
    userInfo.email = $('#registerFormInfo').find('input[name="email"]').val();
    userInfo.gender = $('#registerFormInfo').find('input[name="gender"]:checked').val();
    userInfo.contact = $('#registerFormInfo').find('input[name="contact"]').val();

    // Convert linebreaks in the textarea into HTML syntax (<br>) so it will store it as well in SQL
    userInfo.address = userInfo.address.replace(/\n|\r\n|\r/g, "<br>");

    var request = new XMLHttpRequest();

    // Run our users route to register an account
    request.open("POST", register_url, true);

    // Set header to JSON format for our register route
    request.setRequestHeader("Content-Type", "application/json");

    // When the XHR state changes (0 - unsent | 1 - when open() is called | 2 - when send() is called | 3 - responseText downloading | 4 - done)
    request.onreadystatechange = function () {

        // When XHR state is done and HTTP status code is 200
        if (request.readyState == 4 && request.status == 200) {

            // If no respond.send was received from route as duplicate key was found
            if (!request.responseText) {
                notify('error', 'Register Unsuccessful', 'Username, Email or Contact has already been taken!');
            }
            else {
                // Set for successful register and refresh page.
                localStorage.setItem("registerRefresh", "yes");
                location.reload();
            }
        }
    }

    // Send user login information in JSON formatt to our route for processing.
    request.send(JSON.stringify(userInfo));
}

// Send form input to reset password route
function resetPassword() {

    // Create a temporary cookie to check whether password reset is successful on the NodeJS side.
    document.cookie = "resetPassword=yes";

    // Create an object to store in JavaScript format
    var userInfo = new Object();

    // Store the user inputs to send it to our route
    userInfo.username = $('#resetPasswordForm').find('input[name="username"]').val();
    userInfo.email = $('#resetPasswordForm').find('input[name="email"]').val();

    var request = new XMLHttpRequest();

    // Run our users route to register an account
    request.open("POST", user_url + "resetPassword", true);

    // Set header to JSON format for our register route
    request.setRequestHeader("Content-Type", "application/json");

    // When the XHR state changes (0 - unsent | 1 - when open() is called | 2 - when send() is called | 3 - responseText downloading | 4 - done)
    request.onreadystatechange = function () {

        // When XHR state is done and HTTP status code is 200
        if (request.readyState == 4 && request.status == 200) {
            // If cookie still exists (not deleted as password was not reset)
            if (getCookie("resetPassword")) {
                notify('error', 'Reset Password Unsuccessful', 'Incorrect username/email!');
            }
            else {
                notify('success', 'Reset Password Successful', 'Check your email for your new password');
                // localStorage.setItem("registerRefresh", "yes");
                // location.reload();
            }
            document.cookie = "resetPassword=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
    }

    // Send user login information in JSON formatt to our route for processing.
    request.send(JSON.stringify(userInfo));
}

function deleteStoredInfo() {
    localStorage.removeItem("userid");
    localStorage.removeItem("username");
    localStorage.removeItem("userPassword");
    localStorage.removeItem("userAddress");
    localStorage.removeItem("userFirstName");
    localStorage.removeItem("userLastName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userGender");
    localStorage.removeItem("userContact");
    localStorage.removeItem("userProfilePicture");
}

// If cookie exists function
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Keep review button without showing the text box and rating unless clicked on.
(function (e) {
    var t, o = {
        className: "autosizejs",
        append: "",
        callback: !1,
        resizeDelay: 10
    },
        i = '<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',
        n = ["fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordSpacing", "textIndent"],
        s = e(i).data("autosize", !0)[0];

    s.style.lineHeight = "99px", "99px" === e(s).css("lineHeight") && n.push("lineHeight"), s.style.lineHeight = "", e.fn.autosize = function (i) {
        return this.length ? (i = e.extend({}, o, i || {}), s.parentNode !== document.body && e(document.body).append(s), this.each(function () {
            function o() {
                var t, o;
                "getComputedStyle" in window ? (t = window.getComputedStyle(u, null), o = u.getBoundingClientRect().width, e.each(["paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth"], function (e, i) {
                    o -= parseInt(t[i], 10)
                }), s.style.width = o + "px") : s.style.width = Math.max(p.width(), 0) + "px"
            }

            function a() {
                var a = {};
                if (t = u, s.className = i.className, d = parseInt(p.css("maxHeight"), 10), e.each(n, function (e, t) {
                    a[t] = p.css(t)
                }), e(s).css(a), o(), window.chrome) {
                    var r = u.style.width;
                    u.style.width = "0px", u.offsetWidth, u.style.width = r
                }
            }

            function r() {
                var e, n;
                t !== u ? a() : o(), s.value = u.value + i.append, s.style.overflowY = u.style.overflowY, n = parseInt(u.style.height, 10), s.scrollTop = 0, s.scrollTop = 9e4, e = s.scrollTop, d && e > d ? (u.style.overflowY = "scroll", e = d) : (u.style.overflowY = "hidden", c > e && (e = c)), e += w, n !== e && (u.style.height = e + "px", f && i.callback.call(u, u))
            }

            function l() {
                clearTimeout(h), h = setTimeout(function () {
                    var e = p.width();
                    e !== g && (g = e, r())
                }, parseInt(i.resizeDelay, 10))
            }
            var d, c, h, u = this,
                p = e(u),
                w = 0,
                f = e.isFunction(i.callback),
                z = {
                    height: u.style.height,
                    overflow: u.style.overflow,
                    overflowY: u.style.overflowY,
                    wordWrap: u.style.wordWrap,
                    resize: u.style.resize
                },
                g = p.width();
            p.data("autosize") || (p.data("autosize", !0), ("border-box" === p.css("box-sizing") || "border-box" === p.css("-moz-box-sizing") || "border-box" === p.css("-webkit-box-sizing")) && (w = p.outerHeight() - p.height()), c = Math.max(parseInt(p.css("minHeight"), 10) - w || 0, p.height()), p.css({
                overflow: "hidden",
                overflowY: "hidden",
                wordWrap: "break-word",
                resize: "none" === p.css("resize") || "vertical" === p.css("resize") ? "none" : "horizontal"
            }), "onpropertychange" in u ? "oninput" in u ? p.on("input.autosize keyup.autosize", r) : p.on("propertychange.autosize", function () {
                "value" === event.propertyName && r()
            }) : p.on("input.autosize", r), i.resizeDelay !== !1 && e(window).on("resize.autosize", l), p.on("autosize.resize", r), p.on("autosize.resizeIncludeStyle", function () {
                t = null, r()
            }), p.on("autosize.destroy", function () {
                t = null, clearTimeout(h), e(window).off("resize", l), p.off("autosize").off(".autosize").css(z).removeData("autosize")
            }), r())
        })) : this
    }
})(window.jQuery || window.$);

// Keep review button without showing the text box and rating unless clicked on.
$(function () {
    $('#new-review').autosize({ append: "\n" });

    var reviewBox = $('#post-review-box');
    var newReview = $('#new-review');
    var openReviewBtn = $('#open-review-box');
    var closeReviewBtn = $('#close-review-box');

    openReviewBtn.click(function (e) {
        reviewBox.slideDown(400, function () {
            $('#new-review').trigger('autosize.resize');
            newReview.focus();
        });
        openReviewBtn.fadeOut(100);
        closeReviewBtn.show();
    });

    closeReviewBtn.click(function (e) {
        e.preventDefault();
        reviewBox.slideUp(300, function () {
            newReview.focus();
            openReviewBtn.fadeIn(200);
        });
        closeReviewBtn.hide();

    });
});