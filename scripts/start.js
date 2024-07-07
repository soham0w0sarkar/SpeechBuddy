
function start() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {

            if (window.location.pathname !== '/home.html') {
                navigateTo('home.html');
            }
        } else {
            // User is not signed in
            if (window.location.pathname !== '/login.html' && window.location.pathname !== '/signup.html' && window.location.pathname !== '/reset_password.html') {
                navigateTo('login.html');
            }
        }
    });
}


document.addEventListener('DOMContentLoaded', start);