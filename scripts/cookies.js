
function saveUserToCookie(user) {
    let expires = "";
    let days = 1;
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `user=${JSON.stringify(user)}${expires}; path=/`;
}

function getUserFromCookie() {
    const name = "user=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return JSON.parse(c.substring(name.length, c.length));
        }
    }
    return null;
}

function deleteUserCookie() {
    document.cookie = "user" + '=; Max-Age=-99999999;';
}