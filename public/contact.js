var firebaseConfig = {
    apiKey: "AIzaSyAN4rqB34X68mHoNhvHLUBrtXuaoY-qbb8",
    authDomain: "new-gen-iedc.firebaseapp.com",
    databaseURL: "https://new-gen-iedc.firebaseio.com",
    projectId: "new-gen-iedc",
    storageBucket: "new-gen-iedc.appspot.com",
    messagingSenderId: "588462885473",
    appId: "1:588462885473:web:6b6311c04038710f8ab820",
    measurementId: "G-J8QRQSWZ9W"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var check, signInCheck, signUpCheck, mentorFormCheck, checkTopicEmpty
count = 0,
    signUpCount = 0,
    signInCount = 0,
    errorCnt = 0;
var color1, color2;

//---------------------------------------------------------------------------------

document.getElementById("signOut").style.display = "none"

firebase.auth().onAuthStateChanged(function(user) {
    if (user === null) {
        document.getElementById("signOut").style.display = "none"
    } else {
        document.getElementById("signOut").style.display = "block"
    }
})

//-----------------------------------------------------------------------------------

document.getElementById('query').addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("post").click();
    }
})

document.getElementById('email').addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("signIn").click();
    }
})

document.getElementById('pass').addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("signIn").click();
    }
})

//----------------------------------------------------------------------------------

document.getElementById('username').addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("signUp").click();
    }
})

document.getElementById('user-email').addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("signUp").click();
    }
})

document.getElementById('phone').addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("signUp").click();
    }
})

document.getElementById('user-pass').addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("signUp").click();
    }
})

document.getElementById('repass').addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("signUp").click();
    }
})

//--------------------------------------------------------------------------------------

document.getElementById("post").addEventListener("click", function() {
    check = setInterval(on, 500)
})

document.getElementById("signIn").addEventListener("click", function() {
    if (document.getElementById("signIn").style.display !== "none") {
        signInCheck = setInterval(signIn, 500)
    }
})

document.getElementById("signUp").addEventListener("click", function() {
    if (document.getElementById("signUp").style.display !== "none") {
        signUpCheck = setInterval(signUp, 500)
    }
})

document.getElementById("formBtn").addEventListener("click", function() {
    if (document.getElementById("formBtn").style.display !== "none") {
        mentorFormCheck = setInterval(submitMentorForm, 500)
    }
})

//--------------------------------------------------------------------------------

function on() {
    var query = document.getElementById("query").value
    var empty_query = document.getElementById("empty_query")
    if (query === "") {
        empty_queryText = "Remember, you need to have a query to post it ;)"
        empty_query.innerHTML = empty_queryText;
        empty_query.style.color = "red"
        count = count + 1
    } else {
        empty_queryText = ""
        empty_query.innerHTML = empty_queryText;
        clearInterval(check)

        if (count == 0) {
            if (firebase.auth().currentUser === null) {
                displaySignIn();
            } else {
                var uid = firebase.auth().currentUser.uid
                var postId = firebase.database().ref('users/' + uid).child('queries').push().key
                firebase.database().ref('users/' + uid).child('queries').child(postId).child('Q').set(query)
                alert("Your request has been filed")
                document.getElementById("query").value = ""
            }

        } else {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user === null) {
                    displaySignIn();
                } else {
                    document.getElementById("post").addEventListener('click', function() {
                        var query = document.getElementById("query").value
                        var uid = firebase.auth().currentUser.uid
                        var postId = firebase.database().ref('users/' + uid).child('queries').push().key
                        firebase.database().ref('users/' + uid).child('queries').child(postId).child('Q').set(query)
                        alert("Your request has been filed")
                        document.getElementById("query").value = ""
                    })
                }
            })
        }
    }
}

//---------------------------------------------------------------------------------

function displaySignIn() {
    document.getElementById('overlay-signIn').style.display = "block";
    document.getElementById('overlay-signUp').style.display = "none";
    document.getElementById('email').focus();
}

function signIn() {
    var email = document.getElementById('email').value
    var pass = document.getElementById('pass').value
    var invalidEmail = document.getElementById('invalid-email')
    var invalidPass = document.getElementById('invalid-pass')
    if (email === "") {
        invalidEmailText = "please enter your email address"
        invalidEmail.innerHTML = invalidEmailText;
        invalidEmail.style.color = "red"
        document.getElementById("signIn").style.display = "none"
        signInCount = signInCount + 1
    } else {
        invalidEmailText = ""
        invalidEmail.innerHTML = invalidEmailText;
    }
    if (pass === "") {
        invalidPassText = "please enter your password"
        invalidPass.innerHTML = invalidPassText;
        invalidPass.style.color = "red"
        document.getElementById("signIn").style.display = "none"
        signInCount = signInCount + 1
    } else {
        invalidPassText = ""
        invalidPass.innerHTML = invalidPassText;
    }
    if (email !== "" && pass !== "") {
        clearInterval(signInCheck)
        document.getElementById("signIn").style.display = "block"

        if (signInCount == 0) {
            firebase.auth().signInWithEmailAndPassword(email, pass).then(function() {
                alert("Your have been logged in. Now you can post any queries")
                off();
                document.getElementById("signOut").style.display = "block"
                document.getElementById('email').value = ""
                document.getElementById('pass').value = ""
                document.getElementById('email').focus()
            }).catch(function(error) {
                alert(error);
                document.getElementById('email').value = ""
                document.getElementById('pass').value = ""
                document.getElementById('email').focus()
            });
        } else {
            document.getElementById("signIn").addEventListener("click", function() {
                var email = document.getElementById('email').value
                var pass = document.getElementById('pass').value
                firebase.auth().signInWithEmailAndPassword(email, pass).then(function() {
                    alert("Your have been logged in. Now you can post any queries")
                    off();
                    document.getElementById("signOut").style.display = "block"
                    document.getElementById('email').value = ""
                    document.getElementById('pass').value = ""
                    document.getElementById('email').focus()
                }).catch(function(error) {
                    alert(error);
                    document.getElementById('email').value = ""
                    document.getElementById('pass').value = ""
                    document.getElementById('email').focus()
                });
            })
        }
    }
}

function off() {
    document.getElementById('overlay-signIn').style.display = "none";
    document.getElementById('email').value = ""
    document.getElementById('pass').value = ""
}

//----------------------------------------------------------------------------

function displaySignUp() {
    document.getElementById('overlay-signUp').style.display = "block";
    document.getElementById('overlay-signIn').style.display = "none";
    document.getElementById('user-email').focus();
}

function signUp() {
    var username = document.getElementById('username').value
    var user_email = document.getElementById('user-email').value
    var email_adrs = document.getElementById('user-email')
    var phone = document.getElementById('phone').value
    var contact = document.getElementById('phone')
    var user_pass = document.getElementById('user-pass').value
    var repass = document.getElementById('repass').value
    var invalid_user = document.getElementById('invalid-username')
    var invalid_user_email = document.getElementById('invalid-user-email')
    var invalid_phone = document.getElementById('invalid-phone')
    var invalid_user_pass = document.getElementById('invalid-user-pass')
    var invalid_repass = document.getElementById('invalid-repass')

    if (username === "") {
        invalidUserText = "please enter your username"
        invalid_user.innerHTML = invalidUserText;
        invalid_user.style.color = "red"
        document.getElementById("signUp").style.display = "none"
        signUpCount = signUpCount + 1
    } else {
        invalidUserText = ""
        invalid_user.innerHTML = invalidUserText;
    }
    if (user_email === "") {
        invalidUserEmailText = "please enter your email address"
        invalid_user_email.innerHTML = invalidUserEmailText;
        invalid_user_email.style.color = "red"
        document.getElementById("signUp").style.display = "none"
        signUpCount = signUpCount + 1
    } else if (!email_adrs.checkValidity()) {
        invalidUserEmailText = "please fill in correct email address"
        invalid_user_email.innerHTML = invalidUserEmailText;
        invalid_user_email.style.color = "red"
        document.getElementById("signUp").style.display = "none"
        signUpCount = signUpCount + 1
    } else {
        invalidUserEmailText = ""
        invalid_user_email.innerHTML = invalidUserEmailText;
    }
    if (phone === "") {
        invalidPhoneText = "please enter your contact number"
        invalid_phone.innerHTML = invalidPhoneText;
        invalid_phone.style.color = "red"
        document.getElementById("signUp").style.display = "none"
        signUpCount = signUpCount + 1
    } else if (!contact.checkValidity() || phone.length != 10) {
        invalidPhoneText = "please enter a valid contact number"
        invalid_phone.innerHTML = invalidPhoneText;
        invalid_phone.style.color = "red"
        document.getElementById("signUp").style.display = "none"
        signUpCount = signUpCount + 1
    } else {
        invalidPhoneText = ""
        invalid_phone.innerHTML = invalidPhoneText;
    }
    if (user_pass === "") {
        invalidUserPassText = "please fill in a password"
        invalid_user_pass.innerHTML = invalidUserPassText;
        invalid_user_pass.style.color = "red"
        document.getElementById("signUp").style.display = "none"
        signUpCount = signUpCount + 1
    } else {
        invalidUserPassText = ""
        invalid_user_pass.innerHTML = invalidUserPassText;
    }
    if (repass === "") {
        invalidRepassText = "please repeat the password"
        invalid_repass.innerHTML = invalidRepassText;
        invalid_repass.style.color = "red"
        document.getElementById("signUp").style.display = "none"
        signUpCount = signUpCount + 1
    } else if (repass !== user_pass) {
        invalidRepassText = "please check the password"
        invalid_repass.innerHTML = invalidRepassText;
        invalid_repass.style.color = "red"
        document.getElementById("signUp").style.display = "none"
        signUpCount = signUpCount + 1
    } else {
        invalidRepassText = ""
        invalid_repass.innerHTML = invalidRepassText;
    }
    if (username !== "" &&
        user_email !== "" &&
        email_adrs.checkValidity() &&
        phone !== "" &&
        contact.checkValidity() &&
        phone.length == 10 &&
        user_pass !== "" &&
        repass === user_pass) {

        clearInterval(signUpCheck)
        document.getElementById("signUp").style.display = "block"
        if (signUpCount == 0) {
            firebase.auth().createUserWithEmailAndPassword(user_email, user_pass).then(function() {
                var userId = firebase.auth().currentUser.uid;
                firebase.database().ref('users/' + userId).set({
                    'username': username,
                    'email': user_email,
                    'contact': phone
                });
                alert("You have been successfully signed up... you can now post your query")
                document.getElementById("signOut").style.display = "block"
                offSignUp();
            }).catch(function(error) {
                alert(error)
            })
        } else {
            document.getElementById("signUp").addEventListener("click", function() {
                firebase.auth().createUserWithEmailAndPassword(user_email, user_pass).then(function() {
                    var userId = firebase.auth().currentUser.uid;
                    firebase.database().ref('users/' + userId).set({
                        'username': username,
                        'email': user_email,
                        'contact': phone
                    });
                    alert("You have been successfully signed up... you can now post your query")
                    document.getElementById("signOut").style.display = "block"
                    offSignUp();
                }).catch(function(error) {
                    alert(error)
                })
            })
        }

    }
}

function offSignUp() {
    document.getElementById('overlay-signUp').style.display = "none";
    document.getElementById('username').value = ""
    document.getElementById('user-email').value = ""
    document.getElementById('phone').value = ""
    document.getElementById('user-pass').value = ""
    document.getElementById('repass').value = ""
}

//---------------------------------------------------------------------------------

function signOut() {
    firebase.auth().signOut().then(function() {
        alert("You have been successfully signed out")
        document.getElementById("signOut").style.display = "none"
        location.reload()
    }).catch(function(error) {
        alert("Oops!! Sorry something went wrong")
    });
}
//----------------------------------------------------------------------------------

var initial = setInterval(changeColor1, 500)

function changeColor1() {
    clearInterval(initial)
    document.getElementById("mentor").style.backgroundColor = 'rgb(229, 198, 250)'
    color1 = setInterval(changeColor2, 500)
    clearInterval(color2)
}

function changeColor2() {
    document.getElementById("mentor").style.backgroundColor = 'rgb(241, 199, 214)'
    color2 = setInterval(changeColor1, 200)
    clearInterval(color1)
}

function openMentorForm() {
    if (firebase.auth().currentUser === null) {
        displaySignIn();
    } else {
        document.getElementById("overlay-mentor").style.display = "block"
    }
}

function submitMentorForm() {
    var topic = document.getElementById("topic").value;
    var error = document.getElementById("error")
    if (topic.trim() === "") {
        errorText = "please enter your username"
        error.innerHTML = errorText;
        error.style.color = "red"
        document.getElementById("formBtn").style.display = "none"
        errorCnt = errorCnt + 1
    } else {
        errorText = ""
        error.innerHTML = errorText;

        clearInterval(mentorFormCheck)
        document.getElementById("formBtn").style.display = "block"

        if (errorCnt == 0) {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user === null) {
                    displaySignIn();
                } else {
                    var topic = document.getElementById("topic").value
                    var uid = firebase.auth().currentUser.uid
                    var postId = firebase.database().ref('users/' + uid).child('mentor').child('requests').push().key

                    firebase.database().ref('users/' + uid).child('mentor').child('requests').child(postId).child('Q').set(topic).then(function() {
                        alert("Your request has been filed")
                        closeMentorForm();
                    })
                }
            })
        } else {
            document.getElementById("formBtn").addEventListener("click", function() {
                var topic = document.getElementById("topic").value
                var uid = firebase.auth().currentUser.uid
                var postId = firebase.database().ref('users/' + uid).child('mentor').child('requests').push().key

                firebase.database().ref('users/' + uid).child('mentor').child('requests').child(postId).child('Q').set(topic).then(function() {
                    alert("Your request has been filed")
                    closeMentorForm();
                })
            })
        }
    }
}

function closeMentorForm() {
    document.getElementById("overlay-mentor").style.display = "none"

    document.getElementById("topic").value = ""
}