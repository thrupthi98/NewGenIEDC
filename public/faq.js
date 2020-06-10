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

firebase.auth().onAuthStateChanged(function(user) {
    if (user === null) {
        document.getElementById("signOut").style.display = "none"
        displaySignIn();
    } else {
        view(user.email)
        document.getElementById("signOut").style.display = "block"
    }
})

paceOptions = {
    // Disable the 'elements' source
    elements: false,

    // Only show the progress on regular and ajax-y page navigation,
    // not every request
    restartOnRequestAfter: false
}

//------------------------------------------------------------------------------

let preview = document.getElementById("preview");
let display = document.getElementById("display");
let startButton = document.getElementById("startButton");
let stopButton = document.getElementById("stopButton");
let data;
let recorder;
var query = [];
var request = [];
var posts;

var check, signInCheck, signUpCheck,
    count = 0,
    signUpCount = 0,
    signInCount = 0;

//-----------------------------------------------------------------------------

function displaySignIn() {
    document.getElementById('overlay-signIn').style.display = "block";
    document.getElementById('overlay-signUp').style.display = "none";
    document.getElementById('email').focus();
}

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
                view(document.getElementById('email').value)
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
                    alert("You have been logged in. Now you can post any queries")
                    view(document.getElementById('email').value)
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
                view(user_email)
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
                    view(user_email)
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

function view(crntUser) {
    if (crntUser === "professor.bnmit@gmail.com") {
        document.getElementById("video-recorder").style.display = "block"

        firebase.database().ref('users/').off('value')

        posts = firebase.database().ref('users/')
        posts.on('value', function(snapshot) {
            var details = Object.values(snapshot.val())
            for (var i = 0; i < Object.keys(snapshot.val()).length; i++) {
                if (details[i]['queries'] !== undefined) {
                    var queries = Object.values(details[i]['queries'])
                    for (var j = 0; j < Object.keys(details[i]['queries']).length; j++) {
                        if (queries[j]['postVideo'] == undefined && queries[j]['postText'] == undefined && queries[j]['mailVideo'] == undefined && queries[j]['mailText'] == undefined) {
                            var div = document.createElement('div')
                            div.setAttribute('class', 'card col-lg-12')
                            var card_title = document.createElement('h4')
                            card_title.setAttribute('class', 'card-title')
                            card_title.innerHTML = queries[j]['Q']
                            div.append(card_title)
                            div.innerHTML += details[i]['username']
                            div.innerHTML += '<br>'
                            div.innerHTML += details[i]['email']
                            div.innerHTML += '<br>'
                            query.push(queries[j]['Q'])
                            div.innerHTML += '<div class="icon-bar" onclick="assignId(this)"><i class="fa fa-envelope" onclick="showText()"></i>' +
                                '<i class="fa fa-camera" onclick="showRecorder()"></i>' +
                                '<i class="fa fa-times"></i></div>'
                            document.getElementById('posts').append(div)
                        }
                    }
                }

                if (details[i]['mentor'] !== undefined) {
                    if (details[i]['mentor'].requests !== undefined) {
                        var requests = Object.values(details[i]['mentor'].requests)
                        for (var j = 0; j < Object.keys(details[i]['mentor'].requests).length; j++) {
                            if (requests[j]['postVideo'] == undefined && requests[j]['postText'] == undefined && requests[j]['mailVideo'] == undefined && requests[j]['mailText'] == undefined) {
                                var div = document.createElement('div')
                                div.setAttribute('class', 'card col-lg-12')
                                var card_title = document.createElement('h4')
                                card_title.setAttribute('class', 'card-title')
                                card_title.innerHTML = requests[j]['Q']
                                div.append(card_title)
                                div.innerHTML += details[i]['username']
                                div.innerHTML += '<br>'
                                div.innerHTML += details[i]['email']
                                div.innerHTML += '<br>'
                                request.push(requests[j]['Q'])
                                div.innerHTML += '<div class="mentor-bar" onclick="mentorId(this)"><i class="fa fa-envelope" onclick="showMentorText()"></i>' +
                                    '<i class="fa fa-times"></i></div>'
                                document.getElementById('mentors').append(div)
                            }
                        }
                    }

                }
            }
        })
    } else {
        document.getElementById("public").style.display = "block"
        firebase.database().ref('users/').off('value')


        posts = firebase.database().ref('users/')
        posts.on('value', function(snapshot) {
            var details = Object.values(snapshot.val())
            for (var i = 0; i < Object.keys(snapshot.val()).length; i++) {
                if (details[i]['queries'] !== undefined) {
                    var queries = Object.values(details[i]['queries'])
                    for (var j = 0; j < Object.keys(details[i]['queries']).length; j++) {
                        if (queries[j]['postText'] !== undefined) {
                            var div = document.createElement('div')
                            div.setAttribute('class', 'card col-lg-6')
                            div.innerHTML = '<h4 class="q">' + queries[j]['Q'] + '</h4>'
                            div.innerHTML += '<br>'
                            div.innerHTML += '<p class="ans">' + queries[j]["postText"] + '</card>'
                            document.getElementById('Publicposts').append(div)
                        }
                        if (queries[j]['postVideo'] !== undefined) {
                            var user = Object.keys(snapshot.val())[i];
                            var post = Object.keys(details[i]['queries']).find(key => details[i]['queries'][key] === queries[j])
                            var div = document.createElement('div')
                            div.setAttribute('class', 'card col-lg-6')
                            div.innerHTML = '<h4 class="q">' + queries[j]['Q'] + '</h4>'
                            div.innerHTML += '<br>'
                            div.innerHTML += '<video id="player" controls class="col-sm-6"></video>' + '<br>'
                            document.getElementById('Publicposts').append(div)

                            setTimeout(setPlayer(user, post), 5000)
                        }
                    }
                }
            }
        })

    }
}

//-----------------------------------------------------------------------------


function assignId(clicked) {
    icons = document.getElementsByClassName("icon-bar")
    for (var icon = 0; icon < icons.length; icon++) {
        icons[icon].setAttribute('id', icon)
        if (clicked == icons[icon]) {
            localStorage.setItem('clickedQuery', query[icon])
        }
    }
}

function mentorId(clicked) {
    buttons = document.getElementsByClassName("mentor-bar")
    for (var btn = 0; btn < buttons.length; btn++) {
        buttons[btn].setAttribute('id', btn)
        if (clicked == buttons[btn]) {
            localStorage.setItem('clickedRequest', request[btn])
        }
    }
}

function showRecorder() {
    document.getElementById("answerVideo").style.display = "block"
}

function showText() {
    document.getElementById("mentorText").style.display = "none"
    document.getElementById("answerText").style.display = "block"
}

function showMentorText() {
    document.getElementById("answerText").style.display = "none"
    document.getElementById("mentorText").style.display = "block"
}

//-----------------------------------------------------------------------------

function handleDataAvailable(event) {
    if (event.data && event.data.size > 0)
        data.push(event.data)
}

function startdisplay(stream) {
    recorder = new MediaRecorder(stream);
    data = [];

    recorder.ondataavailable = handleDataAvailable;
    recorder.start(1000);
}

startButton.addEventListener("click", function() {
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).then(stream => {
        preview.srcObject = stream;
    }).then(() => startdisplay(preview.captureStream()))
});


stopButton.addEventListener("click", function() {
    stop(preview.srcObject);
    const videoBlob = new Blob(data, { type: 'video/webm' })
    display.src = null;
    display.srcObject = null;
    display.src = window.URL.createObjectURL(videoBlob)
    display.play();
});

function stop(stream) {
    stream.getTracks().forEach(track => track.stop());
}

function closeRecorder() {
    document.getElementById("answerVideo").style.display = "none"
}

function closeText() {
    document.getElementById("answerText").style.display = "none"
}

function closeMentorText() {
    document.getElementById("mentorText").style.display = "none"
}


//-----------------------------------------------------------------------------

function postVideo() {
    if (data !== undefined) {
        firebase.database().ref('users/').off('value')
        var postRecData = firebase.database().ref('users/')

        postRecData.on('value', function(snapshot) {
            var details = Object.values(snapshot.val())
            for (var i = 0; i < Object.keys(snapshot.val()).length; i++) {
                if (details[i]['queries'] !== undefined) {
                    var queries = Object.values(details[i]['queries'])
                    for (var j = 0; j < Object.keys(details[i]['queries']).length; j++) {
                        if (queries[j]['Q'] === localStorage.getItem('clickedQuery')) {

                            firebase.database().ref('users/').off('value')

                            alert("are you sure you wanna send your response")

                            const videoBlob = new Blob(data, { type: 'video/webm' })
                            var folder = Object.keys(snapshot.val())[i];
                            var filename = Object.keys(details[i]['queries']).find(key => details[i]['queries'][key] === queries[j])
                            var storageRef = firebase.storage().ref()
                            var ref = storageRef.child(folder + '/' + filename + '/postVideo.webm')
                            ref.put(videoBlob).then(function(snapshot) {
                                firebase.database().ref('users/').child(folder).
                                child('queries').
                                child(filename).
                                child('postVideo').set('True').
                                then(function() {
                                    alert("Your response now can be viewed on FAQs")
                                    location.reload()
                                    document.getElementById('responseText').value = ""
                                })
                            })
                        }
                    }
                }
            }
        })
    } else {
        alert("Sorry! there is no video available")
    }
}

function mailVideo() {
    if (data !== undefined) {
        alert("are you sure you wanna send your response")
        const videoBlob = new Blob(data, { type: 'video/webm' })

        firebase.database().ref('users/').off('value')

        var mailRecData = firebase.database().ref('users/')
        mailRecData.on('value', function(snapshot) {
            var details = Object.values(snapshot.val())
            for (var i = 0; i < Object.keys(snapshot.val()).length; i++) {
                if (details[i]['queries'] !== undefined) {
                    var queries = Object.values(details[i]['queries'])
                    for (var j = 0; j < Object.keys(details[i]['queries']).length; j++) {
                        if (queries[j]['Q'] === localStorage.getItem('clickedQuery')) {
                            var question = queries[j]['Q']
                            var email = details[i]['email']
                            const videoBlob = new Blob(data, { type: 'video/webm' })
                            var folder = Object.keys(snapshot.val())[i];
                            var filename = Object.keys(details[i]['queries']).find(key => details[i]['queries'][key] === queries[j])
                            var storageRef = firebase.storage().ref()
                            var ref = storageRef.child(folder + '/' + filename + '/mailVideo.webm')
                            ref.put(videoBlob).then(function(snapshot) {
                                storageRef.child(Object.values(snapshot)[3].fullPath).getDownloadURL().then(function(url) {
                                    Email.send({
                                        SecureToken: "ebe8041a-26eb-4776-803e-cab1d7dcde81",
                                        To: email,
                                        From: "trupthin.murthy@gmail.com",
                                        Subject: "Response from New-Gen IEDC",
                                        Body: 'Please click on the url ' + url + ' in order to download the video response for your query: ' + question +
                                            'Regards: ' +
                                            'NewGen IEDC, BNMIT'

                                    }).then(
                                        firebase.database().ref('users/').child(folder).child('queries').child(filename).child('mailVideo').set('True').then(function() {
                                            alert("Your response has been succesfully mailed")
                                            location.reload()
                                        })
                                    );
                                })
                            })
                            break;
                        }
                    }
                }
            }
        })
    } else {
        alert("Sorry! there is no video available")
    }
}

function postText() {
    var responseText = document.getElementById('responseText').value
    var traceCnt = 0;

    firebase.database().ref('users/').off('value')

    var postData = firebase.database().ref('users/')
    postData.on('value', function(snapshot) {
        var details = Object.values(snapshot.val())
        for (var i = 0; i < Object.keys(snapshot.val()).length; i++) {
            if (details[i]['queries'] !== undefined) {
                var queries = Object.values(details[i]['queries'])
                for (var j = 0; j < Object.keys(details[i]['queries']).length; j++) {
                    if (queries[j]['Q'] === localStorage.getItem('clickedQuery')) {
                        if (responseText !== "") {
                            firebase.database().ref('users/').off('value')

                            alert("are you sure you wanna send your response")
                            firebase.database().ref('users/').child(Object.keys(snapshot.val())[i]).
                            child('queries').
                            child(Object.keys(details[i]['queries']).find(key => details[i]['queries'][key] === queries[j])).
                            child('postText').set(responseText).
                            then(function() {
                                alert("Your response now can be viewed on FAQs")
                                location.reload()
                                document.getElementById('responseText').value = ""
                            })
                            traceCnt = traceCnt + 1
                            break;
                        } else {
                            alert("Sorry! empty responses cannot be posted")
                            break;
                        }
                    }
                }
            }
            if (traceCnt !== 0) {
                break;
            }
        }
    })
}

function mailText() {
    var responseText = document.getElementById('responseText').value

    firebase.database().ref('users/').off('value')

    var mailData = firebase.database().ref('users/')
    mailData.on('value', function(snapshot) {
        var details = Object.values(snapshot.val())
        for (var i = 0; i < Object.keys(snapshot.val()).length; i++) {
            if (details[i]['queries'] !== undefined) {
                var queries = Object.values(details[i]['queries'])
                for (var j = 0; j < Object.keys(details[i]['queries']).length; j++) {
                    if (queries[j]['Q'] === localStorage.getItem('clickedQuery')) {
                        if (responseText !== "") {
                            firebase.database().ref('users/').off('value')

                            alert("are you sure you wanna send your response")
                            firebase.database().ref('users/').
                            child(Object.keys(snapshot.val())[i]).
                            child('queries').
                            child(Object.keys(details[i]['queries']).find(key => details[i]['queries'][key] === queries[j])).child('mailText').set(responseText)

                            Email.send({
                                SecureToken: "ebe8041a-26eb-4776-803e-cab1d7dcde81",
                                To: details[i]['email'],
                                From: "trupthin.murthy@gmail.com",
                                Subject: "Response from New-Gen IEDC",
                                Body: responseText
                            }).then(
                                message => alert(message)
                            );
                            document.getElementById('responseText').value = ""
                            break;
                        } else {
                            alert("Sorry! empty responses cannot be posted")
                            break;
                        }
                    }
                }
            }
        }
    })
}

function sendEmail() {
    var responseMail = document.getElementById('responseMail').value

    firebase.database().ref('users/').off('value')

    var mailRes = firebase.database().ref('users/')
    mailRes.on('value', function(snapshot) {
        var details = Object.values(snapshot.val())
        for (var i = 0; i < Object.keys(snapshot.val()).length; i++) {
            if (details[i]['mentor'] !== undefined) {
                if (details[i]['mentor'].requests !== undefined) {
                    var requests = Object.values(details[i]['mentor'].requests)
                    for (var j = 0; j < Object.keys(details[i]['mentor'].requests).length; j++) {
                        if (requests[j]['Q'] === localStorage.getItem('clickedRequest')) {
                            if (responseMail !== "") {
                                firebase.database().ref('users/').off('value')

                                alert("are you sure you wanna send your response")
                                firebase.database().ref('users/').
                                child(Object.keys(snapshot.val())[i]).
                                child('mentor').child('requests').
                                child(Object.keys(details[i]['mentor'].requests).find(key => details[i]['mentor'].requests[key] === requests[j])).child('mailText').set(responseMail)

                                Email.send({
                                    SecureToken: "ebe8041a-26eb-4776-803e-cab1d7dcde81",
                                    To: details[i]['email'],
                                    From: "trupthin.murthy@gmail.com",
                                    Subject: "Response from New-Gen IEDC",
                                    Body: responseMail
                                }).then(
                                    message => alert(message)
                                );
                                document.getElementById('responseMail').value = ""
                                break;
                            } else {
                                alert("Sorry! empty responses cannot be posted")
                                break;
                            }
                        }
                    }
                }
            }
        }
    })
}

function setPlayer(folder, file) {
    document.getElementById('player').setAttribute('id', folder)
    var storageRef = firebase.storage().ref();
    storageRef.child(folder + '/' + file + '/postVideo.webm').getDownloadURL().then(function(url) {
        document.getElementById(folder).src = url;
    })
}