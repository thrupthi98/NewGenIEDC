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
var posts;

//-----------------------------------------------------------------------------

function on() {
    document.getElementById("overlay").style.display = "block";
}

function view() {
    var email_adrs = document.getElementById('email')
    var email = document.getElementById('email').value
    if (email === null || (!email_adrs.checkValidity())) {
        alert("Please Enter a valid email address")
        email = ""
    } else {
        document.getElementById("overlay").style.display = "none";
        if (email === "professor.bnmit@gmail.com") {
            document.getElementById("video-recorder").style.display = "block"

            posts = firebase.database().ref('users/')

            posts.on('value', function(snapshot) {
                var details = Object.values(snapshot.val())
                for (var i = 0; i < Object.keys(snapshot.val()).length; i++) {
                    if (details[i]['queries'] !== undefined) {
                        var queries = Object.values(details[i]['queries'])
                        for (var j = 0; j < Object.keys(details[i]['queries']).length; j++) {
                            var div = document.createElement('div')
                            div.setAttribute('class', 'card col-lg-12')
                            div.innerHTML = queries[j]['Q']
                            div.innerHTML += '<br>'
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
            })
        } else {
            document.getElementById("public").style.display = "block"

            posts = firebase.database().ref('users/')

            posts.on('value', function(snapshot) {
                var details = Object.values(snapshot.val())
                for (var i = 0; i < Object.keys(snapshot.val()).length; i++) {
                    if (details[i]['queries'] !== undefined) {
                        var queries = Object.values(details[i]['queries'])
                        for (var j = 0; j < Object.keys(details[i]['queries']).length; j++) {
                            if (queries[j]['postText'] !== undefined) {
                                var div = document.createElement('div')
                                div.setAttribute('class', 'card col-lg-12')
                                div.innerHTML = '<p class="q">' + "Question:  " + queries[j]['Q'] + '</p>'
                                div.innerHTML += '<br>'
                                div.innerHTML += '<p class="ans">' + queries[j]["postText"] + '</card>'
                                document.getElementById('Publicposts').append(div)
                            }
                            if (queries[j]['postVideo'] !== undefined) {
                                var user = Object.keys(snapshot.val())[i];
                                var post = Object.keys(details[i]['queries']).find(key => details[i]['queries'][key] === queries[j])
                                var div = document.createElement('div')
                                div.setAttribute('class', 'card col-lg-12')
                                div.innerHTML = '<p class="q">' + "Question:  " + queries[j]['Q'] + '</p>'
                                div.innerHTML += '<br>'
                                div.innerHTML += '<video id="player" controls></video>'
                                document.getElementById('Publicposts').append(div)

                                setTimeout(setPlayer(user, post), 5000)
                            }
                        }
                    }
                }
            })

        }
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

function showRecorder() {
    document.getElementById("answerVideo").style.display = "block"
}

function showText() {
    document.getElementById("answerText").style.display = "block"
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


//-----------------------------------------------------------------------------

function postVideo() {
    if (data !== undefined) {
        alert("are you sure you wanna send your response")
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
                            firebase.database().ref('users/').child(Object.keys(snapshot.val())[i]).
                            child('queries').
                            child(Object.keys(details[i]['queries']).find(key => details[i]['queries'][key] === queries[j])).
                            child('postVideo').set('True').
                            then(function() {
                                alert("Your response now can be viewed on FAQs")
                                document.getElementById('responseText').value = ""
                            })

                            const videoBlob = new Blob(data, { type: 'video/webm' })
                            var folder = Object.keys(snapshot.val())[i];
                            var filename = Object.keys(details[i]['queries']).find(key => details[i]['queries'][key] === queries[j])
                            var storageRef = firebase.storage().ref()
                            var ref = storageRef.child(folder + '/' + filename + '/postVideo.webm')
                            ref.put(videoBlob).then(function(snapshot) {
                                console.log("done");
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
                                        message => alert(message)
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

function setPlayer(folder, file) {
    document.getElementById('player').setAttribute('id', folder)
    var storageRef = firebase.storage().ref();
    storageRef.child(folder + '/' + file + '/postVideo.webm').getDownloadURL().then(function(url) {
        document.getElementById(folder).src = url;
    })
}